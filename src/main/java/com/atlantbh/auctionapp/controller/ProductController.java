package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Product;
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

    @GetMapping()
    public ResponseEntity<?> getProduct(@RequestParam Long id, @RequestParam Long personId) {
        return ResponseEntity.ok(productService.getProductsByIdAndPersonId(id, personId));
    }

    @GetMapping("/")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productService.findProductById(id);
        if (product == null) {
            return ResponseEntity.badRequest().body( new Exception("product with id " + id + " does not exist"));
        }
        return ResponseEntity.ok().body(product);
    }
}