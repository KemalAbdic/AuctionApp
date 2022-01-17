package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id")
    @NotNull
    private Person person;

    @NotNull
    private String cardName;

    @Size(min = 8, max = 19)
    @NotNull
    private String cardNumber;

    @NotNull
    private Integer expirationYear;

    @NotNull
    private Integer expirationMonth;


    @NotNull
    private Integer cvcNumber;

    private Boolean saved;

    public Card() {
    }

    public Card(
                String cardName,
                String cardNumber,
                Integer expirationYear,
                Integer expirationMonth,
                Integer cvcNumber) {
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationYear = expirationYear;
        this.expirationMonth = expirationMonth;
        this.cvcNumber = cvcNumber;
    }

    public Card(Person person) {
        this.person = person;
    }

    public Integer getCvcNumber() {
        return cvcNumber;
    }

    public void setCvcNumber(Integer cvcNumber) {
        this.cvcNumber = cvcNumber;
    }

    public Integer getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(Integer expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public Integer getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(Integer expirationYear) {
        this.expirationYear = expirationYear;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
