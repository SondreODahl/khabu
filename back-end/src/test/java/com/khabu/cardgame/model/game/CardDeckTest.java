package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CardDeckTest {

    private final int CARD_SIZE = 52;
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
        assertTrue(deck.drawCard() instanceof Card);
        List<Card> cards = deck.getCards();
        assertFalse(cards.contains(firstCard));
    }

    @Test
    public void testDrawCardEmptyDeck() {
        for (int i = 0; i < CARD_SIZE; i++) {
            Card card = deck.drawCard();
            discardPile.put(card);
        }
        deck.drawCard(); // Deck is empty. Attempts draw.
        assertEquals(CARD_SIZE, deck.getSize()); // Discard pile should be shuffled back in to deck
    }

    @Test
    public void testShowCard() {
        Card shownCard = deck.showCard();
        assertNotNull(shownCard);
        assertEquals(shownCard, deck.drawCard());
    }

    @Test
    public void testConstructor() {
        assertEquals(CARD_SIZE, deck.getCards().size());
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
    }
}