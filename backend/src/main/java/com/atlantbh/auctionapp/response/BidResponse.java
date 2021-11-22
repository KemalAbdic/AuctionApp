package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.model.Product;

import java.time.LocalDateTime;

public interface BidResponse {
     Long getId();
     Double getBidAmount();
     LocalDateTime getBidTime();
     Person getPerson();
     Product getProduct();
}
