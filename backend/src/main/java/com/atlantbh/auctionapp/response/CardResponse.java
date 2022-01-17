package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.Card;

public class CardResponse {

    private String cardName;
    private String cardNumber;
    private Integer expirationYear;
    private Integer expirationMonth;
    private Integer cvcNumber;

    public CardResponse(Card card) {
       this.cardName = card.getCardName();
       this.cardNumber = card.getCardNumber();
       this.expirationYear = card.getExpirationYear();
       this.expirationMonth = card.getExpirationMonth();
       this.cvcNumber = card.getCvcNumber();

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
