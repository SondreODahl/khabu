package com.khabu.cardgame.model.game;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CardTest {
    @Test
    public void getFace() {
        Card card = new Card(10, 'S');
        assertEquals("S", card.getFace());
    }

    @Test
    public void getValue() {
        Card card = new Card(12, 'H');
        assertEquals(12, card.getValue());
    }

    @Test
    public void createInvalidCardValueThrowsException() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> new Card(13, 'H'),
                "Expected card value to be rejected, but it wasn't"
        );

        assertEquals("Invalid card value", thrown.getMessage());
    }

    @Test
    public void createInvalidCardFaceThrowsException() {
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class,
                () -> new Card(11, 'A'),
                "Expected card face to be rejected, but it wasn't"
        );

        assertEquals("Invalid face value", thrown.getMessage());
    }
}