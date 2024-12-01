from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from typing import Optional, Dict, List
from enum import Enum
import json
router = APIRouter()
"""
printer 
id (Primary Key): Unique identifier for each printer.
room: The room where the printer is located.
campus: The campus where the printer is located.
info: JSON field containing additional printer details like model, type, and function.
"""

    
# class PrinterDetail(BaseModel):
#     id: int
#     room: str
#     campusId: str
#     queue: int
#     status: str
#     info: dict

@router.get("/campus/{campus}")
async def get_printers_by_campus(campus: str):
    query = """
        SELECT printer.id, printer.room, printer.info, printer.status, COUNT(printing_ord.id) AS queue
        FROM printer
        LEFT JOIN printing_ord ON printer.id = printing_ord.printer_id 
        AND printing_ord.status = 'pending'
        WHERE printer.campus = :campus
        GROUP BY printer.id
    """
    results = await db.fetch_all(query, {"campus": campus})
    if not results:
        raise HTTPException(status_code=404, detail="No printers found for the specified campus.")
    trans_result = [
        {
            'id': result['id'],
            'campusId': campus,  # Assuming campusId is the same as the campus parameter
            'room': result['room'],
            'queue': result['queue'],
            'status': result['status'],  # Assuming status is part of info
            'info': result['info']
        }
        for result in results
    ]
    # Returning the response with the 'queue' attribute
    return {'success': True, 'data': trans_result}

@router.get("/id/{printer_id:int}")
async def get_printers_by_id(printer_id: int):
    query = """
        SELECT printer.id, printer.room, printer.campus, printer.info, printer.status, COUNT(printing_ord.id) AS queue
        FROM printer
        LEFT JOIN printing_ord ON printer.id = printing_ord.printer_id 
        AND printing_ord.status = 'pending'
        WHERE printer.id = :printer_id
        GROUP BY printer.id
    """
    result = await db.fetch_one(query, {"printer_id": printer_id})
    
    if not result:
        raise HTTPException(status_code=404, detail="No printers found for the specified id.")
    trans_result = {
        'id': result['id'],
        'campusId': result['campus'],  
        'room': result['room'],
        'queue': result['queue'],
        'status': result['status'],  
        'info': result['info']
    }
    # Returning the response with the 'queue' attribute
    return {'success': True, 'data': trans_result}

@router.get("/all")
async def get_all_printers():
    query = """
        SELECT printer.id, printer.room, printer.campus, printer.info, printer.status, COUNT(printing_ord.id) AS queue
        FROM printer
        LEFT JOIN printing_ord ON printer.id = printing_ord.printer_id 
        AND printing_ord.status = 'pending'
        GROUP BY printer.id
        ORDER BY printer.id
    """
    results = await db.fetch_all(query)
    
    if not results:
        raise HTTPException(status_code=404, detail="No printers found.")
    trans_result = [
        {
            'id': result['id'],
            'campusId': result['campus'],  # Assuming campusId is the same as the campus parameter
            'room': result['room'],
            'queue': result['queue'],
            'status': result['status'],  # Assuming status is part of info
            'info': result['info']
        }
        for result in results
    ]
    # Returning the response with the 'queue' attribute
    return {'success': True, 'data': trans_result}

class PrinterStatus(str, Enum):
    working = "working"
    maintenance = "maintenance"
    
class PrinterInfo(BaseModel):
    model: str
    type: list[str]
    functional: list[str]
    
class PrinterAddNew(BaseModel):
    room: str
    campusId: str
    info: PrinterInfo
    status: PrinterStatus = PrinterStatus.working


@router.post("/addnew")
async def add_new_printer(printer: PrinterAddNew):
    query = """
        INSERT INTO printer (room, campus, info, status)
        VALUES (:room, :campus, :info, :status)
        RETURNING *;
    """
    info_json = json.dumps(printer.info.dict())  # Serialize info to JSON
    result = await db.fetch_one(query, {
        "room": printer.room,
        "campus": printer.campusId,
        "info": info_json,  
        "status": printer.status.value 
    })
    return {'success': True, 'data': result['id']}


class PrinterUpdate(BaseModel):
    id: int
    room: str
    campusId: str
    queue: Optional[int] = None
    info: PrinterInfo
    status: PrinterStatus
    
@router.put("/update/{printer_id:int}")
async def update_printer(printer_id:int, printer: PrinterUpdate):
    query = """
        UPDATE printer
        SET room = :room, campus = :campus, info = :info, status = :status
        WHERE id = :id
        RETURNING *;
    """
    info_json = json.dumps(printer.info.dict())
    result = await db.fetch_one(query, {
        "id": printer_id, 
        "room": printer.room, 
        "campus": printer.campusId, 
        "info": info_json, 
        "status": printer.status.value
    })
    after_update = {
        'id': result['id'],
        'room': result['room'],
        'campusId': result['campus'],
        'info': result['info'],
        'status': result['status']
    }
    return {'success': True, 'data': after_update}

@router.delete("/delete/{printer_id:int}")
async def delete_printer(printer_id: int):
    check_query = """
        SELECT id FROM printer WHERE id = :printer_id
    """
    printer_exists = await db.fetch_one(check_query, {"printer_id": printer_id})
    
    if not printer_exists:
        return {'success': False, 'message': "Printer not exists in system yet."}
    query ="""
        DELETE FROM printer
        WHERE id = :printer_id
    """
    await db.execute(query, {"printer_id": printer_id})
    
    check_after_query = """ SELECT id FROM printer WHERE id = :printer_id """
    result = await db.fetch_one(check_after_query, {"printer_id": printer_id})
    if not result:
        return {'success': True, 'message': "Printer deleted successfully."}
    else:
        return {'success': False, 'message': "Failed to delete printer."}