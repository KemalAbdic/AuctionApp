package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Subcategory;
import com.atlantbh.auctionapp.repository.SubcategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcategoryService {

    private final SubcategoryRepository subcategoryRepository;

    public SubcategoryService(SubcategoryRepository subcategoryRepository) {
        this.subcategoryRepository = subcategoryRepository;
    }

    public List<Subcategory> getSubcategories(){
        return subcategoryRepository.getAll();
    }
}
