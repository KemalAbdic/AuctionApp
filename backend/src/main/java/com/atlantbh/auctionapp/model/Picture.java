package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    @NotNull
    private Product product;

    @NotNull
    private String url;

    @Column(nullable = false)
    private Boolean featured = false;

    public Picture() {
    }

    public Picture(Product product, String url) {
        this.product = product;
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }
}
