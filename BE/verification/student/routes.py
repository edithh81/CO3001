from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
from db import db

async def login(user:str, password: str):
    login_data = {
        'username': user,
        'password': password,
        '_eventId': 'submit',
        'submit': 'Login',
    }

    with requests.Session() as S:
        S.cookies.clear()
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36 Edg/126.0.0.0'
        }

        # Login to MyBK
        login_url = 'https://sso.hcmut.edu.vn/cas/login?service=https%3A%2F%2Fmybk.hcmut.edu.vn%2Fapp%2Flogin%2Fcas'
        home_url = 'https://mybk.hcmut.edu.vn/app/'
        r = S.get(login_url, headers=headers)
        # print(r.content)
        soup = BeautifulSoup(r.content, 'html5lib')
        login_data['lt'] = soup.find('input', attrs={'name': 'lt'})['value']
        login_data['execution'] = soup.find(
            'input', attrs={'name': 'execution'})['value']
        r = S.post(login_url, data=login_data)
        if r.url == home_url:
            # print("Logged in " + user + " successfully")

            # Access uni records page
            uni_records_url = 'https://mybk.hcmut.edu.vn/app/he-thong-quan-ly/sinh-vien/thong-tin'
            response_records = S.get(uni_records_url)
            soup1 = BeautifulSoup(response_records.content, 'html5lib')
            token = soup1.find('input', attrs={'id': 'hid_Token'})['value']
            if response_records.status_code == 200:
                # print("Accessed records page successfully")

                headers = {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }

                #  Get ID student
                getID_url = 'https://mybk.hcmut.edu.vn/api/v1/student/get-student-info?null'
                response_ID = S.get(getID_url, headers=headers)
                # print(response_ID.text)
                ID = response_ID.json()['data']['id']
                # print(ID)
                student = {}
                student['id'] = response_ID.json()['data']['code']
                student['fullname'] = response_ID.json()['data']['lastName'] + ' ' + response_ID.json()['data']['firstName']
                get_image_url = 'https://mybk.hcmut.edu.vn/api/public/media/hinh-the-4x6/'+student['id']+'/thumb/v1?null'
                response_image = S.get(get_image_url, headers=headers)
                # print(response_image.text)
                image_of_student = response_image.json()['data']
                image_data = image_of_student.split(',')[1]
                return {
                    "success": True,
                    "student_name": student['fullname'],
                    'student_id':student['id'],
                    "student_image": image_data
                }
                # print(image_data)
                # with open(student['id']+".jpg", "wb") as image_file:
                #     image_file.write(image_data)
        else: 
            return {
                "success": False,
                "message": "Login failed"
            }

router = APIRouter()

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/login/student")
async def login_hcmut(data: LoginData):
    result = await login(data.username, data.password)
    if result['success']:
        # insert to db student has not existed
        query = """
        INSERT INTO student (student_id, total_a3, total_a4, student_name)
        VALUES (:student_id, 20, 20, :student_name)
        ON CONFLICT (student_id) DO NOTHING;"""
        
        await db.execute(query, {'student_id': result['student_id'], 'student_name': result['student_name']})
        
        return {'success':True,'student_name': result['student_name'], 'student_id': result['student_id'], 'student_image': result['student_image']}
    else:
        raise HTTPException(status_code=401, detail=result["message"])
    

# for admin
class Student(BaseModel):
    studentId:str
    name:str
    A3:int
    A4:int

@router.get("/student/{student_id}")
async def get_student_by_id(student_id: str):
    query = """
        SELECT * FROM student WHERE student_id = :student_id
    """
    result = await db.fetch_one(query, {"student_id": student_id})
    
    if not result:
        raise HTTPException(status_code=404, detail="No student found for the specified id.")
    trans_result = {
        'studentId': result['student_id'],
        'name': result['student_name'],
        'A3': result['total_a3'],
        'A4': result['total_a4']
    }
    return {'success': True, 'data': trans_result}

    
@router.get("/getAll")
async def get_all_students():
    query = """
        SELECT * FROM student
    """
    result = await db.fetch_all(query)
    
    if not result:
        raise HTTPException(status_code=404, detail="No student found.")
    
    results = [
        {
            'studentId': student['student_id'],
            'name': student['student_name'],
            'A3': student['total_a3'],
            'A4': student['total_a4']    
        }
        for student in result
        
    ]
    return {'success': True, 'data': results}

class updateStudentBalance(BaseModel):
    studentId: str
    amount: int
    type: str
    
@router.put("/updatePaper")
async def update_student_balance(data: updateStudentBalance):
    # Determine the column to update based on the type
    if data.type in ["A3", "A4"]:
        column = f"total_{data.type.lower()}"
        query = f"""
        UPDATE student
        SET {column} = {column} + :amount
        WHERE student_id = :student_id
        """
        await db.execute(query, {'student_id': data.studentId, 'amount': data.amount})
        afterupdate = await db.fetch_one("SELECT * FROM student WHERE student_id = :student_id", {"student_id": data.studentId})
        return {'success': True, 'data': afterupdate}
    else:
        raise HTTPException(status_code=400, detail="Invalid type")
