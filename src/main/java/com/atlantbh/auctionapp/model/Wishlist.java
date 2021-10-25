package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Wishlist {
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

    public Wishlist() {
    }

    public Wishlist(Person person, Product product) {
        this.person = person;
        this.product = product;
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
