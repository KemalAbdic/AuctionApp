package com.atlantbh.auctionapp.request;

public class BidRequest {
    private Double bidAmount;
    private Long productId;

    public BidRequest(Double bidAmount, Long productId) {
        this.bidAmount = bidAmount;
        this.productId = productId;
    }

    public Double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
