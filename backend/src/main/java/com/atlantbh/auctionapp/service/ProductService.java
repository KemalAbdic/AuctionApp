package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.model.Picture;
import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.model.Subcategory;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.repository.PictureRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.repository.SubcategoryRepository;
import com.atlantbh.auctionapp.request.ProductRequest;
import com.atlantbh.auctionapp.response.*;
import com.atlantbh.auctionapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final PictureRepository pictureRepository;
    private final SubcategoryRepository subcategoryRepository;
    private final PersonRepository personRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, PictureRepository pictureRepository, SubcategoryRepository subcategoryRepository, PersonRepository personRepository) {
        this.productRepository = productRepository;
        this.pictureRepository = pictureRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.personRepository = personRepository;
    }

    public ProductResponse getProduct(Long id) {
        FullProductResponse product = productRepository.getProduct(id);
        List<BasicPictureResponse> productPictures = pictureRepository.findAllByProductId(id);
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

    public ProductPageResponse findAllProductsAndFilterByPrice(Double minPrice, Double maxPrice, Integer page, String sort) {
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

        Page<BasicProductResponse> allProducts = productRepository.findAllProductsAndFilterByPrice(minPrice, maxPrice, pageRequest);
        return new ProductPageResponse(allProducts.getContent(), !allProducts.hasNext());
    }

    public ProductPageResponse getProductsByCategory(String query, Integer page, String sort) {
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

        Slice<BasicProductResponse> categoryResult = productRepository.findProductsByCategoryName(query, pageRequest);
        return new ProductPageResponse(categoryResult.getContent(), !categoryResult.hasNext());
    }

    public ProductPageResponse getProductsByCategoryAndSubcategory(String query, String subcategory, Double minPrice, Double maxPrice, Integer page, String sort) {
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

        Slice<BasicProductResponse> categoryResult = productRepository.findProductsByCategoryAndSubcategory(query.toLowerCase(), subcategory.toLowerCase(), minPrice, maxPrice, pageRequest);
        return new ProductPageResponse(categoryResult.getContent(), !categoryResult.hasNext());
    }

    public List<CategoryResponse> categoriesList() {
        List<CategoryListResponse> productCount = productRepository.findProductsByCategoryAndSubcategoryCount();
        List<CategoryResponse> categoryResponse = new ArrayList<>();

        productCount.forEach(product -> {
            CategoryResponse category = new CategoryResponse(product.getCategoryName(), product.getCount(), new TreeSet<>());
            int i = categoryResponse.indexOf(category);
            if (i == -1) {
                category.addSubcategory(new CountResponse(product.getSubcategoryName(), product.getCount()));
                categoryResponse.add(category);
            } else {
                CategoryResponse oldCategory = categoryResponse.get(i);
                oldCategory.setCount(oldCategory.getCount() + product.getCount());
                oldCategory.addSubcategory(new CountResponse(product.getSubcategoryName(), product.getCount()));
            }
        });
        categoryResponse.sort(Comparator.comparing(CategoryResponse::getCount).reversed());
        return categoryResponse;
    }

    public List<PersonProductResponse> getPersonProducts() {
        Long personId = JwtUtils.getRequestPersonId();
        return productRepository.getPersonProducts(personId);
    }

    public List<PersonProductResponse> getPersonBiddedProducts() {
        Long personId = JwtUtils.getRequestPersonId();
        return productRepository.getPersonBidProducts(personId);
    }

    public Long addProduct(ProductRequest productRequest) {
        Subcategory subcategory = subcategoryRepository.getById(productRequest.getSubcategoryId());
        Long personId = JwtUtils.getRequestPersonId();
        if (personId == null) throw new RuntimeException("Invalid JWT");
        Person person = personRepository.getById(personId);
        if (productRequest.getAuctionEnd().isBefore(LocalDateTime.now()))
            throw new RuntimeException("End date can't be before current date");
        if (!productRequest.getAuctionEnd().isAfter(productRequest.getAuctionStart()))
            throw new RuntimeException("End date must be after start date");

        Product product = new Product(
                person,
                subcategory,
                productRequest.getName(),
                productRequest.getStartingPrice(),
                productRequest.getAuctionStart(),
                productRequest.getAuctionEnd(),
                productRequest.getStreet(),
                productRequest.getCity(),
                productRequest.getCountry(),
                productRequest.getZipCode(),
                productRequest.getPhoneNumber());
        product.setDescription(productRequest.getDescription());
        Product savedProduct = productRepository.save(product);
        savePictures(savedProduct, productRequest.getPictures());
        return savedProduct.getId();

    }

    private void savePictures(Product product, List<String> pictureUrls) {
        if (pictureUrls == null || pictureUrls.isEmpty())
            return;
        List<Picture> pictures = pictureUrls.stream().map(url -> new Picture(product, url)).collect(Collectors.toList());
        pictures.get(0).setFeatured(true);
        pictureRepository.saveAll(pictures);
    }

}
