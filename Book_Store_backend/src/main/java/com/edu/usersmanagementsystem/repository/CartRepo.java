package com.edu.usersmanagementsystem.repository;

import com.edu.usersmanagementsystem.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepo extends JpaRepository<Cart, Integer> {
    List<Cart> findByUserId(Integer userId);
}
