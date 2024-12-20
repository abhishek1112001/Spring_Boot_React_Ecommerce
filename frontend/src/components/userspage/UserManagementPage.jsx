import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../service/UserService";

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUsers(token);
      setUsers(response.data.ourUsersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await UserService.deleteUser(userId, token);
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <p className="text-center text-gray-600 mb-4 mt-4">
        <b className="text-3xl text-red-700">
          Note : Do not update the current login admin email
        </b>
      </p>
      <div className="max-w-7xl mx-auto mt-10 p-8 bg-gradient-to-r from-teal-50 to-indigo-50 shadow-lg rounded-lg mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Users Management Page
        </h2>
        <button className="bg-indigo-500 text-white px-6 py-3 rounded mb-4 hover:bg-indigo-600 transition-colors duration-300">
          <Link to="/register">Add User</Link>
        </button>
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-6 py-3 text-gray-700">ID</th>
              <th className="px-6 py-3 text-gray-700">Name</th>
              <th className="px-6 py-3 text-gray-700">Email</th>
              <th className="px-6 py-3 text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3 text-gray-800">{user.id}</td>
                  <td className="px-6 py-3 text-gray-800">{user.name}</td>
                  <td className="px-6 py-3 text-gray-800">{user.email}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-300"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300">
                      <Link to={`/update-user/${user.id}`}>Update</Link>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-700">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManagementPage;
