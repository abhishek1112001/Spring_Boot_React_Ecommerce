package com.edu.usersmanagementsystem.controller;

import com.edu.usersmanagementsystem.dto.ReqRes;
import com.edu.usersmanagementsystem.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
//@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/admin/book/addBook")
    public ResponseEntity<ReqRes> addBook(@RequestBody ReqRes reqRes) {
        return ResponseEntity.ok(bookService.addBook(reqRes));
    }

    @PutMapping("/admin/book/updateBook/{id}")
    public ResponseEntity<ReqRes> updateBook(@PathVariable Integer id, @RequestBody ReqRes reqRes) {
        return ResponseEntity.ok(bookService.updateBook(id, reqRes));
    }

    @DeleteMapping("/admin/book/deleteBook/{id}")
    public ResponseEntity<ReqRes> deleteBook(@PathVariable Integer id) {
        return ResponseEntity.ok(bookService.deleteBook(id));
    }

    @GetMapping("/adminuser/get-books")
    public ResponseEntity<ReqRes> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }
    
    @GetMapping("/adminuser/get-book/{bookId}")
    public ResponseEntity<ReqRes> getUSerByID(@PathVariable Integer bookId){
        return ResponseEntity.ok(bookService.getBookById(bookId));

    }
    
    @PostMapping("/admin/uploadBookImage")
    public ResponseEntity<ReqRes> uploadBookImage(@RequestParam("imageFile") MultipartFile imageFile) {
        return ResponseEntity.ok(bookService.uploadBookImage(imageFile));
    }

}
