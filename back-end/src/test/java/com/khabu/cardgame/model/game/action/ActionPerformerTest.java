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

    // -----------------PUTS---------------------

    @Test
    void testPutSelfCorrectStateUpdate() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putSelf(player1, 1);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherNotYourTurn() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putOther(player2, player1, 0);
        assertEquals(Gamestate.PUT_OTHER_TRANSFER, turn.getGameState());
        assertEquals(player2, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherCardCorrectTopCard() {
        setupState(Gamestate.FRENZY, player1);
        Card player2Card = new Card(1, 'H');
        player2.addCard(player2Card);
        actionPerformer.putOther(player1, player2, 0);
        assertEquals(player2Card, discardPile.showTopCard());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherNonExistentCard() {
        Gamestate initialState = Gamestate.FRENZY;
        setupState(initialState, player1);
        try{
            actionPerformer.putOther(player1, player2, 0);
            fail();
        } catch (IllegalArgumentException ignored) {} // Player 2 doesn't have any cards
        assertEquals(initialState, turn.getGameState());
    }

    @Test
    void testPutOtherFailedCardValue() {
        Gamestate initialState = Gamestate.FRENZY;
        setupState(initialState, player1);
        Card player2Card = new Card(2, 'H');
        player2.addCard(player2Card);
        try {
            actionPerformer.putOther(player1, player2, 0);
            fail();
        } catch (IllegalMoveException ignored) {} // TODO: Replace with another exception
        assertEquals(initialState, turn.getGameState());
        assertNull(turn.getCurrentPuttingPlayer());
    }

    @Test
    void testCannotPutOnKhabuPlayer() {
        setupState(Gamestate.FIRST_TURN, player1);
        actionPerformer.callKhabu(player1);
        try {
            actionPerformer.putOther(player2, player1, 0);
            fail();
        } catch (IllegalMoveException ignored) {}
        try {
            actionPerformer.putSelf(player1, 0);
            fail();
        } catch (IllegalMoveException ignored) {}
    }

    // ---------------TRANSFER------------------

    @Test
    void checkCorrectStateUpdateOnTransfer() {
        setupState(Gamestate.PUT_OTHER_TRANSFER, player1);
        actionPerformer.transferCard(player1, player2, 0);
        assertEquals(Gamestate.PUT, turn.getGameState());
    }

    @Test
    void checkCorrectCardIsSentOnTransfer() {
        setupState(Gamestate.PUT_OTHER_TRANSFER, player1);
        Card transferCard = player1.getCard(0);
        actionPerformer.transferCard(player1, player2, 0);
        assertFalse(player1.hasCard(transferCard));
        assertEquals(transferCard, player2.getCard(0));
    }

    @Test
    void testCannotTransferToYourself() {
        setupState(Gamestate.PUT_OTHER_TRANSFER, player1);
        try {
            actionPerformer.transferCard(player1, player1, 0);
            fail();
        }
        catch (IllegalMoveException ignored) {}
    }

    // -----------------DRAW---------------------

    @Test
    void testStateChangeOnDrawFromDeck(){
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDeck(player1);
        assertEquals(Gamestate.CARD_DRAWN, turn.getGameState());
    }

    @Test
    void testCorrectCardReceivedOnDrawFromDeck() {
        setupState(Gamestate.DRAW, player1);
        int initialDeckSize = cardDeck.getSize();
        Card topCard = cardDeck.getCards().get(cardDeck.getSize()-1);
        Card drawnCard = actionPerformer.drawFromDeck(player1);
        assertEquals(topCard, drawnCard);
        assertEquals(initialDeckSize-1, cardDeck.getSize());
        assertTrue(player1.hasCard(drawnCard));
    }

    @Test
    void testStateChangeOnDrawFromDisc() {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDisc(player1);
        assertEquals(Gamestate.CARD_DRAWN, turn.getGameState()); // TODO: Reevaluate state
    }

    @Test
    void testCorrectCardReceivedOnDrawFromDisc() {
        setupState(Gamestate.DRAW, player1);
        Card topCard = discardPile.showTopCard();
        Card cardDrawn = actionPerformer.drawFromDisc(player1);
        assertEquals(topCard, cardDrawn);
        assertTrue(player1.hasCard(topCard));
        assertEquals(0, discardPile.getSize());
    }

    @Test
    void testDrawFromDiscEmpty() {
        setupState(Gamestate.DRAW, player1);
        discardPile.draw(); // Now the pile should be empty
        Card drawnCard = actionPerformer.drawFromDisc(player1);
        assertNull(drawnCard);
        assertEquals(Gamestate.DRAW, turn.getGameState());
    }

    // -----------------SWAP---------------------

    @Test
    void testStateChangeOnSwap() {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.swapDrawnCard(player1, 0);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void testCardsCorrectlyChangedOnSwap() {
        setupState(Gamestate.DRAW, player1);
        Card prevTopCard = discardPile.showTopCard();
        Card cardDrawn = actionPerformer.drawFromDeck(player1);
        actionPerformer.swapDrawnCard(player1, 0);
        assertEquals(cardDrawn, discardPile.showTopCard());
        assertEquals(prevTopCard, player1.getCard(0));
    }

    // -----------------DISCARD---------------------

    @Test
    void testDiscardStateChange() {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.discardCard(player1);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void testCardDiscardedIsTheOneDrawn() {
        setupState(Gamestate.DRAW, player1);
        Card drawnCard = actionPerformer.drawFromDeck(player1);
        actionPerformer.discardCard(player1);
        assertEquals(drawnCard, discardPile.showTopCard());
    }

    // -----------------KHABU----------------------------

    @Test
    void testTurnAndStateChangeOnKhabu() {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.callKhabu(player1);
        assertEquals(player2, turn.getCurrentPlayer());
        assertEquals(Gamestate.DRAW, turn.getGameState());
    }

    @Test
    void testAutomaticKhabuOnEmptyHand() {
        setupState(Gamestate.FRENZY, player1);
        player1.getCardHand().removeCard(1);
        actionPerformer.putSelf(player1, 0);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
    }

    // -----------------END TURN---------------------------

    @Test
    void testEndTurnCurrentPlayerAndStateChange() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.endTurn(player1);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
    }

    @Test
    void testEndTurnEndsGameOnNextPlayerBeingKhabuPlayer() {
        setupState(Gamestate.FIRST_TURN, player1);
        actionPerformer.callKhabu(player1);
        turn.setGameState(Gamestate.FRENZY);
        actionPerformer.endTurn(player2);
        assertEquals(Gamestate.ENDED, turn.getGameState());
        // TODO: Check that Round is notified somehow?
    }

    // --------------------MISC------------------------------

    @Test
    void testInvalidActionsThrowException() {
        setupState(Gamestate.DRAW, player1);
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