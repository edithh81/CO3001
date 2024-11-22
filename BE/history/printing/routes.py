from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db

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
"""

@router.get("/history/printing/{student_id}")
async def get_printing_log(student_id: str):
    results = await db.fetch_all("SELECT * FROM printing_ord WHERE student_id = :student_id", {"student_id": student_id})
    if not results:
        raise HTTPException(status_code=404, detail="No printing log found for the specified student.")

    return {'success': True, 'data': results}