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
    void testPutSelfCausingCorrectTurnUpdate() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putSelf(player1, 1);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());
        actionPerformer.endTurn(player1);
        assertEquals(player2, turn.getCurrentPlayer());
    }

    @Test
    void testInvalidPutSelf() {
        setupState(Gamestate.FRENZY, player1);
        try {
            actionPerformer.putSelf(player1, 2);
            fail();
        } catch (IllegalMoveException ignored) {
        }
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void testStateChangesOnDrawAndSwap() {
        setupState(Gamestate.START, player1);
        actionPerformer.drawFromDeck(player1);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());

    }

    @Test
    void testKhabuCalls() {
        setupState(Gamestate.FIRST_TURN, player1);
        
    }

    @Test
    void testAutomaticKhabuAfterEmptyHand() {

    }


    @Test
    void testInvalidActionsThrowException() {
        setupState(Gamestate.START, player1);
        // TODO: Implement for the actions performed
    }


    void setupState(Gamestate state, Player currentPlayer) {
        turn.setGameState(state);
        turn.setCurrentPlayer(currentPlayer);
        discardPile.put(new Card(1, 'C'));
        player1.addCard(new Card(1, 'H'));
        player1.addCard(new Card(2, 'H'));
    }
}