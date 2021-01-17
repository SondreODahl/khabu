package com.khabu.cardgame.model.game;

import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class TurnTest {

    ArrayList<Player> players = new ArrayList<>(Arrays.asList(new Player("player1", 1, "qweasd"), new Player("player", 2, "qweasd")));
    private Turn turn;

    @BeforeEach
    void setUp() {
        turn = new Turn(players);
    }

    @Test
    void NextTurnLoop() {
        turn.setCurrentPlayer(players.get(0));
        turn.nextPlayer();
        Player currentPlayer = turn.getCurrentPlayer();
        assertEquals(players.get(1), currentPlayer);
        turn.nextPlayer();
        currentPlayer = turn.getCurrentPlayer();
        assertEquals(players.get(0), currentPlayer);
    }

    @Test
    void SetPlayerToOneNotInGame() {
        try {
            turn.setCurrentPlayer(new Player("rwrwe", 2, "asqwesaqwe"));
            fail();
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Test
    void GetCurrentPlayer() {
        turn.setCurrentPlayer(players.get(1));
        assertEquals(players.get(1), turn.getCurrentPlayer());
    }

    @Test
    void GetCurrentPuttingPlayer() {
        assertNull(turn.getCurrentPuttingPlayer());
    }

    @Test
    void SettingKhabuPlayerTwice() throws IllegalMoveException {
        turn.setKhabuPlayer(players.get(0));
        try {
            turn.setKhabuPlayer(players.get(0));
            fail();
        } catch (IllegalMoveException ignored) {
        }
    }

    @Test
    void CurrentPuttingPlayerResetOnNextTurn() {
        turn.setCurrentPuttingPlayer(players.get(0));
        assertEquals(players.get(0), turn.getCurrentPuttingPlayer());
        turn.nextPlayer();
        assertNull(turn.getCurrentPuttingPlayer());
    }
}