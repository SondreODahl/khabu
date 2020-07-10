package com.khabu.cardgame.model.game.card;

import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.DiscardPile;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DiscardPileTest {

    private DiscardPile discardPile;
    private Card card;

    @BeforeEach
    void setUp() {
        discardPile = new DiscardPile();
        card = new Card(1, 'H');
    }

    @Test
    void testConstructor() {
        assertEquals(0, discardPile.getSize());
    }

    @Test
    void testGetSize() {
        for (int i = 0; i < 13; i++) {
            discardPile.put(new Card(i, 'H'));
        }
        assertEquals(13, discardPile.getSize());
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
        assertNull(shownCard);
        discardPile.put(new Card(1, 'H'));
        shownCard = discardPile.showTopCard();
        assertEquals(shownCard, discardPile.draw());
    }
}