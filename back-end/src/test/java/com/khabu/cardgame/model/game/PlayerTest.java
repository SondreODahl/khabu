package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.card.Card;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlayerTest {

    Player player;
    Card testCard;

    @BeforeEach
    void setUp() {
        this.player = new Player("PlayerName", 1, "randomuuid");
        testCard = new Card(1, 'H');
    }

    @Test
    void isReady() {
        assertFalse(player.isReady());
        player.setReady(true);
        assertTrue(player.isReady());
    }

    @Test
    void addCard() {
        assertFalse(player.hasCard(testCard));
        player.addCard(testCard);
        assertTrue(player.hasCard(testCard));
    }

    @Test
    void removeCard() {
        player.addCard(testCard);
        player.removeCard(1);
        assertFalse(player.hasCard(testCard));
        try {
            player.removeCard(0);
            fail();
        }
        catch (IllegalArgumentException ignored) {}
    }

    @Test
    void hasCard() {
        assertFalse(player.hasCard(testCard));
        player.getCardHand().addCard(testCard);
        assertTrue(player.hasCard(testCard));
    }

    @Test
    void calculateScore() {
        player.addCard(testCard);
        Card testCard2 = new Card(12, 'H');
        player.addCard(testCard2);
        int score = player.calculateScore();
        int totalCardValue = player.getCardHand().calculateHandScore();
        assertEquals(totalCardValue, score);
    }

    @Test
    void addCardToSpecificIndex() {
        player.addCardToSpecificIndex(testCard, 3);
        assertEquals(testCard, player.getCard(3));
    }
}