package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.action.Gamestate;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class EffectValidatorTest {

    private Turn turn;
    private Player player;
    private Player opponent;

    @BeforeEach
    public void setup() {
        player = new Player("Sandy", 1, "James");
        opponent = new Player("Tim", 2, "asdqwe");
        ArrayList<Player> players = new ArrayList<>(Arrays.asList(player, opponent));
        turn = new Turn(players);
        turn.setGameState(Gamestate.USE_EFFECT);
        turn.setCurrentPlayer(player);
    }

    @Test
    void illegalToUseEffectOnOpponentTurn() {
        assertFalse(EffectValidator.isValidEffectUseInCurrentState(opponent, opponent, player, Effect.CHECK_TWO_CARDS, turn));
    }

    @Test
    void illegalToUseEffectInOtherStateThanDiscard() {
        turn.setGameState(Gamestate.FRENZY);
        assertFalse(EffectValidator.isValidEffectUseInCurrentState(player, player, opponent, Effect.CHECK_OTHER_CARD, turn));
    }

    @Test
    void checkingYourOwnCardOnRightEffectReturnsTrue() {
        assertTrue(EffectValidator.isValidEffectUseInCurrentState(player, player,null, Effect.CHECK_SELF_CARD, turn));
    }

    @Test
    void checkingOpponentCardOnRightEffectReturnsTrue() {
        assertTrue(EffectValidator.isValidEffectUseInCurrentState(player, opponent, null, Effect.CHECK_OTHER_CARD, turn));
    }

    @Test
    void exchangingCardsInDifferentHandsReturnsTrue() {
        assertTrue(EffectValidator.isValidEffectUseInCurrentState(player, player, opponent, Effect.EXCHANGE_CARDS, turn));
    }

    @Test
    void exchangingCardsInSameHandReturnsTrue() {
        assertTrue(EffectValidator.isValidEffectUseInCurrentState(player, player, player, Effect.EXCHANGE_CARDS, turn));
    }

    @Test
    void checkingCardsInDifferentHandsReturnsTrue() {
        assertTrue(EffectValidator.isValidEffectUseInCurrentState(player, player, opponent, Effect.CHECK_TWO_CARDS, turn));
    }

    @Test
    void checkingCardsInSameHandReturnsFalse() {
        turn.setGameState(Gamestate.KING_EFFECT);
        assertFalse(EffectValidator.isValidEffectUseInCurrentState(player, player, player, Effect.CHECK_TWO_CARDS, turn));
    }
}