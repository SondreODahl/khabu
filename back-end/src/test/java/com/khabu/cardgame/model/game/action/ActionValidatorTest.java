package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.swing.*;

import static org.junit.jupiter.api.Assertions.*;

class ActionValidatorTest {
    private Turn turn;

    @BeforeAll
    public void setup() {
        turn = new Turn();
    }


    // TEST PUTTING ----------------------
    @Test
    public void putOwnCardInDrawingState() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_SELF, turn));
    }

    @Test
    public void illegalToPutAfterOpponentHasPutOnSameTurn() {
        turn.setGameState(Gamestate.PUT);
        Player player = new Player("John", 1);
        Player opponent = new Player("Sam", 2);
        turn.updateCurrentPuttingPlayer(opponent);
        turn.updateCurrentPlayer(player);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_SELF, turn));
    }

    // TEST DRAWING --------------------------

    @Test
    public void IllegalToDrawFromDeckOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        Player player = new Player("John", 1);
        Player opponent = new Player("James", 2);
        turn.updateCurrentPlayer(opponent);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void drawingFromDeckOnYourOwnTurn() {
        turn.setGameState(Gamestate.DRAW);
        Player currentPlayer = new Player("John", 1);
        turn.updateCurrentPlayer(currentPlayer);

        assertTrue(ActionValidator.isValidMoveInCurrentState(currentPlayer, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void drawingFromDiscardPileOnYourOwnTurn() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("Jon", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    @Test
    public void illegalToDrawFromDeckOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("Mika", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void illegalToDrawFromDiscardOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("Mika", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    @Test
    public void illegalToDrawFromDiscardPileOnFirstTurn() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(!ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    // TEST DISCARD ------------------

    @Test
    public void discardAfterDrawingCard() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player currentPlayer = new Player("John", 1);
        turn.updateCurrentPlayer(currentPlayer);

        assertTrue(ActionValidator.isValidMoveInCurrentState(currentPlayer, Actions.DISCARD, turn));
    }

    @Test
    public void illegalToDiscardBeforeDrawing() {

    }


}