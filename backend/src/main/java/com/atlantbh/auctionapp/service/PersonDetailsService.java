package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Person;
import com.atlantbh.auctionapp.repository.PersonRepository;
import com.atlantbh.auctionapp.security.PersonDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class PersonDetailsService implements UserDetailsService {

    private final PersonRepository personRepository;

    public PersonDetailsService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        Person person = personRepository.findPersonByEmail(email);
        if (person == null)
            throw new UsernameNotFoundException("Email not found");
        return new PersonDetails(person);
    }
}
