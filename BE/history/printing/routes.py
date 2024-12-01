from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from db import db
from typing import Optional, Dict
from enum import Enum
import datetime
router = APIRouter()
"""
printing_ord
id (Primary Key): Unique identifier for the print order.
student_id: References the student_id in the student table.
printer_id: References the id in the printer table.
file_name: Name of the file being printed.
start_time: Timestamp of when the print job started.
end_time: Timestamp of when the print job ended (nullable).
specification: JSON field with print job details (e.g., number of pages, layout, type).
status: Current status of the print job (pending, complete, fail).
total_page: total page of the print job
file_id: handle for filename duplicate
campus: campus of the printer
admin_note: note from admin (maybe ord reject for some reason)
"""

# @router.get("/printing/stuid/{student_id}")
# async def get_printing_log(student_id: str):
#     results = await db.fetch_all("SELECT * FROM printing_ord WHERE student_id = :student_id", {"student_id": student_id})
#     if not results:
#         raise HTTPException(status_code=404, detail="No printing log found for the specified student.")

#     return {'success': True, 'data': results}

# for admin
@router.get("/printing/all")
async def get_all_printing_orders():
    results = await db.fetch_all("SELECT * FROM printing_ord")
    if not results:
        return {'success': False, 'data': []}
    trans_result = [
        {
            'orderId': result['id'],
            'printerId': result['printer_id'],
            'fileName': result['file_name'],
            'byStudent': result['student_id'],
            'fileId': result['file_id'],
            'specifications': result['specification'],
            'totalPages': result['total_page'],
            'status': result['status'],
            'at': result['start_time'],
            'campus': result['campus'],
        }
        for result in results
    ]
    return {'success': True, 'data': trans_result}

@router.get("/printing/campus/{campus}")
async def  get_all_printing_orders_by_campus(campus: str):
    results = await db.fetch_all("SELECT * FROM printing_ord WHERE campus = :campus", {"campus": campus})
    if not results:
        return {'success': False, 'data': []}
    trans_result = [
        {
            'orderId': result['id'],
            'printerId': result['printer_id'],
            'fileName': result['file_name'],
            'byStudent': result['student_id'],
            'fileId': result['file_id'],
            'specifications': result['specification'],
            'totalPages': result['total_page'],
            'status': result['status'],
            'at': result['start_time'],
            'campus': result['campus'],
        }
        for result in results
    ]
    return {'success': True, 'data': trans_result}

@router.get("/printing/student/{student_id}")
async def get_all_printing_orders_by_student(student_id: str):
    results = await db.fetch_all("SELECT * FROM printing_ord WHERE student_id = :student_id", {"student_id": student_id})
    if not results:
        return {'success': False, 'data': []}
    trans_result = [
        {
            'orderId': result['id'],
            'printerId': result['printer_id'],
            'fileName': result['file_name'],
            'byStudent': result['student_id'],
            'fileId': result['file_id'],
            'specifications': result['specification'],
            'totalPages': result['total_page'],
            'status': result['status'],
            'at': result['start_time'],
            'campus': result['campus'],
        }
        for result in results
    ]
    return {'success': True, 'data': trans_result}

@router.get("/printing/byOrderId/{order_id}")
async def get_orders_by_id(order_id: int):
    result = await db.fetch_one("SELECT * FROM printing_ord WHERE id = :order_id", {"order_id": order_id})
    if not result:
        return {'success': False, 'data': []}
    trans_result = {
            'orderId': result['id'],
            'printerId': result['printer_id'],
            'fileName': result['file_name'],
            'byStudent': result['student_id'],
            'fileId': result['file_id'],
            'specifications': result['specification'],
            'totalPages': result['total_page'],
            'status': result['status'],
            'at': result['start_time'],
            'campus': result['campus'],
        }

    return {'success': True, 'data': trans_result}
class PrintingOrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    rejected = "rejected"
class PrintingSpecification(BaseModel):
    pages: str  
    size: str  
    functional: str  
    type: str  
    copies: int 
    additionalInfo: Optional[str] = None  

class PrintingOrderCreate(BaseModel):
    printerId: int
    fileName: str
    byStudent: str
    fileId: str
    specifications: PrintingSpecification  # This is now a nested model
    totalPages: int
    status: PrintingOrderStatus
    at: str
    campus: str
 
@router.post("/create")
async def create_printing_order(data: PrintingOrderCreate):
    # Insert the printing order into the database
    query = """
        INSERT INTO printing_ord (printer_id, file_name, student_id, file_id, specification, total_page, status, campus, start_time)
        VALUES (:printer_id, :file_name, :student_id, :file_id, :specification, :total_page, :status, :campus, :start_time)
        RETURNING *;
    """
    result = await db.fetch_one(query, {
        "printer_id": data.printerId,
        "file_name": data.fileName,
        "student_id": data.byStudent,
        "file_id": data.fileId,
        "specification": data.specifications.json(),  
        "total_page": data.totalPages,
        "status": data.status,
        "campus": data.campus,
        "start_time": data.at
    })
    
    if not result:
        raise HTTPException(status_code=404, detail="Failed to create printing order.")
    
    return {'success': True, 'data': result['id']}


class UpdateOrderStatusRequest(BaseModel):
    status: PrintingOrderStatus
    comment: Optional[str] = None
@router.put("/update/{order_id}")
async def update_printing_order(order_id:int, update_data: UpdateOrderStatusRequest):
    current = datetime.datetime.now()
    formatted_time = current.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
    query = """
        UPDATE printing_ord
        SET status = :status, admin_note = :comment, end_time = :formatted_time
        WHERE id = :order_id
        RETURNING *;
    """
    results = await db.fetch_one(query, {
        "status": update_data.status,
        "comment": update_data.comment,
        "order_id": order_id,
        "formatted_time": formatted_time
    })
    if results:
        return {'success': True, 'data': results}
    else:
        return {'success': False, 'data': []}