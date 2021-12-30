package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.response.BasicProductResponse;
import com.atlantbh.auctionapp.response.CategoryListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where p.id = :id")
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
            "pr.auction_end AS auctionEnd, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now()",
            countQuery = "SELECT count(*) FROM Product",
            nativeQuery = true)
    Page<BasicProductResponse> findAllProducts(Pageable pageable);

    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, pr.auction_start as auctionStart, " +
            "pr.auction_end AS auctionEnd, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE " +
            "AND (case WHEN :min_price <= 0 THEN TRUE ELSE starting_price >= :min_price end) " +
            "AND (case WHEN :max_price >= 999999 THEN TRUE ELSE starting_price <= :max_price end) " +
            "AND auction_start <= now() AND auction_end > now()",
            countQuery = "SELECT count(*) FROM Product",
            nativeQuery = true)
    Page<BasicProductResponse> findAllProductsAndFilterByPrice(@Param("min_price") Double minPrice, @Param("max_price") Double maxPrice, Pageable pageable);


    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, pr.auction_start as auctionStart, " +
            "pr.auction_end AS auctionEnd, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE LOWER(c.name) = :query AND p.featured = TRUE AND auction_start <= now() AND auction_end > now()",
            nativeQuery = true)
    Page<BasicProductResponse> findProductsByCategoryName(@Param("query") String query, Pageable pageable);

    @Query(value = "SELECT pr.id, pr.name, pr.starting_price AS startingPrice, pr.description, pr.auction_start as auctionStart, " +
            "pr.auction_end AS auctionEnd, p.url AS url, c.name AS categoryName, s.name AS subcategoryName " +
            "FROM product pr " +
            "INNER JOIN picture p ON pr.id = p.product_id " +
            "INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "INNER JOIN category c ON c.id = s.category_id " +
            "WHERE LOWER(c.name) = :query " +
            "AND (case WHEN :subcategory = '' THEN TRUE ELSE lower(s.name) = :subcategory end) " +
            "AND (case WHEN :min_price <= 0 THEN TRUE ELSE starting_price >= :min_price end) " +
            "AND (case WHEN :max_price >= 999999 THEN TRUE ELSE starting_price <= :max_price end) " +
            "AND p.featured = TRUE AND auction_start <= now() AND auction_end > now()",
            nativeQuery = true)
    Page<BasicProductResponse> findProductsByCategoryAndSubcategory(@Param("query") String query, @Param("subcategory") String subcategory, @Param("min_price") Double minPrice, @Param("max_price") Double maxPrice, Pageable pageable);

    @Query(value = "SELECT c.name AS categoryName, s.name AS subcategoryName, count(s.name) " +
            "FROM product pr INNER JOIN picture p ON pr.id = p.product_id " +
            "                INNER JOIN subcategory s ON s.id = pr.subcategory_id " +
            "                INNER JOIN category c ON c.id = s.category_id " +
            "WHERE p.featured = TRUE AND auction_start <= now() AND auction_end > now() " +
            "GROUP BY (c.name, s.name) " +
            "ORDER BY (c.name, s.name)",
            nativeQuery = true)
    List<CategoryListResponse> findProductsByCategoryAndSubcategoryCount();

}
