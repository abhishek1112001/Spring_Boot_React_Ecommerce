import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(email, password);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("cartIdRetrive", userData.cartIdRetrive);

        // Use login from AuthContext
        login(userData.token, userData.role, userData.cartIdRetrive);

        navigate("/profile");
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const registerUser = () => {
    navigate("/user/user-register");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-2 border-indigo-200 rounded-lg bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 leading-tight">
        Login
      </h2>
      {error && (
        <p className="text-red-500 text-center text-sm mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Your password"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <button
        onClick={registerUser}
        className="w-full px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 mt-6"
      >
        Register
      </button>
    </div>
  );
}

export default LoginPage;
