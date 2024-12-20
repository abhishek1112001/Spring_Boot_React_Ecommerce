package com.edu.usersmanagementsystem.repository;

import com.edu.usersmanagementsystem.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Integer> {
}
