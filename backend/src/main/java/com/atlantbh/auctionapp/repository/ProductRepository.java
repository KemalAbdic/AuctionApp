package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.response.BasicProductResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product getProductByIdAndPersonId(@Param("id") Long id, @Param("person_id") Long personId);

    Product findProductById(@Param("id") Long id);

    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now() " +
            "ORDER BY auction_start DESC " +
            "LIMIT 8",
            nativeQuery = true)
    List<BasicProductResponse> findNewProducts();

    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now() " +
            "ORDER BY auction_end " +
            "LIMIT 8",
            nativeQuery = true)
    List<BasicProductResponse> findLastProducts();


    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now()" +
            "ORDER BY RANDOM()",
            nativeQuery = true)
    List<BasicProductResponse> findRandomProducts();

    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, pr.auction_start as auctionStart, " +
            "pr.auction_end as auctionEnd, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now()" +
            "ORDER BY pr.name",
            nativeQuery = true)
    List<BasicProductResponse> findAllProducts();
}
