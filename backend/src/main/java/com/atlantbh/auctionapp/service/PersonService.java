package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Card;
import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.repository.CardRepository;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.request.CardRequest;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.PersonUpdateRequest;
import com.atlantbh.auctionapp.request.RegistrationRequest;
import com.atlantbh.auctionapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ValidationException;
import java.util.Optional;

@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final PasswordEncoder encoder;
    private final CardRepository cardRepository;

    @Autowired
    public PersonService(PersonRepository personRepository, PasswordEncoder encoder, CardRepository cardRepository) {
        this.personRepository = personRepository;
        this.encoder = encoder;
        this.cardRepository = cardRepository;
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

    public Person update(PersonUpdateRequest personUpdateRequest) {
        Long personId = JwtUtils.getRequestPersonId();
        Person person = personRepository.getById(personId);
        person.setFirstName(personUpdateRequest.getFirstName());
        person.setLastName(personUpdateRequest.getLastName());
        person.setEmail(personUpdateRequest.getEmail());
        person.setGender(personUpdateRequest.getGender());
        person.setBirthDate(personUpdateRequest.getBirthDate());
        person.setPhoneNumber(personUpdateRequest.getPhoneNumber());
        if (personUpdateRequest.getPictureUrl() != null) {
            person.setPictureUrl(personUpdateRequest.getPictureUrl());
        }
        person.setStreet(personUpdateRequest.getStreet());
        person.setCity(personUpdateRequest.getCity());
        person.setCountry(personUpdateRequest.getCountry());
        person.setState(personUpdateRequest.getState());
        person.setZipCode(personUpdateRequest.getZipCode());

        if (personUpdateRequest.getCardRequest() != null) {
            Card card = cardRepository.findByPersonId(personId).orElse(new Card(person));
            String maskedCardNumber = card.getCardNumber();
            if (maskedCardNumber != null && maskedCardNumber.equals(personUpdateRequest.getCardRequest().getCardNumber()))
                personUpdateRequest.getCardRequest().setCardNumber(card.getCardNumber());
            else if (!personUpdateRequest.getCardRequest().getCardNumber().matches("^(\\d*)$"))
                throw new RuntimeException("Card number can only contain digits");

            card.setCardNumber(personUpdateRequest.getCardRequest().getCardNumber());
            card.setCardName(personUpdateRequest.getCardRequest().getCardName());
            card.setExpirationMonth(personUpdateRequest.getCardRequest().getExpirationMonth());
            card.setExpirationYear(personUpdateRequest.getCardRequest().getExpirationYear());
            card.setCvcNumber(personUpdateRequest.getCardRequest().getCvcNumber());
            cardRepository.save(card);
        }

        return personRepository.save(person);
    }

}
