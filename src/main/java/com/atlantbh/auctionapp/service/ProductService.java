package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Picture;
import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.repository.PictureRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.response.ProductResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

    public ProductResponse getProduct(Long productId, Long personId) {
        Product product = (Product) productRepository.getProductByIdAndPerson_Id(productId, personId);
        List<Picture> productPictures = pictureRepository.findPictureByProduct_Id(productId);
        ProductResponse productResponse = new ProductResponse(product, productPictures);
        return productResponse;
    }

}
