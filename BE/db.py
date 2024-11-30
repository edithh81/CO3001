from dotenv import load_dotenv
from databases import Database
import os
load_dotenv()
database_url = os.getenv("DATABASE_URL")
db = Database(database_url)

    