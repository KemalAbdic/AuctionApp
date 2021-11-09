package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findProductsById(Long id);

    Optional<Product> findProductsByName(String name);

    @Query("select p from Product p where p.id = :id and p.person.id = :person_id")
    List<Product> getProductByIdAndPerson_Id(@Param("id") Long productId, @Param("person_id") Long personId);
}
