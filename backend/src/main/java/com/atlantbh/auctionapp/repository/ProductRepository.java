package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product getProductByIdAndPersonId(@Param("id") Long id, @Param("person_id") Long personId);

    Product findProductById(@Param("id") Long id);
}
