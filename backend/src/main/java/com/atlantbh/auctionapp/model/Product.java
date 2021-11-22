package com.atlantbh.auctionapp.model;

import com.atlantbh.auctionapp.enumeration.Color;
import com.atlantbh.auctionapp.enumeration.Size;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id")
    @NotNull
    private Person person;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subcategory_id")
    @NotNull
    private Subcategory subcategory;

    @NotNull
    private String name;

    private String description;

    @NotNull
    private Double startingPrice;

    @NotNull
    private LocalDateTime auctionStart;

    @NotNull
    private LocalDateTime auctionEnd;

    @Enumerated(EnumType.STRING)
    private Size size;

    @Enumerated(EnumType.STRING)
    private Color color;

    @NotNull
    private Boolean shipping = false;

    @NotNull
    private String street;

    @NotNull
    private String city;

    @NotNull
    private String country;

    @NotNull
    @javax.validation.constraints.Size(max = 16)
    private String zipCode;

    @javax.validation.constraints.Size(max = 16)
    private String phoneNumber;

    public Product() {
    }

    public Product(Person person,
                   Subcategory subcategory,
                   String name,
                   String description,
                   Double startingPrice,
                   LocalDateTime auctionStart,
                   LocalDateTime auctionEnd,
                   Size size,
                   Color color,
                   Boolean shipping,
                   String street,
                   String city,
                   String country,
                   String zipCode,
                   String phoneNumber) {
        this.person = person;
        this.subcategory = subcategory;
        this.name = name;
        this.description = description;
        this.startingPrice = startingPrice;
        this.auctionStart = auctionStart;
        this.auctionEnd = auctionEnd;
        this.size = size;
        this.color = color;
        this.shipping = shipping;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Boolean getShipping() {
        return shipping;
    }

    public void setShipping(Boolean shipping) {
        this.shipping = shipping;
    }

    public Color getColor() {
        return color;
    }

    public void setColor(Color color) {
        this.color = color;
    }

    public Size getSize() {
        return size;
    }

    public void setSize(Size size) {
        this.size = size;
    }

    public LocalDateTime getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDateTime auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public LocalDateTime getAuctionStart() {
        return auctionStart;
    }

    public void setAuctionStart(LocalDateTime auctionStart) {
        this.auctionStart = auctionStart;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
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
