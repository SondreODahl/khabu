package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardTest {
    @Test
    public void getFace() {
        Card card = new Card(10, 'S');
        assertEquals('S', card.getFace());
    }

    @Test
    public void getValue() {
        Card card = new Card(13, 'H');
        assertEquals(13, card.getValue());
    }
}