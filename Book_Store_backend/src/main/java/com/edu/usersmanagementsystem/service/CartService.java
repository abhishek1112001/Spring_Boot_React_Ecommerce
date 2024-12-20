package com.edu.usersmanagementsystem.service;

import com.edu.usersmanagementsystem.dto.CartItemDTO;
import com.edu.usersmanagementsystem.dto.ReqRes;
import com.edu.usersmanagementsystem.entity.Book;
import com.edu.usersmanagementsystem.entity.Cart;
import com.edu.usersmanagementsystem.entity.OurUsers;
import com.edu.usersmanagementsystem.repository.BookRepo;
import com.edu.usersmanagementsystem.repository.CartRepo;
import com.edu.usersmanagementsystem.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private UsersRepo userRepo;

    @Autowired
    private BookRepo bookRepo;

    public ReqRes addToCart(ReqRes reqRes) {
        ReqRes response = new ReqRes();
        try {
            // Fetch the user and book entities
            OurUsers user = userRepo.findById(reqRes.getUserId()).orElse(null);
            Book book = bookRepo.findById(reqRes.getBookId()).orElse(null);

            // Validate user and book
            if (user == null || book == null) {
                response.setStatusCode(404);
                response.setMessage(user == null ? "User not found" : "Book not found");
                return response;
            }

            // Create and save the Cart object
            Cart cartItem = new Cart();
            cartItem.setUser(user);
            cartItem.setBook(book);
            cartItem.setQuantity(reqRes.getQuantity());
            cartItem.setTotalPrice(reqRes.getTotalPrice());

            cartRepo.save(cartItem);

            response.setStatusCode(200);
            response.setMessage("Item added to cart successfully");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

//    public ReqRes getCartByUser(Integer userId) {
//        ReqRes response = new ReqRes();
//        try {
//            // Fetch user
//            OurUsers user = userRepo.findById(userId).orElse(null);
//            //Cart cart = cartRepo.findById(userId).orElse(null);
//
//            // Validate user
//            if (user == null) {
//                response.setStatusCode(404);
//                response.setMessage("User not found");
//                return response;
//            }
//
//            // Fetch cart items for the user
//            List<Cart> cartItems = cartRepo.findByUserId(userId);
//
//            // Extract book details from the cart
//            List<Book> books = cartItems.stream()
//                    .map(Cart::getBook)
//                    .collect(Collectors.toList());
//
//            response.setStatusCode(200);
//            response.setMessage("Cart retrieved successfully");
//            response.setBooks(books);
//            
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setMessage("Error: " + e.getMessage());
//        }
//        return response;
//    }
    
    public ReqRes getCartByUser(Integer userId) {
        ReqRes response = new ReqRes();
        try {
            // Fetch user
            OurUsers user = userRepo.findById(userId).orElse(null);

            // Validate user
            if (user == null) {
                response.setStatusCode(404);
                response.setMessage("User not found");
                return response;
            }

            // Fetch cart items for the user
            List<Cart> cartItems = cartRepo.findByUserId(userId);

            // Map cart items to CartItemDTO
            List<CartItemDTO> cartItemDTOs = cartItems.stream().map(cart -> {
                CartItemDTO cartItemDTO = new CartItemDTO();

                // Populate book details
                Book book = cart.getBook();
                cartItemDTO.setBookId(book.getId());
                cartItemDTO.setTitle(book.getTitle());
                cartItemDTO.setAuthor(book.getAuthor());
                cartItemDTO.setDescription(book.getDescription());
                cartItemDTO.setPrice(book.getPrice());
                cartItemDTO.setImageUrl(book.getImageUrl());
                cartItemDTO.setCartId(cart.getId());

                // Populate cart-specific details
                cartItemDTO.setQuantity(cart.getQuantity());
                cartItemDTO.setTotalPrice(cart.getQuantity() * book.getPrice());

                return cartItemDTO;
            }).collect(Collectors.toList());

            // Build response
            response.setStatusCode(200);
            response.setMessage("Cart retrieved successfully");
            response.setCartItems(cartItemDTOs); // Add the DTO list to the response

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error: " + e.getMessage());
        }
        return response;
    }

    public ReqRes deleteCartItem(Integer cartId)
    {
        ReqRes response = new ReqRes();
        try {
            if (!cartRepo.existsById(cartId))
            {
                response.setStatusCode(404);
                response.setMessage("Item in Cart is not found");
                return response;
            }
            cartRepo.deleteById(cartId);
            response.setStatusCode(200);
            response.setMessage("Item in Cart is deleted successfully");
        }
        catch (Exception e)
        {
            response.setStatusCode(500);
            response.setMessage("error" + e.getMessage());
        }
        return response;
    }



}
