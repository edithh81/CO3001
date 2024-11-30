from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
router = APIRouter()


# @router.get("/history/buy-paper/{student_id}")
# async def get_payment_history(student_id: str):
#     result = await db.fetch_all("SELECT * FROM buy_paper_ord WHERE student_id = :student_id", {"student_id": student_id})
    
#     if not result:
#         raise HTTPException(status_code=404, detail="No payment history found for the specified student.")
#     return {'success': True, 'data': result}

# for admin

@router.get("/buy-paper/all")
async def get_all_payment_orders():
    results = await db.fetch_all("SELECT * FROM buy_paper_ord")
    
    if not results:
        raise HTTPException(status_code=404, detail="No payment orders found.")
    trans_result = [
        {
            'orderId': result['id'],
            'byStudent': result['student_id'],
            'A3': result['total_a3'],
            'A4': result['total_a4'],
            'total': result['amount'],
            'status': result['status'],
            'at': result['at'],
            'method': result['method']
        }
        for result in results
    ]
    return {'success': True, 'data': trans_result}

@router.get("/buy-paper/student/{student_id}")
async def get_all_payment_orders_by_student(student_id: str):
    results = await db.fetch_all("SELECT * FROM buy_paper_ord WHERE student_id = :student_id", {"student_id": student_id})
    
    if not results:
        raise HTTPException(status_code=404, detail="No payment orders found for the specified student.")
    trans_result = [{
            'orderId': result['id'],
            'byStudent': result['student_id'],
            'A3': result['total_a3'],
            'A4': result['total_a4'],
            'total': result['amount'],
            'status': result['status'],
            'at': result['at'],
            'method': result['method']
        }
        for result in results
    ]

    return {'success': True, 'data': trans_result}