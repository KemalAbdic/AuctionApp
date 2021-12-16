package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Picture;
import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.repository.PictureRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.response.BasicProductResponse;
import com.atlantbh.auctionapp.response.ProductPageResponse;
import com.atlantbh.auctionapp.response.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final PictureRepository pictureRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, PictureRepository pictureRepository) {
        this.productRepository = productRepository;
        this.pictureRepository = pictureRepository;
    }

    public ProductResponse getProduct(Long id) {
        Product product = productRepository.findProductById(id);
        List<Picture> productPictures = pictureRepository.findAllByProductId(id);
        return new ProductResponse(product, productPictures);
    }

    public List<BasicProductResponse> getNewProducts() {
        return productRepository.findNewProducts();
    }

    public List<BasicProductResponse> getLastChanceProducts() {
        return productRepository.findLastProducts();
    }

    public List<BasicProductResponse> getRandomProduct() {
        return productRepository.findRandomProducts();
    }

    public ProductPageResponse findAllProducts(Integer page, String sort) {
        PageRequest pageRequest;
        if ("new".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("auctionStart").ascending());
        } else if ("new_desc".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("auctionEnd").descending());
        } else if ("price".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("startingPrice").ascending());
        } else if ("price_desc".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("startingPrice").descending());
        } else {
            pageRequest = PageRequest.of(page, 9, Sort.by("name"));
        }

        Page<BasicProductResponse> allProducts = productRepository.findAllProducts(pageRequest);
        return new ProductPageResponse(allProducts.getContent(), !allProducts.hasNext());
    }

    public ProductPageResponse getItemsByCategoryId(String query, Integer page, String sort) {
        PageRequest pageRequest;
        if ("new".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("auctionStart").ascending());
        } else if ("new_desc".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("auctionEnd").descending());
        } else if ("price".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("startingPrice").ascending());
        } else if ("price_desc".equals(sort)) {
            pageRequest = PageRequest.of(page, 9, Sort.by("startingPrice").descending());
        } else {
            pageRequest = PageRequest.of(page, 9, Sort.by("name"));
        }

        Page<BasicProductResponse> categoryResult = productRepository.findProductsByCategoryName(query, pageRequest);
        return new ProductPageResponse(categoryResult.getContent(), !categoryResult.hasNext());
    }
}
