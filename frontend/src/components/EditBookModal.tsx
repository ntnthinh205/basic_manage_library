import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import type { Book } from '../App';

interface EditBookModalProps {
  book: Book;
  onSave: (book: Book) => void;
  onCancel: () => void;
}

export function EditBookModal({ book, onSave, onCancel }: EditBookModalProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    published_year: book.published_year,
    price: book.price
  });

  useEffect(() => {
    setFormData({
      title: book.title,
      author: book.author,
      published_year: book.published_year,
      price: book.price
    });
  }, [book]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.author.trim()) {
      alert("Tên sách và tác giả không được để trống.");
      return;
    }

    if (!formData.author.trim()) {
      alert("Tác giả không được để trống.");
      return;
    }

    if (formData.published_year < 1000 || formData.published_year > new Date().getFullYear() + 1) {
      alert("Năm xuất bản không hợp lệ.");
      return;
    }
    
    if (formData.price < 0) {
      alert("Giá không được âm.");
      return;
    }

    onSave({
      ...book,
      id: book.id,
      title: formData.title,
      author: formData.author,
      published_year: formData.published_year,
      price: formData.price
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || new Date().getFullYear() : value
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
    >
      <div className="bg-white border-zinc-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Chỉnh Sửa Thông Tin Sách</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="edit-title" className="block text-gray-700 mb-2">
                Tên Sách <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Nhập tên sách"
              />
            </div>

            <div>
              <label htmlFor="edit-author" className="block text-gray-700 mb-2">
                Tác Giả <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edit-author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Nhập tên tác giả"
              />
            </div>

            <div>
              <label htmlFor="edit-year" className="block text-gray-700 mb-2">
                Năm Xuất Bản <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="edit-published_year"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                required
                min="1000"
                max={new Date().getFullYear() + 1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Nhập năm xuất bản"
              />
            </div>

            <div>
              <label htmlFor="edit-price" className="block text-gray-700 mb-2">
                Giá <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="edit-price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Ví dụ: Tiểu thuyết, Khoa học, Lịch sử"
              />
            </div>

          </div>

          <div className="flex items-center gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow hover:shadow-lg"
            >
              <Save className="w-4 h-4" />
              Cập Nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
