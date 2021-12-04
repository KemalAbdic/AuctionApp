package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Subcategory;
import com.atlantbh.auctionapp.response.BasicSubcategoryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {

    @Query(value = "SELECT sc.id, sc.name, c.id AS categoryId, c.name AS categoryName " +
            "FROM subcategory sc INNER JOIN category c ON c.id = sc.category_id " +
            "LEFT OUTER JOIN product p ON sc.id = p.subcategory_id ", nativeQuery = true)
    List<BasicSubcategoryResponse> getAll();

    @Query(value = "SELECT * FROM subcategory INNER JOIN category c ON c.id = subcategory.category_id", nativeQuery = true)
    List<Subcategory> getAllSubcategories();
}
