package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Bid;
import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.model.Product;
import com.atlantbh.auctionapp.repository.BidRepository;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.repository.ProductRepository;
import com.atlantbh.auctionapp.request.BidRequest;
import com.atlantbh.auctionapp.response.BidResponse;
import com.atlantbh.auctionapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final PersonRepository personRepository;
    private final ProductRepository productRepository;

    @Autowired
    public BidService(BidRepository bidRepository, PersonRepository personRepository, ProductRepository productRepository) {
        this.bidRepository = bidRepository;
        this.personRepository = personRepository;
        this.productRepository = productRepository;
    }

    public List<BidResponse> getBid(Long id) {
        return bidRepository.findBidByProductIdOrderByBidAmountDesc(id);
    }

    public void add(BidRequest bidRequest) {
        Product product = productRepository.findProductById(bidRequest.getProductId());
        Person person = personRepository.findPersonById(JwtUtils.getRequestPersonId());
        if (person.getId().equals(product.getPerson().getId()))
            throw new IllegalArgumentException("You can't bid on your own product");
        if (product.getAuctionStart().isAfter(LocalDateTime.now(ZoneId.of("UTC"))))
            throw new IllegalArgumentException("Auction for this product did not start yet");
        if (product.getAuctionEnd().isBefore(LocalDateTime.now(ZoneId.of("UTC"))))
            throw new IllegalArgumentException("Auction for this product has ended");


        bidRepository.save(new Bid(person, product, bidRequest.getBidAmount(), LocalDateTime.now(ZoneId.of("UTC"))));
    }
}
