package com.atlantbh.auctionapp.request;

import com.atlantbh.auctionapp.model.Subcategory;

import java.time.LocalDateTime;
import java.util.List;

public class ProductRequest {
    private String name;
    private Long subcategoryId;
    private String description;
    private List<String> pictures;
    private Double startingPrice;
    private LocalDateTime auctionStart;
    private LocalDateTime auctionEnd;
    private String street;
    private String city;
    private String country;
    private String zipCode;
    private String phoneNumber;

    public ProductRequest() {
    }

    public ProductRequest(String name,
                          Long subcategoryId,
                          String description,
                          List<String> pictures,
                          Double startingPrice,
                          LocalDateTime auctionStart,
                          LocalDateTime auctionEnd,
                          String street,
                          String city,
                          String country,
                          String zipCode,
                          String phoneNumber) {
        this.name = name;
        this.subcategoryId = subcategoryId;
        this.description = description;
        this.pictures = pictures;
        this.startingPrice = startingPrice;
        this.auctionStart = auctionStart;
        this.auctionEnd = auctionEnd;
        this.street = street;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getPictures() {
        return pictures;
    }

    public void setPictures(List<String> pictures) {
        this.pictures = pictures;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public LocalDateTime getAuctionStart() {
        return auctionStart;
    }

    public void setAuctionStart(LocalDateTime auctionStart) {
        this.auctionStart = auctionStart;
    }

    public LocalDateTime getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(LocalDateTime auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
