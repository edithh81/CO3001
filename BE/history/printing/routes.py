from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter()

@router.get("/history/printing/{student_id}")
async def get_printing_history(student_id: str):
    return {"student_id": student_id, "print_history": ["print1", "print2"]}