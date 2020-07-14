package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class GameTest {

    private Game game;
    private Player player1;
    private Player player2;

    @BeforeEach
    void setUp() {
        player1 = new Player("1", 1);
        player2 = new Player("2", 2);
        game = new Game("My-room-id", 2, 10);
    }

    @Test
    void testAddPlayerNull() {
        try {
            game.addPlayer(null);
        } catch (IllegalArgumentException ignored) {
        }
    }

    @Test
    void testAddPlayerWhenRoomIsFull() {
        game.addPlayer(player1);
        game.addPlayer(player2);
        try {
            game.addPlayer(new Player("3", 3));
        } catch (IllegalStateException ignored) {
        }
    }

    @Test
    void testBeginGameWithNotEnoughPlayers() {
        game.addPlayer(player1);
        try {
            game.beginGame();
        } catch (IllegalStateException ignored) {
        }
        game.addPlayer(player2);
        game.beginGame();
    }

    @Test
    void testGetTotalScore() throws InterruptedException {
        gameSetup();
        game.getRound().performAction(player1, Actions.CALL_KHABU);
        game.getRound().performAction(player2, Actions.DRAW_FROM_DECK);
        game.getRound().performAction(player2, Actions.DISCARD);
        Player[] players = game.getPlayers();
        for (Player player : game.getPlayers()) {
            assertEquals(0, game.getTotalScore(player));
        }
        game.getRound().performAction(player2, Actions.END_TURN);
        for (Player player : players) {
            assertTrue(game.getTotalScore(player) > 0);
        }
    }

    private void gameSetup() throws InterruptedException {
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.beginGame();
        game.getRound().readyUp(player1);
        game.getRound().readyUp(player2);
        Thread.sleep(100);
    }
}