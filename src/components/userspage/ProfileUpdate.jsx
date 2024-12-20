import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function ProfileUpdate() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    city: "",
  });

  useEffect(() => {
    fetchUserDataById(userId);
  }, [userId]);

  const fetchUserDataById = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getUsersByIdForProfile(userId, token);
      const { name, email, role, city } = response.ourUsers;
      setUserData({ name, email, role, city });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update your profile?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");
        const res = await UserService.updateUserProfile(
          userId,
          userData,
          token
        );
        console.log(res);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg rounded-lg mb-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-800 font-medium">Role:</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-800 font-medium">City:</label>
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;
