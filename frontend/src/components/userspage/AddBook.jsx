import React, { useState } from "react";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      // Old Image preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formDataImage = new FormData();
      formDataImage.append("imageFile", imageFile);

      const response = await UserService.addImage(formDataImage, token);

      if (response && response.image) {
        setFormData({ ...formData, image: response.image });
        alert("Image uploaded successfully");
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!formData.image) {
        alert("Please upload an image before submitting the book.");
        return;
      }

      await UserService.addBook(formData, token);

      setFormData({
        title: "",
        author: "",
        description: "",
        price: "",
        image: "",
      });

      alert("Book added successfully");
      navigate("/admin/book-management");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-50 to-teal-50 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 leading-tight">
        Add Book
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
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
            value={formData.author}
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
            value={formData.description}
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
            value={formData.price}
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
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
            onClick={handleAddImage}
            className="mt-5 bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors"
          >
            Upload Image
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-3 px-4 rounded-md hover:bg-indigo-600 transition-colors"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
