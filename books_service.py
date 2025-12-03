from fastapi import Depends
from sqlalchemy.orm import Session
from books_model import Book, get_db


class BookService:
    def __init__(self, db: Session):
        self.db = db
    
    def create_book(self, title: str, author: str, published_year: int, price: float) -> Book:
        book = Book(
            title=title,
            author=author,
            published_year=published_year,
            price=price
        )
        self.db.add(book)
        self.db.commit()
        self.db.refresh(book)
        return book
    
    def get_book_by_id(self, book_id: int) -> Book | None:
        return self.db.query(Book).filter(Book.id == book_id).first()
    
    
    def get_all_books(self, skip: int = 0, limit: int = 100) -> list[Book]:
        return self.db.query(Book).offset(skip).limit(limit).all()
    
    def update_book(self, book_id: int, **kwargs) -> Book | None:
        book = self.get_book_by_id(book_id)
        if not book:
            return None
        
        for key, value in kwargs.items():
            if hasattr(book, key):
                setattr(book, key, value)
        
        self.db.commit()
        self.db.refresh(book)
        return book
    
    def delete_book(self, book_id: int) -> bool:
        book = self.get_book_by_id(book_id)
        if not book:
            return False
        
        self.db.delete(book)
        self.db.commit()
        return True
    
    def search_books(self, keyword: str) -> list[Book]:
        return self.db.query(Book).filter(
            (Book.title.contains(keyword)) | (Book.author.contains(keyword))
        ).all()


def get_book_service(db: Session = Depends(get_db)) -> BookService:
    return BookService(db)


