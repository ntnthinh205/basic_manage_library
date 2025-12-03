from books_service import get_book_service, BookService
from fastapi import FastAPI, Depends, HTTPException
from schemas import BookCreate, BookResponse, BookUpdate


app = FastAPI()

@app.get("/books/", response_model=list[BookResponse])
async def get_books(
    skip: int = 0,
    limit: int = 100,
    book_service: BookService = Depends(get_book_service)
):
    """Lấy danh sách tất cả sách"""
    return book_service.get_all_books(skip=skip, limit=limit)


@app.get("/books/{book_id}", response_model=BookResponse)
async def get_book(
    book_id: int,
    book_service: BookService = Depends(get_book_service)
):
    """Lấy thông tin một cuốn sách"""
    book = book_service.get_book_by_id(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Không tìm thấy sách")
    return book


@app.post("/books/", response_model=BookResponse, status_code=201)
async def create_book(
    book_data: BookCreate,
    book_service: BookService = Depends(get_book_service)
):
    """Tạo sách mới"""
    return book_service.create_book(**book_data.model_dump())


@app.put("/books/{book_id}", response_model=BookResponse)
async def update_book(
    book_id: int,
    book_data: BookUpdate,
    book_service: BookService = Depends(get_book_service)
):
    """Cập nhật thông tin sách"""
    book = book_service.update_book(book_id, **book_data.model_dump(exclude_unset=True))
    if not book:
        raise HTTPException(status_code=404, detail="Không tìm thấy sách")
    return book


@app.delete("/books/{book_id}", status_code=204)
async def delete_book(
    book_id: int,
    book_service: BookService = Depends(get_book_service)
):
    """Xóa sách"""
    success = book_service.delete_book(book_id)
    if not success:
        raise HTTPException(status_code=404, detail="Không tìm thấy sách")
    return None


@app.get("/books/search/", response_model=list[BookResponse])
async def search_books(
    keyword: str,
    book_service: BookService = Depends(get_book_service)
):
    """Tìm kiếm sách theo từ khóa"""
    return book_service.search_books(keyword)