package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.request.ProductRequest;
import com.atlantbh.auctionapp.response.*;
import com.atlantbh.auctionapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @GetMapping("/search")
    public ResponseEntity<ProductPageResponse> getAllProducts(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                                              @RequestParam(name = "sort", defaultValue = "") String sort) {
        return ResponseEntity.ok(productService.findAllProducts(page, sort));
    }

    @GetMapping("/search/price")
    public ResponseEntity<ProductPageResponse> getAllProducts(@RequestParam(name = "minPrice", defaultValue = "0", required = false) Double minPrice,
                                                              @RequestParam(name = "maxPrice", defaultValue = "999999", required = false) Double maxPrice,
                                                              @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                              @RequestParam(name = "sort", defaultValue = "") String sort) {
        return ResponseEntity.ok(productService.findAllProductsAndFilterByPrice(minPrice, maxPrice, page, sort));
    }

    @GetMapping("/category/{query}")
    public ResponseEntity<ProductPageResponse> getProductsByCategory(@PathVariable(name = "query", required = false) String query,
                                                                     @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                                     @RequestParam(name = "sort", defaultValue = "") String sort
    ) {
        return ResponseEntity.ok(productService.getProductsByCategory(query, page, sort));
    }

    @GetMapping("/category/")
    public ResponseEntity<ProductPageResponse> getProductsByCategory(@RequestParam(name = "query", defaultValue = "") String query,
                                                                     @RequestParam(name = "subcategory", defaultValue = "") String subcategory,
                                                                     @RequestParam(name = "minPrice", defaultValue = "0") Double minPrice,
                                                                     @RequestParam(name = "maxPrice", defaultValue = "999999") Double maxPrice,
                                                                     @RequestParam(name = "page", defaultValue = "0") Integer page,
                                                                     @RequestParam(name = "sort", defaultValue = "") String sort
    ) {
        return ResponseEntity.ok(productService.getProductsByCategoryAndSubcategory(query, subcategory, minPrice, maxPrice, page, sort));
    }

    @GetMapping("/search/count")
    public ResponseEntity<List<CategoryResponse>> getCategoriesList() {
        return ResponseEntity.ok(productService.categoriesList());
    }

    @GetMapping("/person")
    public ResponseEntity<List<PersonProductResponse>> getPersonProducts() {
        return ResponseEntity.ok(productService.getPersonProducts());
    }

    @GetMapping("/person/bids")
    public ResponseEntity<List<PersonProductResponse>> getPersonBiddedProducts() {
        return ResponseEntity.ok(productService.getPersonBiddedProducts());
    }

    @PostMapping("/add")
    public ResponseEntity<Long> add(@RequestBody @Valid ProductRequest productRequest) {
        Long productId = productService.addProduct(productRequest);
        return ResponseEntity.ok(productId);
    }

    @GetMapping("/related")
    public ResponseEntity<List<BasicProductResponse>> getRelatedProducts(@RequestParam Long id) {
        return ResponseEntity.ok(productService.getRelatedProducts(id));
    }
}
