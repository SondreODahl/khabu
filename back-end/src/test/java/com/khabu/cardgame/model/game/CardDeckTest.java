package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CardDeckTest {

    private final int CARD_SIZE = 52;
    private CardDeck deck;
    private Player myPlayer;
    private DiscardPile discardPile;

    @BeforeEach
    public void setUp() {
        discardPile = new DiscardPile();
        deck = new CardDeck(discardPile);
        myPlayer = new Player("Name", 1);
    }

    @Test
    public void testDrawCard() {
        Card firstCard = deck.drawCard(myPlayer);
        assertTrue(deck.drawCard(myPlayer) instanceof Card);
        List<Card> cards = deck.getCards();
        assertFalse(cards.contains(firstCard));
    }

    @Test
    public void testConstructor() {
        assertEquals(CARD_SIZE, deck.getCards().size());
        assertEquals(discardPile, deck.getPile());
    }

    @Test
    public void testReshuffle() {

    }

}