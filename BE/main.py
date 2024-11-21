from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from databases import Database
import os
# from history.routes import router as history_router
from printers.routes import router as printers_router
from verification.student.routes import router as verification_router_student
import uvicorn

app = FastAPI()
load_dotenv()
database_url = os.getenv("DATABASE_URL")
database = Database(database_url)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# app.include_router(history_router, prefix="/api")
app.include_router(printers_router, prefix="")
app.include_router(verification_router_student, prefix="")


uvicorn.run(app,host="localhost", port=8000)