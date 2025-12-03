from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, Session, declarative_base
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
database_url = os.getenv("URL_MYSQL") # URL database

if not database_url:
    raise ValueError("Loi khi ket noi voi database")

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=False)
    published_year = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

Base.metadata.create_all(bind=engine)