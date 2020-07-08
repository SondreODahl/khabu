package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.*;
import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ActionPerformerTest {

    ActionPerformer actionPerformer;
    Turn turn;
    Player player1;
    Player player2;
    DiscardPile discardPile;
    CardDeck cardDeck;


    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1);
        player2 = new Player("Player2", 1);
        turn = new Turn(new Player[]{player1, player2});
        discardPile = new DiscardPile();
        cardDeck = new CardDeck(discardPile);
        actionPerformer = new ActionPerformer(turn, cardDeck, discardPile);
    }

    @Test
    void testEndTurnCurrentPlayerChange() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.endTurn(player1);
        assertEquals(Gamestate.START, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
    }

    @Test
    void testEndTurnBeforePossible() {
        setupState(Gamestate.START, player1);
        try {
            actionPerformer.endTurn(player1);
            fail();
        } catch (IllegalMoveException ignored) {}
        assertEquals(Gamestate.START, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());
    }

    @Test
    void testPutSelfCausingCorrectStateUpdate() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putSelf(player1, 1);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testInvalidCardPutSelf() {
        setupState(Gamestate.FRENZY, player1);
        try {
            actionPerformer.putSelf(player1, 2);
            fail();
        } catch (IllegalMoveException ignored) {}
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void testPutOtherCardCorrect() {
        setupState(Gamestate.FRENZY, player1);
        Card player2Card = new Card(1, 'H');
        player2.addCard(player2Card);
        actionPerformer.putOther(player1, player2, 0);
        assertEquals(player2Card, discardPile.showTopCard());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherCardIncorrect() {
        setupState(Gamestate.FRENZY, player1);
        try{
            actionPerformer.putOther(player1, player2, 0);
            fail();
        } catch (IllegalArgumentException ignored) {} // Player 2 doesn't have any cards
        Card player2Card = new Card(2, 'H');
        player2.addCard(player2Card);
        // TODO: Add Exception for legal move but incorrect value
    }

    @Test
    void testStateChangesOnDrawAndSwap() {
        setupState(Gamestate.START, player1);
        actionPerformer.drawFromDeck(player1);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());
        // TODO: SWAP-method
    }

    @Test
    void testKhabuCalls() {
        setupState(Gamestate.FIRST_TURN, player1);
        actionPerformer.callKhabu(player1);
        try {
            actionPerformer.callKhabu(player2);
        } catch (IllegalMoveException ignored) {}

    }

    @Test
    void testAutomaticKhabuAfterEmptyHand() {
        setupState(Gamestate.START, player1);
        actionPerformer.callKhabu(player1);
        assertEquals(player2, turn.getCurrentPlayer());
    }


    @Test
    void testInvalidActionsThrowException() {
        setupState(Gamestate.START, player1);
        // TODO: Implement for the actions performed. Catch Not your turn exception
    }


    void setupState(Gamestate state, Player currentPlayer) {
        turn.setGameState(state);
        turn.setCurrentPlayer(currentPlayer);
        discardPile.put(new Card(1, 'C'));
        player1.addCard(new Card(1, 'H'));
        player1.addCard(new Card(2, 'H'));
    }
}