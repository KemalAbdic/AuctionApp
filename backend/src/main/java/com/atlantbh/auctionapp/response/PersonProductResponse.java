package com.atlantbh.auctionapp.response;

import java.time.LocalDateTime;

public interface PersonProductResponse {
    Long getId();

    String getName();

    String getUrl();

    Double getStartingPrice();

    String getCategoryName();

    String getSubcategoryName();

    LocalDateTime getAuctionStart();

    LocalDateTime getAuctionEnd();

    Integer getBidCount();

    Double getMaxBid();
}
