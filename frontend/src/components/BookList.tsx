import { Edit2, Trash2, BookOpen } from 'lucide-react';
import type { Book } from '../App';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export function BookList({ books, onEdit, onDelete }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-gray-900 mb-2">Chưa có sách nào</h3>
        <p className="text-gray-600">Nhấn nút &quot;Thêm Sách Mới&quot; để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-gray-700">ID</th>
              <th className="px-6 py-4 text-left text-gray-700">Tên Sách</th>
              <th className="px-6 py-4 text-left text-gray-700">Tác Giả</th>
              <th className="px-6 py-4 text-left text-gray-700">Năm Xuất Bản</th>
              <th className="px-6 py-4 text-left text-gray-700">Giá</th>
              <th className="px-6 py-4 text-right text-gray-700"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-600">{book.id}</td>
                <td className="px-6 py-4">
                  <div className="text-gray-900">{book.title}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{book.author}</td>
                <td className="px-6 py-4 text-gray-600">{book.published_year}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700">
                    {book.price}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(book)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(book.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
