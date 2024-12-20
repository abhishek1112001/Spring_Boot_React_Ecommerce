package com.edu.usersmanagementsystem.controller;

import com.edu.usersmanagementsystem.dto.ReqRes;
import com.edu.usersmanagementsystem.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/user/add-to-cart")
    public ResponseEntity<ReqRes> addToCart(@RequestBody ReqRes reqRes) {
        return ResponseEntity.ok(cartService.addToCart(reqRes));
    }

    @GetMapping("/user/getCart/{userId}")
    public ResponseEntity<ReqRes> getCart(@PathVariable Integer userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @DeleteMapping("/user/deleteCart/{cartId}")
    public ResponseEntity<ReqRes> deleteCart(@PathVariable Integer cartId)
    {
        return ResponseEntity.ok(cartService.deleteCartItem(cartId));
    }

}
