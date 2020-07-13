package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardHand;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class RoundTest {

    private Round round;
    private Turn turn;
    private Player player1;
    private Player player2;

    @BeforeEach
    void setUp() {
        player1 = new Player("Player 1", 1);
        player1 = new Player("Player 2", 2);
        turn = new Turn(new Player[]{player1, player2});
        round = new Round(2) ;
    }

    @Test
    void testReadyStartOfRound() {
        boolean started = round.readyUp(player1);
        assertEquals(1, round.getPlayersReady());
        assertFalse(started);

        round.readyUp(player1);
        assertEquals(0, round.getPlayersReady());

        round.readyUp(player1);
        started = round.readyUp(player2);
        assertEquals(2, round.getPlayersReady());
        assertTrue(started);
    }

    @Test
    void testReadyAfterStart() {
        beginGame();
        try {
            round.readyUp(player1);
            fail();
        }
        catch (IllegalStateException ignored) { // TODO: Replace with illegalMove?
        }
    }

    @Test
    void testEndOfRoundKhabu() {
        beginGame();
        round.performAction(player1, Actions.CALL_KHABU);
        round.performAction(player2, Actions.DRAW_FROM_DECK);
        round.performAction(player2, Actions.DISCARD);
        boolean started = round.getStarted();
        assertTrue(started);
        round.performAction(player2, Actions.END_TURN);
        boolean ended = round.getEnded();
        assertTrue(ended);
    }

    @Test
    void testRevealHandAfterEndRound() {
        round.endRound();
        Map<Player, CardHand> cards = round.revealHands();
        for (Player player: cards.keySet()) {
            CardHand revealedHand = cards.get(player);
            assertEquals(revealedHand, player.getCardHand());
        }
    }

    @Test
    void revealHandsDuringGame() {
        beginGame();
        try {
            round.revealHands();
            fail();
        } catch (IllegalStateException ignored) {}
    }

    private void beginGame() {
        round.readyUp(player1);
        round.readyUp(player2);
    }
}