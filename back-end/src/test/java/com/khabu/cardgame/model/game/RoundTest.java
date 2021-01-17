package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.CardHand;

import com.khabu.cardgame.util.IllegalMoveException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

class RoundTest {

    private Round round;
    private Player player1;
    private Player player2;
    private final int DECK_SIZE = 52;
    private final int initialHandSize = 4;

    @BeforeEach
    void setUp() {
        player1 = new Player("Player 1", 1, "qweqasd");
        player2 = new Player("Player 2", 2, "asqweqweasd");
        ArrayList<Player> players = new ArrayList<>(Arrays.asList(player1, player2));
        round = Round.Constructor(
                new Game("abc", 1), players, initialHandSize, Game.REVEAL_TIME);
    }

    @Test
    void getters() {
        Turn turn = round.getTurn();
        assertNotNull(turn);
        CardDeck cardDeck = round.getCardDeck();
        assertEquals(DECK_SIZE, cardDeck.getSize());
        assertEquals(0, round.getPlayersReady());
        assertFalse(round.getStarted());
    }

    // TODO: FIX THIS
//    @Test
//    void DealCards() {
//        round.getPlayers().forEach(p -> assertEquals(0, p.getHandSize()));
//        beginGame();
//        round.getPlayers().forEach(p -> assertEquals(initialHandSize, p.getHandSize()));
//        int NoOfPlayers = 2;
//        assertEquals(DECK_SIZE-NoOfPlayers*initialHandSize,round.getCardDeck().getSize());
//    }

    @Test
    void ReadyStartOfRound() throws InterruptedException {
        boolean started = round.readyUp(player1);
        assertEquals(1, round.getPlayersReady());
        assertFalse(started);

        round.readyUp(player1);
        assertEquals(0, round.getPlayersReady());

        round.readyUp(player1);
        round.readyUp(player2);

        // Moved timertask to controller. So no longer necessary to test
        assertEquals(2, round.getPlayersReady());
        assertFalse(round.getStarted());
    }

    @Test
    void ReadyAfterStart() {
        beginGame();
        try {
            round.readyUp(player1);
            fail();
        }
        catch (IllegalStateException ignored) { // TODO: Replace with illegalMove?
        }
    }

    @Test
    void ReadyingUpAfterEndStartsNewRound() {
        round.endRound();
        beginGame();
        boolean started = round.getStarted();
        assertTrue(started);
    }

    @Test
    void RoundEndsOnReachingKhabuPlayer() throws IllegalMoveException {
        beginGame();
        round.performAction(player1, Actions.CALL_KHABU);
        round.performAction(player2, Actions.DRAW_FROM_DECK);
        round.performAction(player2, Actions.DISCARD);
        boolean started = round.getStarted();
        assertTrue(started);
        round.performAction(player2, Actions.END_TURN);
        started = round.getStarted();
        assertFalse(started);
    }

    @Test
    void RevealCardDuringBeginningFails() throws IllegalMoveException {
        round.readyUp(player1);
        round.readyUp(player2);
        round.beginRound();
        round.revealCard(player1, 1);
        round.revealCard(player1, 2);
        try {
            round.revealCard(player1, 3);
            fail();
        } catch (IllegalMoveException ignored) {}
    }

    @Test
    void RevealHandAfterEndRound() {
        round.endRound();
        Map<Player, CardHand> cards = round.revealHands();
        for (Player player: cards.keySet()) {
            CardHand revealedHand = cards.get(player);
            assertEquals(revealedHand, player.getCardHand());
        }
    }

    @Test
    void RevealHandsDuringGameFails() {
        beginGame();
        try {
            round.revealHands();
            fail();
        } catch (IllegalStateException ignored) {}
    }

    @Test
    void RevealHandsReturnCorrectValues() {
        Map<Player, CardHand> receivedHands = round.revealHands();
        for (Player player: receivedHands.keySet()) {
            CardHand receivedHand = receivedHands.get(player);
            assertEquals(player.getCardHand(), receivedHand);
        }
    }

    @Test
    void GetScoreBeforeAndAfterRound() throws IllegalMoveException {
        int player1Score = round.getScore(player1);
        int player2Score = round.getScore(player2);
        assertEquals(player1Score, player2Score);
        assertEquals(0, player1Score);
        beginGame();
        round.performAction(player1, Actions.CALL_KHABU);
        round.performAction(player2, Actions.DRAW_FROM_DECK);
        round.performAction(player2, Actions.DISCARD);
        round.performAction(player2, Actions.END_TURN);
        player1Score = round.getScore(player1);
        assertTrue(player1Score > 0);
        player2Score = round.getScore(player2);
        assertTrue(player2Score > 0);
    }

    @Test
    void ScoreResetsOnNewRound() throws IllegalMoveException {
        beginGame();
        round.performAction(player1, Actions.CALL_KHABU);
        round.performAction(player2, Actions.DRAW_FROM_DECK);
        round.performAction(player2, Actions.DISCARD);
        round.performAction(player2, Actions.END_TURN);
        beginGame();
        int player1Score = round.getScore(player1);
        assertEquals(0, player1Score);
    }

    private void beginGame() {
        round.readyUp(player1);
        round.readyUp(player2);
        round.beginRound();
        round.setStarted(true);
    }
}