package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.model.Card;
import com.atlantbh.auctionapp.repository.CardRepository;
import com.atlantbh.auctionapp.response.CardResponse;
import com.atlantbh.auctionapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public CardResponse getCard() {
        Long personId = JwtUtils.getRequestPersonId();
        Card card = cardRepository.findByPersonId(personId).orElse(new Card());
        return new CardResponse(card);
    }

}
