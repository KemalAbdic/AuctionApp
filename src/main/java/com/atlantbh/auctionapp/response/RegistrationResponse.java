package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.Person;

public class RegistrationResponse {

    private final Person person;
    private final String token;

    public RegistrationResponse(Person person, String token) {
        this.person = person;
        this.token = token;
    }

    public Person getPerson() {
        return person;
    }

    public String getToken() {
        return token;
    }
}
