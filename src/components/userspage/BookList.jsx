import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function BookList() {
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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Book List</h2>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-70 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              {book.title}
            </h3>
            <p className="text-gray-600">Price: ${book.price}</p>
            <Link
              to={`/user/get-book/${book.id}`}
              className="text-blue-500 hover:text-blue-700 mt-2 block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
