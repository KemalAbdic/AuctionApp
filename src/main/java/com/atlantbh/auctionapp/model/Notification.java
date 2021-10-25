package com.atlantbh.auctionapp.model;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "notification")
@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Lob
    @Column(name = "report", nullable = false)
    private String report;

    @Column(name = "\"time\"", nullable = false)
    private LocalDate time;

    @Column(name = "recieved", nullable = false)
    private Boolean recieved = false;

    public Notification() {
    }

    public Notification(Person person, Product product, String report, LocalDate time, Boolean recieved) {
        this.person = person;
        this.product = product;
        this.report = report;
        this.time = time;
        this.recieved = recieved;
    }

    public Boolean getRecieved() {
        return recieved;
    }

    public void setRecieved(Boolean recieved) {
        this.recieved = recieved;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public String getReport() {
        return report;
    }

    public void setReport(String report) {
        this.report = report;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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