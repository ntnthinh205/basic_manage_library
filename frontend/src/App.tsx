import { useEffect, useState } from 'react'
import { BookList } from './components/BookList';
import { BookForm } from './components/BookForm';
import { EditBookModal } from './components/EditBookModal';
import { Library, Search } from 'lucide-react';

const API_URL = "http://127.0.0.1:8000";

export interface Book {
  id: string;
  title: string;
  author: string;
  published_year: number;
  price: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async() => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/books/`);
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
  }

  // Load all books
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (book: Omit<Book, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/books/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        const newBook = await response.json();
        setBooks([...books, newBook]);
      } else {
        console.error("Failed to add book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      const response = await fetch(`${API_URL}/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedBook.title,
          author: updatedBook.author,
          published_year: updatedBook.published_year,
          price: updatedBook.price
        }),
      });
      if (response.ok) {
        setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
        setEditingBook(null);
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      try {
        const response = await fetch(`${API_URL}/books/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          console.error("Failed to delete book");
          return;
        }
      } catch (error) {
        console.error("Error deleting book:", error);
      }
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book => {
    const query = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.published_year.toString().includes(query) ||
      book.price.toString().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-lg">
              <Library className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Hệ Thống Quản Lý Thư Viện</h1>
              <p className="text-gray-600">Quản lý sách và tài liệu của bạn</p>
            </div>
          </div>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Add Book Form */}
          <div>
            <BookForm onSave={handleAddBook} />
          </div>

          {/* Right Column - Search & Book List */}
          <div className="space-y-6 lg:col-span-3">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên sách, tác giả, năm xuất bản hoặc giá"
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Book List */}
            <BookList
              books={filteredBooks}
              onEdit={handleEdit}
              onDelete={handleDeleteBook}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onSave={handleUpdateBook}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
