package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;


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
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("John", 1);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_SELF, turn));
    }

    @Test
    public void illegalToPutAfterOpponentHasPutOnSameTurn() {
        turn.setGameState(Gamestate.PUT);
        Player player = new Player("John", 1);
        Player opponent = new Player("Sam", 2);
        turn.updateCurrentPuttingPlayer(opponent);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_OTHER, turn));
    }

    // TEST DRAWING --------------------------

    @Test
    public void IllegalToDrawFromDeckOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        Player player = new Player("John", 1);
        Player opponent = new Player("James", 2);
        turn.updateCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
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

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void illegalToDrawFromDiscardOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("Mika", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    @Test
    public void illegalToDrawFromDiscardPileOnFirstTurn() {
        turn.setGameState(Gamestate.FIRST_TURN);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    // TEST DISCARD ------------------

    @Test
    public void discardAfterDrawingCard() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    @Test
    public void illegalToDiscardBeforeDrawing() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    @Test
    public void illegalToDiscardOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        Player player = new Player("John", 1);
        Player opponent = new Player("Sam", 2);
        turn.updateCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    // TEST SWAP ------------------------

    @Test
    public void swapDrawnCard() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }


    @Test
    public void illegalToSwapBeforeDrawing() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }

    @Test
    public void illegalToSwapOnOpponentTurn() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("John", 1);
        Player opponent = new Player("Sam", 2);
        turn.updateCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }

    // TEST END-TURN --------------------

    @Test
    public void endTurnInLegalState() {
        turn.setGameState(Gamestate.DISCARD);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.END_TURN, turn));
    }

    @Test
    public void illegalToEndTurnOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        Player player = new Player("John", 1);
        Player opponent = new Player("James", 2);
        turn.updateCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.END_TURN, turn));
    }

    // TEST CALL_KHABU --------------------

    @Test
    public void callKhabuAtStartOfTurn() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    @Test
    public void illegalToCallKhabuOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    @Test
    public void illegalToCallKhabuOnOpponentTurn() {
        turn.setGameState(Gamestate.DRAW);
        Player player = new Player("John", 1);
        Player opponent = new Player("James", 2);
        turn.updateCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    // TEST TRANSFER -------------------

    @Test
    public void transferAfterPuttingOpponentCard() {
        turn.setGameState(Gamestate.PUT_OTHER_TRANSFER);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.TRANSFER, turn));
    }

    @Test
    public void illegalToTransferOutsideOfPutOtherTransferState() {
        turn.setGameState(Gamestate.PUT);
        Player player = new Player("John", 1);
        turn.updateCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.TRANSFER, turn));
    }
}