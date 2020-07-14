package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class GameTest {

    private Game game;
    private Player player1;
    private Player player2;

    @BeforeEach
    void setUp() {
        player1 = new Player("1", 1);
        player2 = new Player("2", 2);
        game = new Game("My-room-id", 2);
    }

    @Test
    void testAddPlayerNull(){
        try {
            game.addPlayer(null);
        }
        catch (IllegalArgumentException ignored) {}
    }

    @Test
    void testAddPlayerWhenRoomIsFull() {
        game.addPlayer(player1);
        game.addPlayer(player2);
        try {
            game.addPlayer(new Player("3", 3));
        } catch (IllegalStateException ignored) {}
    }

    @Test
    void testBeginGameWithNotEnoughPlayers() {
        game.addPlayer(player1);
        try {game.beginGame();}
        catch (IllegalStateException ignored) {}
        game.addPlayer(player2);
        game.beginGame();
    }

    @Test
    void testGetTotalScore() {
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.beginGame();
        game.getRound().performAction(player1, Actions.CALL_KHABU);
        game.getRound().performAction(player2, Actions.DRAW_FROM_DISC);
        game.getRound().performAction(player2, Actions.DISCARD);
        for (Player player : game.getPlayers()) {
            assertEquals(0, game.getTotalScore(player));
        }

        game.getRound().performAction(player2, Actions.END_TURN);

        Map<Player, Integer> totalScores = game.getPlayerTotalScores();
        for (Player player : totalScores.keySet()) {
            assertTrue(totalScores.get(player) > 0);
        }
    }
}