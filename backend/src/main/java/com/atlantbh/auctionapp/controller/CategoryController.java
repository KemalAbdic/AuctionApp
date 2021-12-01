package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Category;
import com.atlantbh.auctionapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getCategories());
    }
}
