package com.khabu.cardgame.model.game;

import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiscardPileTest {

    private DiscardPile discardPile;
    private Card card;

    @BeforeEach
    void setUp() {
        discardPile = new DiscardPile();
        card = card = new Card(1, 'H');
    }

    @Test
    void testConstructor() {
        assertEquals(0, discardPile.getSize());
    }

    @Test
    void testPutCard() {
        discardPile.put(card);
        assertEquals(1, discardPile.getSize());
        Card drawnCard = discardPile.draw();
        assertEquals(card, drawnCard);
    }

    @Test
    void testDrawEmpty() {
        try {
            discardPile.draw();
            fail();
        } catch (IllegalStateException ignored) {
        }
    }

    @Test
    void testSwapEmpty() {
        try {
            discardPile.swap(card);
            fail();
        } catch (IllegalStateException ignored) {
        }
    }

    @Test
    void testSwapCard() {
        Card cardTwo = new Card(2, 'H');
        discardPile.put(card);
        Card swappedCard = discardPile.swap(cardTwo);
        assertEquals(card, swappedCard);
        assertEquals(1, discardPile.getSize());
        assertEquals(cardTwo, discardPile.draw());
    }

    @Test
    public void testShowCard() {
        Card shownCard = discardPile.showTopCard();
        assertNotNull(shownCard);
        assertEquals(shownCard, discardPile.draw());
    }
}