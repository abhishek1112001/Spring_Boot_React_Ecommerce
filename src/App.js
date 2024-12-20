import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import UserManagementPage from "./components/userspage/UserManagementPage";
import UpdateUser from "./components/userspage/UpdateUser";
import RegistrationPage from "./components/auth/RegistrationPage";
import ProfilePage from "./components/userspage/ProfilePage";
import LoginPage from "./components/auth/LoginPage";
import Footer from "./components/common/Footer";
import BookManagement from "./components/userspage/BookManagement";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/context/PrivateRoute"; // Import PrivateRoute
import AddBook from "./components/userspage/AddBook";
import UpdateBook from "./components/userspage/UpdateBook";
import BookList from "./components/userspage/BookList";
import BookDetail from "./components/userspage/BookDetail";
import CartList from "./components/userspage/CartList";
import UserRegister from "./components/userspage/UserRegister";
import ProfileUpdate from "./components/userspage/ProfileUpdate";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Routes wrapped with Route and PrivateRoute */}
              <Route
                path="/profile"
                element={<PrivateRoute element={<ProfilePage />} />}
              />
              <Route
                path="/register"
                element={<PrivateRoute element={<RegistrationPage />} />}
              />
              <Route
                path="/admin/user-management"
                element={<PrivateRoute element={<UserManagementPage />} />}
              />
              <Route
                path="/update-user/:userId"
                element={<PrivateRoute element={<UpdateUser />} />}
              />
              <Route
                path="/admin/book-management"
                element={<PrivateRoute element={<BookManagement />} />}
              />
              <Route
                path="/admin/book-add"
                element={<PrivateRoute element={<AddBook />} />}
              />
              <Route
                path="/admin/update-book/:bookId"
                element={<PrivateRoute element={<UpdateBook />} />}
              />
              <Route
                path="/user/all-books"
                element={<PrivateRoute element={<BookList />} />}
              />
              <Route
                path="/user/get-book/:bookId"
                element={<PrivateRoute element={<BookDetail />} />}
              />
              <Route
                path="/user/get-cart/:userId"
                element={<PrivateRoute element={<CartList />} />}
              />

              <Route
                path="/update-profile/:userId"
                element={<PrivateRoute element={<ProfileUpdate />} />}
              />

              <Route path="/user/user-register" element={<UserRegister />} />
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
