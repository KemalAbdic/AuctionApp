package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.request.RegistrationRequest;
import com.atlantbh.auctionapp.response.RegistrationResponse;
import com.atlantbh.auctionapp.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class PersonController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PersonRepository personRepository;
    PersonService personService;

    @Autowired
    PasswordEncoder encoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegistrationRequest registrationRequest) {
        Person person = personService.register(registrationRequest);
        return ResponseEntity.ok(new RegistrationResponse(person));
    }
}