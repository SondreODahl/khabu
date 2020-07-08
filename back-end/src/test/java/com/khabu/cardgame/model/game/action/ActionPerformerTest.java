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
        turn = new Turn();
        actionPerformer = new ActionPerformer(turn);
        player1 = new Player("Player1", 1);
        player1 = new Player("Player1", 1);
    }

    @Test
    void testValidPut() {
        turn.setGameState(Gamestate.FRENZY);
        turn.updateCurrentPlayer(player1);
        actionPerformer.put(player1, new Card(1, 'H'));

    }
}