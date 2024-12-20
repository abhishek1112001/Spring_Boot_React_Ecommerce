package com.edu.usersmanagementsystem.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.edu.usersmanagementsystem.dto.ReqRes;
import com.edu.usersmanagementsystem.entity.Book;
import com.edu.usersmanagementsystem.repository.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private Cloudinary cloudinary;

    public ReqRes addBook(ReqRes reqRes) {
        ReqRes response = new ReqRes();
        try {
            // Create Book from ReqRes fields
            Book book = new Book();
            book.setTitle(reqRes.getTitle());
            book.setAuthor(reqRes.getAuthor());
            book.setDescription(reqRes.getDescription());
            book.setPrice(reqRes.getPrice());
            book.setImageUrl(reqRes.getImage());
//            book.setQuantity(reqRes.getQuantity());

            // Save the book
            Book savedBook = bookRepo.save(book);
            response.setStatusCode(200);
            response.setMessage("Book added successfully");
            response.setBook(savedBook);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

//    public ReqRes updateBook(Integer bookId, ReqRes reqRes) {
//        ReqRes response = new ReqRes();
//        try {
//            // Retrieve the existing book by ID
//            Book existingBook = bookRepo.findById(bookId).orElse(null);
//
//            // If the book is not found, return an error response
//            if (existingBook == null) {
//                response.setStatusCode(404);
//                response.setMessage("Book not found");
//                return response;
//            }
//
//            // Set the updated fields from ReqRes to the existing book
//            existingBook.setTitle(reqRes.getTitle());
//            existingBook.setAuthor(reqRes.getAuthor());
//            existingBook.setDescription(reqRes.getDescription());
//            existingBook.setPrice(reqRes.getPrice());
//            existingBook.setImageUrl(reqRes.getImage());
////            existingBook.setQuantity(reqRes.getQuantity());
//
//            // Save the updated book
//            Book updatedBook = bookRepo.save(existingBook);
//
//            response.setStatusCode(200);
//            response.setMessage("Book updated successfully");
//            response.setBook(updatedBook);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error: " + e.getMessage());
//        }
//        return response;
//    }
    
    public ReqRes updateBook(Integer bookId, ReqRes reqRes) {
        ReqRes response = new ReqRes();
        try {
            // Log the incoming request to inspect the image value
            System.out.println("Incoming Request - Image: " + reqRes.getImage());

            // Retrieve the existing book by ID
            Book existingBook = bookRepo.findById(bookId).orElse(null);

            // If the book is not found, return an error response
            if (existingBook == null) {
                response.setStatusCode(404);
                response.setMessage("Book not found");
                return response;
            }

            // Store the previous image URL in a variable
            String previousImageUrl = existingBook.getImageUrl();
            System.out.println("Previous Image URL: " + previousImageUrl);

            // Set the updated fields from ReqRes to the existing book
            existingBook.setTitle(reqRes.getTitle());
            existingBook.setAuthor(reqRes.getAuthor());
            existingBook.setDescription(reqRes.getDescription());
            existingBook.setPrice(reqRes.getPrice());

            // Check if the new image URL is provided (non-empty)
            if (reqRes.getImage() != null && !reqRes.getImage().isEmpty()) {
                // Log to verify if the image field is being updated
                System.out.println("Updating Image URL: " + reqRes.getImage());
                existingBook.setImageUrl(reqRes.getImage());
            } else {
                // If no new image is provided, retain the previous image URL
                System.out.println("No Image Update - Retaining Previous Image URL");
                existingBook.setImageUrl(previousImageUrl);
            }

            // Save the updated book
            Book updatedBook = bookRepo.save(existingBook);

            response.setStatusCode(200);
            response.setMessage("Book updated successfully");
            response.setBook(updatedBook);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }




    public ReqRes deleteBook(Integer bookId) {
        ReqRes response = new ReqRes();
        try {
            // Check if the book exists
            if (!bookRepo.existsById(bookId)) {
                response.setStatusCode(404);
                response.setMessage("Book not found");
                return response;
            }

            // Delete the book if it exists
            bookRepo.deleteById(bookId);
            response.setStatusCode(200);
            response.setMessage("Book deleted successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    public ReqRes getAllBooks() {
        ReqRes response = new ReqRes();
        try {
            response.setBooks(bookRepo.findAll());
            response.setStatusCode(200);
            response.setMessage("Books retrieved successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }
    
    public ReqRes getBookById (Integer bookId) 
    {
    	ReqRes response = new ReqRes();    	
    	try {
    		Book bookById = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Book not found"));
			response.setBook(bookById);
			response.setStatusCode(200);
			response.setMessage("Book with id '" + bookId + "' found successfully");    		
		} catch (Exception e) {
			response.setStatusCode(500);
			response.setMessage("Error: " + e.getMessage());
		}
    	return response;
    }

    public ReqRes uploadBookImage(MultipartFile imageFile) {
        ReqRes response = new ReqRes();
        try {
            // Upload the image to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.asMap("resource_type", "auto"));
            String imageUrl = (String) uploadResult.get("secure_url");

            response.setStatusCode(200);
            response.setMessage("Image uploaded successfully");
            response.setImage(imageUrl);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }
    
    
    

}
