package com.atlantbh.auctionapp.controller;

import com.atlantbh.auctionapp.response.CardResponse;
import com.atlantbh.auctionapp.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cards")
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @GetMapping("/person")
    public ResponseEntity<Object> getCard() {
        CardResponse card = cardService.getCard();
        if (card.getCardName() == null)
            return ResponseEntity.ok("{}");
        else
            return ResponseEntity.ok(card);
    }
}
