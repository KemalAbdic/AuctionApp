package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @ManyToOne(optional = false)
    @JoinColumn(name = "subcategory_id", nullable = false)
    private Subcategory subcategory;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "starting_price", nullable = false)
    private Double startingPrice;

    @Column(name = "auction_start", nullable = false)
    private LocalDate auctionStart;

    @Column(name = "auction_end", nullable = false)
    private LocalDate auctionEnd;

    // ask about enum
    @Column(name = "size")
    private String size;

    // ask about enum
    @Column(name = "color")
    private String color;

    @Column(name = "shipping", nullable = false)
    private Boolean shipping = false;

    @Column(name = "street", nullable = false)
    private String street;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name = "zip_code", nullable = false)
    @Size(max = 16)
    private String zipCode;

    @Column(name = "phone_number")
    @Size(max = 16)
    private String phoneNumber;

    public Product() {

    }

    public Product(Person person,
                   Subcategory subcategory,
                   String name,
                   String description,
                   Double startingPrice,
                   LocalDate auctionStart,
                   LocalDate auctionEnd,
                   String size,
                   String color,
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public LocalDate getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDate auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public LocalDate getAuctionStart() {
        return auctionStart;
    }

    public void setAuctionStart(LocalDate auctionStart) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}