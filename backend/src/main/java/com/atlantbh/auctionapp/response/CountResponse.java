package com.atlantbh.auctionapp.response;

public class CountResponse implements Comparable<CountResponse> {
    private String name;
    private Integer count;

    public CountResponse(String name, Integer count) {
        this.name = name;
        this.count = count;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public int compareTo(CountResponse countResponse) {
        int i = countResponse.count.compareTo(count);
        return i == 0 ? name.compareTo(countResponse.name) : i;
    }
}
