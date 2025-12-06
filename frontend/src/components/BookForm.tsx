import { useState } from 'react';
import { Save, BookPlus } from 'lucide-react';
import type { Book } from '../App';

interface BookFormProps {
  onSave: (book: Omit<Book, 'id'>) => void;
}

export function BookForm({ onSave }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: new Date().getFullYear(),
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      author: '',
      published_year: new Date().getFullYear(),
      price: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' ? parseInt(value) || new Date().getFullYear() : value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-8">
      <div className="flex items-center gap-2 mb-4">
        <BookPlus className="w-5 h-5 text-indigo-600" />
        <h2 className="text-gray-900">Thêm Sách</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-gray-700 mb-1">
            Tên Sách <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập tên sách"
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-gray-700 mb-1">
            Tác Giả <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Nhập tên tác giả"
          />
        </div>

        <div>
          <label htmlFor="published_year" className="block text-gray-700 mb-1">
            Năm Xuất Bản <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="published_year"
            name="published_year"
            value={formData.published_year}
            onChange={handleChange}
            required
            min="1000"
            max={new Date().getFullYear() + 1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Năm"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-gray-700 mb-1">
            Giá <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="Giá sách"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow hover:shadow-lg"
        >
          <Save className="w-4 h-4" />
          Thêm Sách
        </button>
      </form>
    </div>
  );
}