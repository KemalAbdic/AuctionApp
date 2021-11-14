package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.response.BidResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;

    @Autowired
    public BidService(BidRepository bidRepository) {
        this.bidRepository = bidRepository;
    }

    public List<BidResponse> getBid(Long id) {
        return bidRepository.findBidByProductIdOrderByBidAmountDesc(id);
    }
}
