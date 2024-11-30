from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db import db
# from history.routes import router as history_router
from printers.routes import router as printers_router
from verification.student.routes import router as verification_router_student
from history.printing.routes import router as history_router_printing
from history.payment.routes import router as history_router_payment

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()
    
# Include routers
# app.include_router(history_router, prefix="/api")
app.include_router(printers_router, prefix="/printers")
app.include_router(verification_router_student, prefix="/students")
app.include_router(history_router_printing, prefix="/orders")
app.include_router(history_router_payment, prefix="/orders")
