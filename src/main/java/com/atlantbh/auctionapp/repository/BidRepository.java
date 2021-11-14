package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.Bid;
import com.atlantbh.auctionapp.response.BidResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.List;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    List<BidResponse> findBidByProductIdOrderByBidAmountDesc(@NotNull Long product_id);

}
