import React, { useState, useEffect } from "react";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.ourUsers);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-r from-indigo-50 to-teal-50 shadow-lg rounded-lg mb-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Profile Information
      </h2>
      <p className="text-gray-800 mb-4">
        <span className="font-semibold">Name:</span> {profileInfo.name}
      </p>
      <p className="text-gray-800 mb-4">
        <span className="font-semibold">Email:</span> {profileInfo.email}
      </p>
      <p className="text-gray-800 mb-6">
        <span className="font-semibold">City:</span> {profileInfo.city}
      </p>

      {/* Update button visible only for ADMIN role */}
      {profileInfo.role === "ADMIN" && (
        <Link
          to={`/update-profile/${profileInfo.id}`}
          className="inline-block w-full px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Update This Profile
        </Link>
      )}
      {profileInfo.role === "USER" && (
        <Link
          to={`/update-profile/${profileInfo.id}`}
          className="inline-block w-full px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
        >
          Update This Profile
        </Link>
      )}
    </div>
  );
}

export default ProfilePage;
