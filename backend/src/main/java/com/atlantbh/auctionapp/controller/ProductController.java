package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.response.ProductResponse;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

   /* @GetMapping("/")
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
    }*/
}
