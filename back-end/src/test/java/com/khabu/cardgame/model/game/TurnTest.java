package com.khabu.cardgame.model.game;

import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class TurnTest {

    @Test
    public void putOwnCardInDrawingState() {
        Turn turn = new Turn();
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);

        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> turn.isValidMoveInCurrentState(player, Actions.PUT_SELF),
                "Expected action to be rejected, but it wasn't"
        );

        assertEquals("You can't put before someone draws", thrown.getMessage());
    }

    @Test
    public void putAfterOpponentHasPutOnSameTurn() {
        Turn turn = new Turn();
        turn.setGameState(Gamestate.PUT);
        Player player = new Player("John", 1);
        Player opponent = new Player("Sam", 2);
        turn.updateCurrentPuttingPlayer(opponent);
        turn.updateCurrentPlayer(player);

        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> turn.isValidMoveInCurrentState(player, Actions.PUT_OTHER),
                "Expected action to be rejected, but it wasn't"
        );

        assertEquals("You can't put on the same turn as someone else has already done it",
                thrown.getMessage());
    }

    @Test
    public void drawOnOpponentTurn() {
        Turn turn = new Turn();
        turn.setGameState(Gamestate.FRENZY);
        Player currentPlayer = new Player("John", 1);
        Player illegalMovePlayer = new Player("James", 2);
        turn.updateCurrentPlayer(currentPlayer);

        IllegalMoveException thrown = assertThrows(IllegalMoveException.class,
                () -> turn.isValidMoveInCurrentState(illegalMovePlayer, Actions.DRAW),
                "Expected action to be rejected, but it wasn't"
        );

        assertEquals("You can't put before someone draws", thrown.getMessage());
    }

    @Test
    public void drawingOnYourOwnTurn() {
        Turn turn = new Turn();
        turn.setGameState(Gamestate.DRAW);
        Player currentPlayer = new Player("John", 1);
        turn.updateCurrentPlayer(currentPlayer);

        assertTrue(turn.isValidMoveInCurrentState(currentPlayer, Actions.DRAW));
    }

    @Test
    public void discardAfterDrawingCard() {
        Turn turn = new Turn();
        turn.setGameState(Gamestate.DRAW);
        Player currentPlayer = new Player("John", 1);
        turn.updateCurrentPlayer(currentPlayer);

        assertTrue(turn.isValidMoveInCurrentState(currentPlayer, Actions.DISCARD));
    }
}