package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.request.RegistrationRequest;
import com.atlantbh.auctionapp.response.RegistrationResponse;
import com.atlantbh.auctionapp.security.JwtUtils;
import com.atlantbh.auctionapp.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class PersonController {
    private final PersonService personService;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(@RequestBody @Valid RegistrationRequest registerRequest) {
        Person person = personService.register(registerRequest);
        return ResponseEntity.ok(new RegistrationResponse(person, JwtUtils.generateJwtToken(person)));
    }
}
