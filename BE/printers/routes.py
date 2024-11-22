from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db

router = APIRouter()

@router.get("/printers/{campus}")
async def get_printers(campus: str):
    query = """
        SELECT printer.id, printer.room, printer.info, COUNT(printing_ord.id) AS queue
        FROM printer
        LEFT JOIN printing_ord ON printer.id = printing_ord.printer_id 
        AND printing_ord.status = 'pending'
        WHERE printer.campus = :campus and printer.status = 'available'
        GROUP BY printer.id
    """
    results = await db.fetch_all(query, {"campus": campus})
    
    if not results:
        raise HTTPException(status_code=404, detail="No printers found for the specified campus.")

    # Returning the response with the 'queue' attribute
    return {'success': True, 'data': results}