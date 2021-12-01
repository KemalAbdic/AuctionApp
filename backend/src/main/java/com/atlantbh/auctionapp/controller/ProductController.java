package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.response.BasicProductResponse;
import com.atlantbh.auctionapp.response.ProductResponse;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public ResponseEntity<ProductResponse> getProduct(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    @GetMapping("/new")
    public ResponseEntity<List<BasicProductResponse>> getNewProducts() {
        return ResponseEntity.ok(productService.getNewProducts());
    }

    @GetMapping("/last")
    public ResponseEntity<List<BasicProductResponse>> getLastProducts() {
        return ResponseEntity.ok(productService.getLastChanceProducts());
    }

    @GetMapping("/random")
    public ResponseEntity<List<BasicProductResponse>> getRandomProduct() {
        return ResponseEntity.ok(productService.getRandomProduct());
    }
}
