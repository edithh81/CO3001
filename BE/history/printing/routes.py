from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db

router = APIRouter()

@router.get("/history/printing/{student_id}")
async def get_printing_log(student_id: str):
    results = await db.fetch_all("SELECT * FROM printing_ord WHERE student_id = :student_id", {"student_id": student_id})
    if not results:
        raise HTTPException(status_code=404, detail="No printing log found for the specified student.")

    return {'success': True, 'data': results}