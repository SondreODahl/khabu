package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardHandTest {

    @Test
    public void addCardToHand() {
        CardHand cardHand = new CardHand();
        Card cardOne = new Card(11, 'D');
        cardHand.addCard(cardOne);
        assertEquals(cardOne, cardHand.getCard(1));
    }

    @Test
    public void removeCardFromHand() {
        CardHand cardHand = new CardHand();
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(11, 'D');
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        assertEquals(2, cardHand.getCards().size());
        cardHand.removeCard(1);
        assertEquals(1, cardHand.getCards().size());
    }

    @Test
    public void getCardFromHand() {
        CardHand cardHand = new CardHand();
        Card cardOne = new Card(11, 'D');
        cardHand.addCard(cardOne);
        assertEquals(cardOne, cardHand.getCard(1));
    }

    @Test
    public void addCardToSmallestAvailableKeyAfterRemovingCard() {
        CardHand cardHand = new CardHand();
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(7, 'H');
        Card cardThree = new Card(3, 'S');
        Card cardFour = new Card( 13, 'D');
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        cardHand.addCard(cardThree);
        cardHand.removeCard(2);
        cardHand.addCard(cardFour);

        assertEquals(cardFour, cardHand.getCard(2));
    }
}