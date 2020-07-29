package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.action.Gamestate;

public class EffectValidator {
    public static boolean isValidEffectUseInCurrentState(Player attemptingPlayer, Player targetPlayer, Effect effect, Turn turn) {
        switch (effect) {
            case EXCHANGE_CARDS:
                return isValidEffectOnOpponent(attemptingPlayer, targetPlayer, effect, turn);
            case CHECK_SELF_CARD:
                return isValidEffectOnSelf(attemptingPlayer, targetPlayer, effect, turn);
            case CHECK_OTHER_CARD:
                return isValidEffectOnOpponent(attemptingPlayer, targetPlayer, effect, turn);
            case CHECK_TWO_CARDS:
                return isValidEffectOnOpponent(attemptingPlayer, targetPlayer, effect, turn);
            default: return false;
        }
    }

    private static boolean isValidEffectOnSelf(Player attemptingPlayer, Player targetPlayer, Effect effect, Turn turn) {
        return attemptingPlayer.equals(targetPlayer) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isValidEffectOnOpponent(Player attemptingPlayer, Player targetPlayer, Effect effect, Turn turn) {
        return (!attemptingPlayer.equals(targetPlayer)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isPlayerCurrentPlayer(Player player, Turn turn) {
        return turn.getCurrentPlayer().equals(player);
    }
}
