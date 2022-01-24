package com.atlantbh.auctionapp.response;

import java.time.LocalDateTime;
import java.util.List;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Double startingPrice;
    private LocalDateTime auctionStart;
    private LocalDateTime auctionEnd;
    private List<BasicPictureResponse> pictures;
    private Long personId;

    public ProductResponse(FullProductResponse product, List<BasicPictureResponse> productPictures) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getDescription();
        this.startingPrice = product.getStartingPrice();
        this.auctionStart = product.getAuctionStart();
        this.auctionEnd = product.getAuctionEnd();
        this.pictures = productPictures;
        this.personId = product.getPersonId();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<BasicPictureResponse> getPictures() {
        return pictures;
    }

    public void setPictures(List<BasicPictureResponse> pictures) {
        this.pictures = pictures;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }
}
