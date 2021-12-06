package com.atlantbh.auctionapp.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public interface BasicProductResponse {
    Long getId();
    String getName();
    Double getStartingPrice();
    String getDescription();
    String getUrl();
    String getCategoryName();
    String getSubcategoryName();
    LocalDateTime getAuctionStart();
    LocalDateTime getAuctionEnd();
}
