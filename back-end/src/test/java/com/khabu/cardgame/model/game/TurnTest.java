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
    public void putOtherCardInDrawingState() {

    }
}