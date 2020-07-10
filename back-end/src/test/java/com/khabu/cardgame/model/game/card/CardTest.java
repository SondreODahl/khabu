package com.khabu.cardgame.model.game.card;

import com.khabu.cardgame.model.game.card.Card;
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
        Card card = new Card(12, 'H');
        assertEquals(12, card.getValue());
    }

    @Test
    void testIsSameValue() {
        Card card1 = new Card(12, 'H');
        Card card2 = new Card(12, 'C');
        assertTrue(card1.isSameValue(card2));
        card2 = new Card(11, 'H');
        assertFalse(card1.isSameValue(card2));
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