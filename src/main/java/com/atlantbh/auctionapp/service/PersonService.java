package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegistrationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final PasswordEncoder encoder;

    @Autowired
    public PersonService(PersonRepository personRepository, PasswordEncoder encoder) {
        this.personRepository = personRepository;
        this.encoder = encoder;
    }

    public Person register(RegistrationRequest registerRequest) {
        if (personRepository.existsByEmail(registerRequest.getEmail()))
            throw new ValidationException("Email " + registerRequest.getEmail() + " is already in use");

        Person person = new Person(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword())
        );
        personRepository.save(person);
        return person;
    }

    public Person login(LoginRequest loginRequest) {
        Person person = personRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ValidationException("Wrong email or password"));
        if (!encoder.matches(loginRequest.getPassword(), person.getPassword()))
            throw new ValidationException("Wrong password");
        return person;
    }

}
