import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function BookManagement() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllBooks(token);

      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
      );
      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await UserService.deleteBook(bookId, token);
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg mb-16 rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 leading-tight">
        Book Management Page
      </h2>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded mb-4 hover:bg-indigo-600">
        <Link to="/admin/book-add">Add Book</Link>
      </button>
      <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="px-4 py-2">{book.id}</td>
                <td className="px-4 py-2">{book.title}</td>
                <td className="px-4 py-2">{book.author}</td>
                <td className="px-4 py-2">{book.description}</td>
                <td className="px-4 py-2">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-auto h-[200px] object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">{book.price}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    <Link to={`/admin/update-book/${book.id}`}>Update</Link>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-600">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookManagement;
