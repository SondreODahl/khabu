package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.DiscardPile;
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
    final int firstCardId = 1;
    final int secondCardId = 2;


    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1);
        player2 = new Player("Player2", 1);
        Player[] players = new Player[]{player1, player2};
        turn = new Turn(players);
        discardPile = new DiscardPile();
        cardDeck = new CardDeck(discardPile);
        actionPerformer = new ActionPerformer(turn, cardDeck, discardPile, Round.DummyConstructor());
    }

    // -----------------PUTS---------------------

    @Test
    void testPutSelfCorrectStateUpdate() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putSelf(player1, firstCardId);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherNotYourTurn() {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putOther(player2, player1, firstCardId);
        assertEquals(Gamestate.PUT_OTHER_TRANSFER, turn.getGameState());
        assertEquals(player2, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherCardCorrectTopCard() {
        setupState(Gamestate.FRENZY, player1);
        Card player2Card = new Card(1, 'H');
        player2.addCard(player2Card);
        actionPerformer.putOther(player1, player2, firstCardId);
        assertEquals(player2Card, discardPile.showTopCard());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void testPutOtherNonExistentCard() {
        Gamestate initialState = Gamestate.FRENZY;
        setupState(initialState, player1);
        try{
            actionPerformer.putOther(player1, player2, firstCardId);
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
        Card card = actionPerformer.putOther(player1, player2, firstCardId);
        assertNull(card);
        assertEquals(initialState, turn.getGameState());
        assertNull(turn.getCurrentPuttingPlayer());
    }

    @Test
    void testCannotPutOnKhabuPlayer() {
        setupState(Gamestate.FIRST_TURN, player1);
        actionPerformer.callKhabu(player1);
        try {
            actionPerformer.putOther(player2, player1, firstCardId);
            fail();
        } catch (IllegalMoveException ignored) {}
        try {
            actionPerformer.putSelf(player1, firstCardId);
            fail();
        } catch (IllegalMoveException ignored) {}
    }

    // ---------------TRANSFER------------------

    @Test
    void checkCorrectStateUpdateOnTransfer() {
        setupPlayer1Transfer();
        actionPerformer.transferCard(player1, player2, firstCardId); // TODO: Update Card Index
        assertEquals(Gamestate.PUT, turn.getGameState());
    }

    @Test
    void checkCorrectCardIsSentOnTransfer() {
        setupPlayer1Transfer();
        Card transferCard = player1.getCard(firstCardId);
        actionPerformer.transferCard(player1, player2, firstCardId);
        assertFalse(player1.hasCard(transferCard));
        assertEquals(transferCard, player2.getCard(firstCardId));
    }

    @Test
    void testCannotTransferToYourself() {
        setupPlayer1Transfer();
        try {
            actionPerformer.transferCard(player1, player1, firstCardId);
            fail();
        }
        catch (IllegalMoveException ignored) {}
    }

    private void setupPlayer1Transfer() {
        setupState(Gamestate.PUT_OTHER_TRANSFER, player1);
        turn.setCurrentPuttingPlayer(player1);

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
        assertEquals(drawnCard, actionPerformer.getTemporaryCard());
    }

    @Test
    void testStateChangeOnDrawFromDisc() {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDisc(player1, firstCardId);
        assertEquals(Gamestate.FRENZY, turn.getGameState()); // TODO: Reevaluate state
    }

    @Test
    void testCorrectCardReceivedOnDrawFromDisc() {
        setupState(Gamestate.DRAW, player1);
        Card topCard = discardPile.showTopCard();
        actionPerformer.drawFromDisc(player1, firstCardId);
        assertTrue(player1.hasCard(topCard));
        assertEquals(1, discardPile.getSize());
    }

    @Test
    void testDrawFromDiscEmpty() {
        setupState(Gamestate.DRAW, player1);
        discardPile.draw(); // Now the pile should be empty
        try {actionPerformer.drawFromDisc(player1, firstCardId);}
        catch (IllegalMoveException ignored) {}
        assertEquals(Gamestate.DRAW, turn.getGameState());
    }

    // -----------------SWAP---------------------

    @Test
    void testStateChangeOnSwap() {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.swapDrawnCard(player1, firstCardId);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void testCardsCorrectlyChangedOnSwap() {
        setupState(Gamestate.DRAW, player1);
        Card toBeSwapped = player1.getCard(firstCardId);
        Card cardDrawn = actionPerformer.drawFromDeck(player1);
        actionPerformer.swapDrawnCard(player1, firstCardId);
        assertEquals(toBeSwapped, discardPile.showTopCard());
        assertEquals(cardDrawn, player1.getCard(firstCardId));
        assertNull(actionPerformer.getTemporaryCard());
    }

    // -----------------DISCARD---------------------

    @Test
    void testDiscardStateChange() {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.setTemporaryCard(new Card(1, 'C'));
        actionPerformer.discardCard(player1);
        assertEquals(Gamestate.DISCARD, turn.getGameState());
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
    void testAutomaticKhabuOnEmptyHandAfterPutSelf() {
        setupState(Gamestate.FRENZY, player1);
        player1.getCardHand().removeCard(secondCardId);
        actionPerformer.putSelf(player1, firstCardId);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
        assertEquals(player1, turn.getKhabuPlayer());
    }

    @Test
    void testAutomaticKhabuOnEmptyHandAfterTransferOther() {
        setupPlayer1Transfer();
        player1.getCardHand().removeCard(secondCardId);
        actionPerformer.transferCard(player1, player2, firstCardId);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
        assertEquals(player1, turn.getKhabuPlayer());
    }

    @Test
    void testAutomaticKhabuOnlyOnYourOwnTurn() {
        setupState(Gamestate.PUT_OTHER_TRANSFER, player2);
        turn.setCurrentPuttingPlayer(player1);
        player1.removeCard(secondCardId);
        actionPerformer.transferCard(player1, player2, firstCardId);
        assertEquals(turn.getCurrentPlayer(), player2);
        actionPerformer.endTurn(player2);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
        assertEquals(player1, turn.getKhabuPlayer());
    }

    // -----------------END TURN---------------------------

    @Test
    void testEndTurnCurrentPlayerAndStateChange() {
        setupState(Gamestate.FRENZY, player1);
        player2.addCard(new Card(1, 'H')); // So that automatic Khabu won't happen
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