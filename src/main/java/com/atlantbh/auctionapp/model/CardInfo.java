package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Table(name = "card_info")
@Entity
public class CardInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_info_id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @Column(name = "card_name", nullable = false)
    private String cardName;

    @Column(name = "card_number", nullable = false)
    @Size(min = 8, max = 19)
    private Integer cardNumber;

    @Column(name = "expiration_year", nullable = false, length = 4)
    private String expirationYear;

    @Column(name = "expiration_month", nullable = false, length = 4)
    private String expirationMonth;

    @Column(name = "cvc_number", nullable = false)
    @Size(min = 100, max = 9999)
    private Integer cvcNumber;

    public CardInfo() {
    }

    public CardInfo(Person person, String cardName, Integer cardNumber, String expirationYear, String expirationMonth, Integer cvcNumber) {
        this.person = person;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.expirationYear = expirationYear;
        this.expirationMonth = expirationMonth;
        this.cvcNumber = cvcNumber;
    }

    public Integer getCvcNumber() {
        return cvcNumber;
    }

    public void setCvcNumber(Integer cvcNumber) {
        this.cvcNumber = cvcNumber;
    }

    public String getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(String expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public String getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(String expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Integer getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(Integer cardNumber) {
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

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}