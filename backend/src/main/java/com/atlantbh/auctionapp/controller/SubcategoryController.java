package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Subcategory;
import com.atlantbh.auctionapp.response.BasicSubcategoryResponse;
import com.atlantbh.auctionapp.service.SubcategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subcategories")
public class SubcategoryController {

    private final SubcategoryService subcategoryService;

    public SubcategoryController(SubcategoryService subcategoryService) {
        this.subcategoryService = subcategoryService;
    }


    @GetMapping("/")
    public ResponseEntity<List<BasicSubcategoryResponse>> getSubcategories() {
        return ResponseEntity.ok(subcategoryService.getSubcategories());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Subcategory>> getAllSubcategories() {
        return ResponseEntity.ok(subcategoryService.getAllSubcategories());
    }

    @GetMapping("/category")
    public ResponseEntity<List<BasicSubcategoryResponse>> getSubcategoriesForCategory(@RequestParam Long id) {
        return ResponseEntity.ok(subcategoryService.getSubcategoriesForCategory(id));
    }
}
