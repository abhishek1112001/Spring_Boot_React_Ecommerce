import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetail();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      setTotalPrice(book.price * quantity);
    }
  }, [book, quantity]);

  const fetchBookDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getBookById(bookId, token);
      setBook(response.book);
    } catch (error) {
      console.error("Error fetching book detail:", error);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("cartIdRetrive");
      const cartData = {
        userId: userId,
        bookId: book.id,
        quantity: quantity,
        totalPrice: totalPrice,
      };
      const response = await UserService.addCart(cartData, token);
      alert(response.message);
      navigate("/user/all-books");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  if (!book) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg mb-10 rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        {book.title}
      </h2>
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full md:w-1/3 h-80 object-cover rounded-md mb-6 md:mb-0"
        />
        <div className="ml-0 md:ml-6 w-full md:w-2/3">
          <p className="text-gray-700 text-xl font-semibold">
            Author: {book.author}
          </p>
          <p className="text-gray-700 text-xl font-semibold mt-2">
            Price: ${book.price}
          </p>
          <div className="mt-4">
            <label
              htmlFor="quantity"
              className="text-gray-700 text-lg font-semibold"
            >
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="ml-2 w-20 p-2 border rounded-md"
            />
          </div>
          <p className="text-gray-700 text-xl font-semibold mt-2">
            Total Price: ${totalPrice}
          </p>
          <p className="text-gray-800 mt-6 text-lg">{book.description}</p>
          <button
            className="bg-indigo-500 text-white px-6 py-2 rounded-lg mt-6 hover:bg-indigo-600 transition"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
