package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.sql.SQLOutput;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CardDeckTest {

    private final int DECK_SIZE = 52;
    private CardDeck deck;
    private DiscardPile discardPile;

    @BeforeEach
    public void setUp() {
        discardPile = new DiscardPile();
        deck = new CardDeck(discardPile);
    }

    @Test
    public void testGetCardsEncapsulation() {
        List<Card> cards1 = deck.getCards();
        List<Card> cards2 = deck.getCards();
        assertNotSame(cards1, cards2);
    }

    @Test
    public void testDrawCard() {
        Card firstCard = deck.drawCard();
        assertNotNull(firstCard);
        List<Card> cards = deck.getCards();
        assertFalse(cards.contains(firstCard));
        assertEquals(DECK_SIZE-1, deck.getSize());
    }

    @Test
    public void testDrawCardEmptyDeck() {
        for (int i = 0; i < DECK_SIZE; i++) {
            Card card = deck.drawCard();
            discardPile.put(card);
        }
        deck.drawCard(); // Deck is empty. Attempts draw.
        assertEquals(DECK_SIZE-1, deck.getSize()); // Discard pile should be shuffled back in to deck
    }

    @Test
    public void testConstructor() {
        assertEquals(DECK_SIZE, deck.getSize());
        assertEquals(discardPile, deck.getPile()); // TODO: Reconsider getting pile
    }

    @Test
    public void testShuffleWithDiscardPile() {
        Card firstCard = deck.drawCard();
        Card secondCard = deck.drawCard();
        discardPile.put(firstCard);
        discardPile.put(secondCard);
        deck.shuffle();
        assertTrue(deck.getCards().contains(firstCard));
        assertTrue(deck.getCards().contains(secondCard));
    }

    @Test
    public void testShuffle() {
        List<Card> preShuffle = deck.getCards();
        for (int i = 0; i < 5; i++) { // To make equality highly unlikely
            deck.shuffle();
        }
        assertNotEquals(deck.getCards(), preShuffle);
        assertEquals(DECK_SIZE, deck.getSize());
    }

    @Test
    public void testInitialDeal() {
        // TODO: Implement
    }
}