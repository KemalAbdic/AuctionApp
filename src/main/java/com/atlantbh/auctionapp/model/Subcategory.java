package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Subcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id")
    @NotNull
    private Category category;

    @NotNull
    private String name;

    public Subcategory() {
    }

    public Subcategory(Category category, String name) {
        this.category = category;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
