package com.atlantbh.auctionapp.response;

import java.util.List;

public class ProductPageResponse {
    private List<BasicProductResponse> products;
    private Boolean lastPage;

    public ProductPageResponse(List<BasicProductResponse> products, Boolean lastPage) {
        this.products = products;
        this.lastPage = lastPage;
    }

    public List<BasicProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<BasicProductResponse> products) {
        this.products = products;
    }

    public Boolean getLastPage() {
        return lastPage;
    }

    public void setLastPage(Boolean lastPage) {
        this.lastPage = lastPage;
    }
}
