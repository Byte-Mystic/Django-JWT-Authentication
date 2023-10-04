import pymongo
from dotenv import load_dotenv
import os

load_dotenv(".env")
url = os.getenv("DATABASE_URL")
client = pymongo.MongoClient(url)
db = client["Transcribe"]
