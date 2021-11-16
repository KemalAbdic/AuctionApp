package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.request.BidRequest;
import com.atlantbh.auctionapp.response.BidResponse;
import com.atlantbh.auctionapp.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    @Autowired
    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @GetMapping("/product")
    public ResponseEntity<List<BidResponse>> getBidsForProduct(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(bidService.getBid(id));
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewBid(@RequestBody @Validated BidRequest bidRequest) {
        bidService.add(bidRequest);
        return ResponseEntity.ok("Congratulations! You are the highest bidder!");
    }

}
