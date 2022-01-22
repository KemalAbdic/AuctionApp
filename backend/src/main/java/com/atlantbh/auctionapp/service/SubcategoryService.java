package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Category;
import com.atlantbh.auctionapp.model.Subcategory;
import com.atlantbh.auctionapp.repository.CategoryRepository;
import com.atlantbh.auctionapp.repository.SubcategoryRepository;
import com.atlantbh.auctionapp.response.BasicSubcategoryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;
    private final CategoryRepository categoryRepository;

    public SubcategoryService(SubcategoryRepository subcategoryRepository, CategoryRepository categoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<BasicSubcategoryResponse> getSubcategories() {
        return subcategoryRepository.getAll();
    }

    public List<Subcategory> getAllSubcategories() {
        return subcategoryRepository.getAllSubcategories();
    }

    public List<BasicSubcategoryResponse> getSubcategoriesForCategory(Long id) {
        Category category = categoryRepository.getById(id);
        return subcategoryRepository.findAllByCategory(category);
    }
}
