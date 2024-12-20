package com.edu.usersmanagementsystem.dto;

import lombok.Data;

@Data
public class CartItemDTO {

	private Integer cartId;
	private Integer bookId;
    private String title;
    private String author;
    private String description;
    private Double price; // Book price
    private String imageUrl;
    private Integer quantity; // Quantity in the cart
    private Double totalPrice; // Total price (book price * quantity)
}
