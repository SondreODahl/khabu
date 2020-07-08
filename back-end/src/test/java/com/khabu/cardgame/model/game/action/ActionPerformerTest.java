package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Card;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ActionPerformerTest {

    ActionPerformer actionPerformer;
    Turn turn;
    Player player1;
    Player player2;

    @BeforeEach
    void setUp() {
        player1 = new Player("Player1", 1);
        player2 = new Player("Player2", 1);
        turn = new Turn(new Player[]{player1, player2});
        actionPerformer = new ActionPerformer(turn);
    }

    @Test
    void testValidPutSelf() {
        frenzySetup();
        actionPerformer.putSelf(player1, 1);
        assertEquals(Gamestate.PUT, turn.getGameState());
        assertEquals(player1, turn.getCurrentPlayer());
        actionPerformer.endTurn(player1);
        assertEquals(player2, turn.getCurrentPlayer());
    }

    @Test
    void testInvalidPutSelf() {
        frenzySetup();
        actionPerformer.putSelf(player1, );
    }

    @Test
    void testCardGetters() {

    }

    @Test
    void test

    void frenzySetup() {
        turn.setGameState(Gamestate.FRENZY);
        turn.setCurrentPlayer(player1);
        player1.addCard(new Card(1, 'H'));
    }

}