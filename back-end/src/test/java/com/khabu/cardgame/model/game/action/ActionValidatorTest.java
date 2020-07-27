package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class ActionValidatorTest {

    private Turn turn;
    private Player player;
    private Player opponent;


    @BeforeEach
    public void setup() {
        player = new Player("Sandy", 1, "James");
        opponent = new Player("Tim", 2, "asdqwe");
        Player[] players = new Player[]{player, opponent};
        turn = new Turn(players);
    }


    // TEST PUTTING ----------------------
    @Test
    public void putOwnCardInDrawingState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_SELF, turn));
    }

    @Test
    public void illegalToPutAfterOpponentHasPutOnSameTurn() {
        turn.setGameState(Gamestate.PUT);
        turn.setCurrentPuttingPlayer(opponent);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.PUT_OTHER, turn));
    }

    // TEST DRAWING --------------------------

    @Test
    public void IllegalToDrawFromDeckOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        turn.setCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void drawingFromDeckOnYourOwnTurn() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void drawingFromDiscardPileOnYourOwnTurn() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    @Test
    public void illegalToDrawFromDeckOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DECK, turn));
    }

    @Test
    public void illegalToDrawFromDiscardOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    @Test
    public void illegalToDrawFromDiscardPileOnFirstTurn() {
        turn.setGameState(Gamestate.FIRST_TURN);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DRAW_FROM_DISC, turn));
    }

    // TEST DISCARD ------------------

    @Test
    public void discardAfterDrawingCard() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    @Test
    public void illegalToDiscardBeforeDrawing() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    @Test
    public void illegalToDiscardOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        turn.setCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.DISCARD, turn));
    }

    // TEST SWAP ------------------------

    @Test
    public void swapDrawnCard() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }


    @Test
    public void illegalToSwapBeforeDrawing() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }

    @Test
    public void illegalToSwapOnOpponentTurn() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.SWAP, turn));
    }

    // TEST END-TURN --------------------

    @Test
    public void endTurnInLegalState() {
        turn.setGameState(Gamestate.DISCARD);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.END_TURN, turn));
    }

    @Test
    public void illegalToEndTurnOnOpponentTurn() {
        turn.setGameState(Gamestate.FRENZY);
        turn.setCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.END_TURN, turn));
    }

    // TEST CALL_KHABU --------------------

    @Test
    public void callKhabuAtStartOfTurn() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    @Test
    public void callKhabuAtFirstTurn() {
        turn.setGameState(Gamestate.FIRST_TURN);
        turn.setCurrentPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    @Test
    public void illegalToCallKhabuAfterSomeoneElseHasCalledIt() throws IllegalMoveException {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(opponent);
        turn.setKhabuPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(opponent, Actions.CALL_KHABU, turn));
    }

    @Test
    public void illegalToCallKhabuOutsideOfDrawState() {
        turn.setGameState(Gamestate.CARD_DRAWN);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    @Test
    public void illegalToCallKhabuOnOpponentTurn() {
        turn.setGameState(Gamestate.DRAW);
        turn.setCurrentPlayer(opponent);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.CALL_KHABU, turn));
    }

    // TEST TRANSFER -------------------

    @Test
    public void transferAfterPuttingOpponentCard() {
        turn.setGameState(Gamestate.PUT_OTHER_TRANSFER);
        turn.setCurrentPlayer(player);
        turn.setCurrentPuttingPlayer(player);

        assertTrue(ActionValidator.isValidMoveInCurrentState(player, Actions.TRANSFER, turn));
    }

    @Test
    public void illegalToTransferOutsideOfPutOtherTransferState() {
        turn.setGameState(Gamestate.PUT);
        turn.setCurrentPlayer(player);

        assertFalse(ActionValidator.isValidMoveInCurrentState(player, Actions.TRANSFER, turn));
    }
}