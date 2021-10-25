package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "bid")
@Entity
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bid_id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "bid_amount", nullable = false)
    private Double bidAmount;

    @Column(name = "bid_time", nullable = false)
    private LocalDate bidTime;

    public Bid() {
    }

    public Bid(Person person, Product product, Double bidAmount, LocalDate bidTime) {
        this.person = person;
        this.product = product;
        this.bidAmount = bidAmount;
        this.bidTime = bidTime;
    }

    public LocalDate getBidTime() {
        return bidTime;
    }

    public void setBidTime(LocalDate bidTime) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}