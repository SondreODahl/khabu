package com.khabu.cardgame.model.game;

import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TurnTest {

    Player[] players = {new Player("player1", 1), new Player("player", 2)};
    private Turn turn;

    @BeforeEach
    void setUp() {
        turn = new Turn(players);
    }

    @Test
    void testNextTurnLoop() {
        turn.setCurrentPlayer(players[0]);
        turn.nextPlayer();
        Player currentPlayer = turn.getCurrentPlayer();
        assertEquals(players[1], currentPlayer);
        turn.nextPlayer();
        currentPlayer = turn.getCurrentPlayer();
        assertEquals(players[0], currentPlayer);
    }

    @Test
    void testSetPlayerToOneNotInGame() {
        try {
            turn.setCurrentPlayer(new Player("rwrwe", 2));
            fail();
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Test
    void testGetCurrentPlayer() {
        turn.setCurrentPlayer(players[1]);
        assertEquals(players[1], turn.getCurrentPlayer());
    }

    @Test
    void testSettingKhabuPlayerTwice() {
        turn.setKhabuPlayer(players[0]);
        try {
            turn.setKhabuPlayer(players[0]);
            fail();
        } catch (IllegalMoveException ignored) {
        }
    }

    @Test
    void testCurrentPuttingPlayerResetOnNextTurn() {
        turn.setCurrentPuttingPlayer(players[0]);
        assertEquals(players[0], turn.getCurrentPuttingPlayer());
        turn.nextPlayer();
        assertNull(turn.getCurrentPuttingPlayer());
    }
}