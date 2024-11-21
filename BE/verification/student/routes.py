from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

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
        return {'success':True,'student_name': result['student_name'], 'student_id': result['student_id'], 'student_image': result['student_image']}
    else:
        raise HTTPException(status_code=401, detail=result["message"])