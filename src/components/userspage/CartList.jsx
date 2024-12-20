import React, { useEffect, useState } from "react";
import UserService from "../service/UserService";
import { useParams } from "react-router-dom";

function CartList() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getCartItemsUserById(userId, token);

      if (response.statusCode === 200) {
        const updatedCartItems = response.cartItems.map((item) => ({
          ...item,
          totalPrice: item.price * item.quantity,
        }));
        setCartItems(updatedCartItems);
      } else {
        setError(response.message || "Failed to retrieve cart items.");
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("An error occurred while fetching cart items.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (bookId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.bookId === bookId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: item.price * newQuantity,
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDelete = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.deleteCartItem(cartId, token);

      if (response.statusCode === 200) {
        setCartItems(cartItems.filter((item) => item.cartId !== cartId));
      } else {
        alert(response.message || "Failed to delete the cart item.");
      }
    } catch (err) {
      console.error("Error deleting cart item:", err);
      alert("An error occurred while deleting the cart item.");
    }
  };

  const confirmDelete = (cartId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item from your cart?"
      )
    ) {
      handleDelete(cartId);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.cartId}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-700 font-semibold mt-2">
              Author: {item.author}
            </p>
            <p className="text-gray-700 font-semibold mt-1">
              Price: ${item.price}
            </p>
            <div className="flex items-center mt-1">
              <label className="text-gray-700 font-semibold mr-2">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    item.bookId,
                    parseInt(e.target.value, 10)
                  )
                }
                className="w-16 border rounded px-2 py-1"
              />
            </div>
            <p className="text-gray-700 font-semibold mt-1">
              Total Price: ${item.totalPrice.toFixed(2)}
            </p>
            <p className="text-gray-700 mt-2">{item.description}</p>
            <button
              onClick={() => confirmDelete(item.cartId)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
