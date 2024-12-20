package com.edu.usersmanagementsystem.dto;

import com.edu.usersmanagementsystem.entity.Book;
import com.edu.usersmanagementsystem.entity.Cart;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.edu.usersmanagementsystem.entity.OurUsers;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String city;
    private String role;
    private String email;
    private String password;
    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;

    private String title;
    private String author;
    private String description;
    private Integer price;
    private Integer quantity;
    private Book book;
    private List<Book> books;

    private Cart cart;
    private Integer userId;
    private Integer bookId;
    private String image;
    
    private Integer cartIdRetrive;
    private Integer totalPrice;
    
    private List<CartItemDTO> cartItems;

}
