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

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class ActionPerformerTest {

    ActionPerformer actionPerformer;
    Turn turn;
    Player player1;
    Player player2;
    DiscardPile discardPile;
    CardDeck cardDeck;
    final int firstCardId = 0;
    final int secondCardId = 1;


    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1, "asdasd");
        player2 = new Player("Player2", 1, "awqesaq");
        ArrayList<Player> players = new ArrayList<Player>(Arrays.asList(player1, player2));
        turn = new Turn(players);
        discardPile = new DiscardPile();
        cardDeck = new CardDeck(discardPile);
        actionPerformer = new ActionPerformer(turn, cardDeck, discardPile, Round.DummyConstructor());
    }

    // -----------------PUTS---------------------

    @Test
    void PutSelfCorrectStateUpdate() throws IllegalMoveException {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putSelf(player1, firstCardId);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void PutOtherNotYourTurn() throws IllegalMoveException {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.putOther(player2, player1, firstCardId);
        assertEquals(Gamestate.PUT_OTHER_TRANSFER, turn.getGameState());
        assertEquals(player2, turn.getCurrentPuttingPlayer());
    }

    @Test
    void PutOtherCardCorrectTopCard() throws IllegalMoveException {
        setupState(Gamestate.FRENZY, player1);
        Card player2Card = new Card(1, 'H');
        player2.addCard(player2Card);
        actionPerformer.putOther(player1, player2, firstCardId);
        assertEquals(player2Card, discardPile.showTopCard());
        assertEquals(player1, turn.getCurrentPuttingPlayer());
    }

    @Test
    void PutOtherNonExistentCard() throws IllegalMoveException {
        Gamestate initialState = Gamestate.FRENZY;
        setupState(initialState, player1);
        try{
            actionPerformer.putOther(player1, player2, firstCardId);
            fail();
        } catch (IllegalArgumentException ignored) {} // Player 2 doesn't have any cards
        assertEquals(initialState, turn.getGameState());
    }

    @Test
    void PutOtherFailedCardValue() throws IllegalMoveException {
        Gamestate initialState = Gamestate.FRENZY;
        setupState(initialState, player1);
        Card player2Card = new Card(2, 'H');
        player2.addCard(player2Card);
        actionPerformer.putOther(player1, player2, firstCardId);
        assertEquals(initialState, turn.getGameState());
        assertNull(turn.getCurrentPuttingPlayer());
    }

    @Test
    void WrongCardOnDiscardPileResultsInDrawingExtraCard() throws IllegalMoveException {
        setupState(Gamestate.FRENZY, player1);
        player1.addCard(new Card(2, 'H'));
        actionPerformer.putSelf(player1, 0);
        assertEquals(2, player1.getHandSize());
    }

    @Test
    void CannotPutOnKhabuPlayer() throws IllegalMoveException {
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
    void checkCorrectStateUpdateOnTransfer() throws IllegalMoveException {
        setupPlayer1Transfer();
        actionPerformer.transferCard(player1, player2, firstCardId); // TODO: Update Card Index
        assertEquals(Gamestate.PUT, turn.getGameState());
    }

    @Test
    void checkCorrectCardIsSentOnTransfer() throws IllegalMoveException {
        setupPlayer1Transfer();
        Card transferCard = player1.getCard(firstCardId);
        actionPerformer.transferCard(player1, player2, firstCardId);
        assertFalse(player1.hasCard(transferCard));
        assertEquals(transferCard, player2.getCard(firstCardId));
    }

    @Test
    void CannotTransferToYourself() {
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
    void StateChangesOnDrawFromDeck() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDeck(player1);
        assertEquals(Gamestate.CARD_DRAWN, turn.getGameState());
    }

    @Test
    void CorrectCardReceivedOnDrawFromDeck() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        int initialDeckSize = cardDeck.getSize();
        Card topCard = cardDeck.getCards().get(cardDeck.getSize()-1);
        actionPerformer.drawFromDeck(player1);
        Card drawnCard = actionPerformer.getTemporaryCard();
        assertEquals(topCard, drawnCard);
        assertEquals(initialDeckSize-1, cardDeck.getSize());
        assertEquals(drawnCard, actionPerformer.getTemporaryCard());
    }

    @Test
    void StateChangesOnDrawFromDisc() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDisc(player1, firstCardId);
        assertEquals(Gamestate.FRENZY, turn.getGameState()); // TODO: Reevaluate state
    }

    @Test
    void CorrectCardReceivedOnDrawFromDisc() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        Card topCard = discardPile.showTopCard();
        actionPerformer.drawFromDisc(player1, firstCardId);
        assertTrue(player1.hasCard(topCard));
        assertEquals(1, discardPile.getSize());
    }

    @Test
    void DrawFromDiscEmpty() {
        setupState(Gamestate.DRAW, player1);
        discardPile.draw(); // Now the pile should be empty
        try {actionPerformer.drawFromDisc(player1, firstCardId);}
        catch (IllegalMoveException ignored) {}
        assertEquals(Gamestate.DRAW, turn.getGameState());
    }

    // -----------------SWAP---------------------

    @Test
    void StateChangeOnSwap() throws IllegalMoveException {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.swapDrawnCard(player1, firstCardId);
        assertEquals(Gamestate.FRENZY, turn.getGameState());
    }

    @Test
    void CardsCorrectlyChangedOnSwap() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        Card toBeSwapped = player1.getCard(firstCardId);
        actionPerformer.drawFromDeck(player1);
        Card cardDrawn = actionPerformer.getTemporaryCard();
        actionPerformer.swapDrawnCard(player1, firstCardId);
        assertEquals(toBeSwapped, discardPile.showTopCard());
        assertEquals(cardDrawn, player1.getCard(firstCardId));
        assertNull(actionPerformer.getTemporaryCard());
    }

    // -----------------DISCARD---------------------

    @Test
    void DiscardStateChange() throws IllegalMoveException {
        setupState(Gamestate.CARD_DRAWN, player1);
        actionPerformer.setTemporaryCard(new Card(1, 'C'));
        actionPerformer.discardCard(player1);
        assertEquals(Gamestate.DISCARD, turn.getGameState());
    }

    @Test
    void CardDiscardedIsTheOneDrawn() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.drawFromDeck(player1);
        Card drawnCard = actionPerformer.getTemporaryCard();
        actionPerformer.discardCard(player1);
        assertEquals(drawnCard, discardPile.showTopCard());
    }

    // -----------------KHABU----------------------------

    @Test
    void TurnAndStateChangeOnKhabu() throws IllegalMoveException {
        setupState(Gamestate.DRAW, player1);
        actionPerformer.callKhabu(player1);
        assertEquals(player2, turn.getCurrentPlayer());
        assertEquals(Gamestate.DRAW, turn.getGameState());
    }

    // -----------------END TURN---------------------------

    @Test
    void EndTurnCurrentPlayerAndStateChange() throws IllegalMoveException {
        setupState(Gamestate.FRENZY, player1);
        actionPerformer.endTurn(player1);
        assertEquals(Gamestate.DRAW, turn.getGameState());
        assertEquals(player2, turn.getCurrentPlayer());
    }

    @Test
    void EndTurnEndsGameOnNextPlayerBeingKhabuPlayer() throws IllegalMoveException {
        setupState(Gamestate.FIRST_TURN, player1);
        actionPerformer.callKhabu(player1);
        turn.setGameState(Gamestate.FRENZY);
        actionPerformer.endTurn(player2);
        assertEquals(Gamestate.ENDED, turn.getGameState());
        // TODO: Check that Round is notified somehow?
    }

    // --------------------MISC------------------------------

    @Test
    void InvalidActionsThrowException() {
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