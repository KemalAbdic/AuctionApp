package com.atlantbh.auctionapp.response;

import java.time.LocalDateTime;

public interface FullProductResponse {
    Long getId();

    Long getPersonId();

    String getName();

    String getDescription();

    Double getStartingPrice();

    LocalDateTime getAuctionStart();

    LocalDateTime getAuctionEnd();
}
