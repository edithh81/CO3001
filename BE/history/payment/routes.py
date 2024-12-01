from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from enum import Enum
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
        return {'success': False, 'data': []}
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
        return {'success': False, 'data': []}
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

class PaymentMethod(str, Enum):
    cash = "cash"
    banking = "banking"
    
class CreatePaymentOrder(BaseModel):
    byStudent: str
    A3: int
    A4: int
    total: int
    method: PaymentMethod
    at: str
    status: str
    
@router.post("/buy-paper/create")
async def create_payment_order(order: CreatePaymentOrder):
    query = """
        INSERT INTO buy_paper_ord (student_id, total_a3, total_a4, amount, method, at, status)
        VALUES (:student_id, :total_a3, :total_a4, :amount, :method, :at, :status)
        RETURNING *;
    """
    
    after_create = await db.fetch_one(query, {
        "student_id": order.byStudent,
        "total_a3": order.A3,
        "total_a4": order.A4,
        "amount": order.total,
        "method": order.method,
        "at": order.at,
        "status": order.status
    })
    
    if after_create:
        return {'success': True, 'data': after_create['id']}
    else:
        return {'success': False, 'data': []}


class UpdatePaymentOrder(BaseModel):
    status: str
@router.put("/buy-paper/update/{order_id:int}")
async def update_payment_order(order_id: int, update: UpdatePaymentOrder):
    query = """
        UPDATE buy_paper_ord
        SET status = :status
        WHERE id = :id
        RETURNING *;
    """

    after_update = await db.fetch_one(query, {
        "id": order_id,
        "status": update.status
    })

    if after_update:
        return {'success': True, 'data': after_update}
    else:
        return {'success': False, 'data': []}
    
@router.get("/buy-paper/order/{order_id:int}")
async def get_payment_order_by_id(order_id: int):
    result = await db.fetch_one("SELECT * FROM buy_paper_ord WHERE id = :id", {"id": order_id})

    if not result:
        return {'success': False, 'data': []}
    else:
        trans_result = {
            'orderId': result['id'],
            'byStudent': result['student_id'],
            'A3': result['total_a3'],
            'A4': result['total_a4'],
            'total': result['amount'],
            'status': result['status'],
            'at': result['at'],
            'method': result['method']
        }
        return {'success':True, 'data': trans_result}