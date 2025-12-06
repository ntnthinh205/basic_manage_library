from pydantic import BaseModel


class BookBase(BaseModel):
    """Schema cơ bản cho Book"""
    title: str
    author: str
    published_year: int
    price: float


class BookCreate(BookBase):
    """Schema để tạo Book mới"""
    pass


class BookUpdate(BaseModel):
    title: str | None = None
    author: str | None = None
    published_year: int | None = None
    price: float | None = None


class BookResponse(BookBase):
    id: int

    class Config:
        from_attributes = True  # Cho phép chuyển đổi từ SQLAlchemy model
