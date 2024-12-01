from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, List, Union
from db import db
import json

import datetime
router = APIRouter()

class AdminSpecification(BaseModel):
    defaultPagesA4: int
    defaultPagesA3: int
    resetStartDate: str = datetime.datetime.now().strftime("%Y-%m-%d")
    resetEndDate: str = datetime.datetime.now().strftime("%Y-%m-%d")
    resetPeriod: str
    permittedFileTypes: List[str]


@router.put("/specification")
async def update_printing_specification(new_spec: AdminSpecification):
    query = """
        UPDATE specification_admin
        SET default_pages_a4 = :default_pages_a4, default_pages_a3 = :default_pages_a3, reset_start_date = :reset_start_date, reset_end_date = :reset_end_date, reset_period = :reset_period, permitted_file_types = :permitted_file_types
        WHERE id = :id
        RETURNING *;
    """
    permitted_file_types_json = json.dumps(new_spec.permittedFileTypes)
    result = await db.fetch_one(query, {
        "id": 1,
        "default_pages_a4": new_spec.defaultPagesA4,
        "default_pages_a3": new_spec.defaultPagesA3,
        "reset_start_date": new_spec.resetStartDate,
        "reset_end_date": new_spec.resetEndDate,
        "reset_period": new_spec.resetPeriod,
        "permitted_file_types": new_spec.permittedFileTypes
    })
    return {'success': True, 'data': result}

@router.get("/specification/all")
async def get_printing_specification():
    query = """
        SELECT * FROM specification_admin
        WHERE id = 1;
    """
    result = await db.fetch_one(query)
    trans_result = {
        'defaultPagesA4': result['default_pages_a4'],
        'defaultPagesA3': result['default_pages_a3'],
        'resetStartDate': result['reset_start_date'],
        'resetEndDate': result['reset_end_date'],
        'resetPeriod': result['reset_period'],
        'permittedFileTypes': result['permitted_file_types']
    }
    return {'success': True, 'data': trans_result}