package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id")
    @NotNull
    private Person person;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    @NotNull
    private Product product;

    @NotNull
    private Double bidAmount;

    @NotNull
    private LocalDateTime bidTime;

    public Bid() {
    }

    public Bid(Person person, Product product, Double bidAmount, LocalDateTime bidTime) {
        this.person = person;
        this.product = product;
        this.bidAmount = bidAmount;
        this.bidTime = bidTime;
    }

    public LocalDateTime getBidTime() {
        return bidTime;
    }

    public void setBidTime(LocalDateTime bidTime) {
        this.bidTime = bidTime;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
