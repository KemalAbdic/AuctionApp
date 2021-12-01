package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Subcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubcategoryRepository extends JpaRepository<Subcategory, Long> {

    @Query (value = "select * from subcategory inner join category c on c.id = subcategory.category_id", nativeQuery = true)
    List<Subcategory> getAll();
}
