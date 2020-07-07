package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiscardPileTest {

    private DiscardPile discardPile;

    @BeforeEach
    void setUp() {
        discardPile = new DiscardPile();
    }

    @Test
    void testConstructor() {
        assertEquals(0, discardPile.getSize());
    }

    @Test
    void testAddCard() {
        Card card = new Card(1, 'H');
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
        }
        catch (IllegalMoveException e) {
        }
    }
}