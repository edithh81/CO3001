from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter()

@router.get("/printers/{campus}")
async def get_printers(campus: str):
    return {"campus": campus, "printers": ["printer1", "printer2"]}