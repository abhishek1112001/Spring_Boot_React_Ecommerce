import React, { useState } from "react";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await UserService.register(formData, token);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        city: "",
      });
      alert("User registered successfully");
      navigate("/admin/user-management");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border-2 border-indigo-200 rounded-lg bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 leading-tight">
        User Registration
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Enter your role"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 font-medium mb-2">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 text-gray-800"
            placeholder="Enter your city"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
