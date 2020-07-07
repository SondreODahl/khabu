package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardHandTest {

    @BeforeEach
    public void setUp() {
        CardHand cardHand = new CardHand();
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(12, 'S');
        Card cardThree = new Card(7, 'C');
        Card cardFour = new Card(2, 'H');
    }

    @AfterEach
    public void tearDown() {
        cardHand.getCards().clear();
    }

    @Test
    public void addCardToHand() {
        cardHand.addCard(cardOne);
        assertEquals(cardOne, cardHand.getCard(1));
    }

    @Test
    public void removeCardFromHand() {
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        assertEquals(2, cardHand.getCards().size());
        cardHand.removeCard(1);
        assertEquals(1, cardHand.getCards().size());
    }

    @Test
    public void getCardFromHand() {
        cardHand.addCard(cardOne);
        assertEquals(cardOne, cardHand.get(1));
    }
}