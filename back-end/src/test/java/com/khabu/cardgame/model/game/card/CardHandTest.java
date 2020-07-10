package com.khabu.cardgame.model.game.card;

import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardHand;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardHandTest {
    CardHand cardHand;

    @BeforeEach
    public void setup() {
        cardHand = new CardHand();
    }

    @AfterEach
    public void teardown() {
        cardHand.getCards().clear();
    }

    @Test
    public void addCardToHand() {
        Card cardOne = new Card(11, 'D');
        cardHand.addCard(cardOne);
        assertEquals(cardOne, cardHand.getCard(1));
    }

    @Test
    public void removeCardFromHand() {
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
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(7, 'H');
        Card cardThree = new Card(3, 'S');
        Card cardFour = new Card( 12, 'D');
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        cardHand.addCard(cardThree);
        cardHand.removeCard(2);
        cardHand.addCard(cardFour);

        assertEquals(cardFour, cardHand.getCard(2));
    }

    @Test
    public void calculateHandWithoutRedKings() {
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(7, 'H');
        Card cardThree = new Card(3, 'S');
        Card cardFour = new Card( 11, 'D');
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        cardHand.addCard(cardThree);
        cardHand.addCard(cardFour);

        assertEquals(32, cardHand.calculateHandScore());
    }

    @Test
    public void calculateHandWithRedKing() {
        Card cardOne = new Card(11, 'D');
        Card cardTwo = new Card(7, 'H');
        Card cardThree = new Card(3, 'S');
        Card cardFour = new Card( 12, 'D');
        cardHand.addCard(cardOne);
        cardHand.addCard(cardTwo);
        cardHand.addCard(cardThree);
        cardHand.addCard(cardFour);

        assertEquals(20, cardHand.calculateHandScore());
    }
}