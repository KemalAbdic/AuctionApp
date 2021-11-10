package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Picture;
import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.repository.PictureRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.response.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final PictureRepository pictureRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, PictureRepository pictureRepository) {
        this.productRepository = productRepository;
        this.pictureRepository = pictureRepository;
    }

    public ProductResponse getProduct(Long productId, Long personId) {
        Product product = productRepository.getProductByIdAndPersonId(productId, personId);
        List<Picture> productPictures = pictureRepository.findPictureByProductId(productId);
        return new ProductResponse(product, productPictures);
    }

    public Product findProductById(Long id) {
        Optional<Product> product = productRepository.findProductsById(id);
        return product.orElse(null);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductsByIdAndPersonId(Long id, Long personId) {
        return productRepository.getProductByIdAndPersonId(id, personId);
    }
}
