package com.atlantbh.auctionapp.request;

public class CardRequest {

    private String cardName;
    private String cardNumber;
    private Integer expirationYear;
    private Integer expirationMonth;
    private Integer cvcNumber;


    public CardRequest(String cardName, String cardNumber, Integer expirationYear, Integer expirationMonth, Integer cvcNumber) {
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationYear = expirationYear;
        this.expirationMonth = expirationMonth;
        this.cvcNumber = cvcNumber;
    }


    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getCvcNumber() {
        return cvcNumber;
    }

    public void setCvcNumber(Integer cvcNumber) {
        this.cvcNumber = cvcNumber;
    }
}
