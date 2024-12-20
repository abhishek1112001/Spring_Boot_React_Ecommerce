import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../service/UserService";

function UpdateBook() {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchBookDataById(bookId);
  }, [bookId]);

  const fetchBookDataById = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getBookById(bookId, token);
      const { title, author, description, price, imageUrl } = response.book;
      setBookData({ title, author, description, price, imageUrl });
      setImagePreview(imageUrl);
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevBookData) => ({
      ...prevBookData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview("");
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      return null;
    }

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("imageFile", imageFile);

      const response = await UserService.addImage(formData, token);

      if (response && response.image) {
        alert("Image uploaded successfully");
        return response.image;
      } else {
        alert("Image upload failed, but the file might still be uploaded.");
        console.error("Image upload response (missing image):", response);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this book?"
      );
      if (confirmUpdate) {
        const token = localStorage.getItem("token");

        const updatedBookData = {
          ...bookData,
        };

        if (imageFile) {
          const newImageUrl = await handleImageUpload();
          if (newImageUrl) {
            updatedBookData.image = newImageUrl;
          }
        } else {
          updatedBookData.image = bookData.imageUrl;
        }

        const response = await UserService.updateBook(
          bookId,
          updatedBookData,
          token
        );
        if (response && response.statusCode === 200) {
          alert("Book updated successfully");
          navigate("/admin/book-management");
        } else {
          alert("Book update failed");
        }
      }
    } catch (error) {
      console.error("Error updating book profile:", error);
      alert("An error occurred while updating the book");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-50 to-teal-50 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 leading-tight">
        Update Book
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Author:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Description:</label>
          <input
            type="text"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Price:</label>
          <input
            type="text"
            name="price"
            value={bookData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            aria-label="Choose image"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          <button
            type="button"
            onClick={handleImageUpload}
            className="mt-5 bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Upload Image
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
