package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.action.Gamestate;

public class EffectValidator {
    public static boolean isValidEffectUseInCurrentState(Player attemptingPlayer, Player targetOne, Player targetTwo, Effect effect, Turn turn) {
        switch (effect) {
            case EXCHANGE_CARDS:
                return isValidExchange(attemptingPlayer, targetOne, targetTwo, effect, turn);
            case CHECK_SELF_CARD:
                return isValidEffectOnSelf(attemptingPlayer, targetOne, effect, turn);
            case CHECK_OTHER_CARD:
                return isValidCheckEffectOnOpponent(attemptingPlayer, targetOne, effect, turn);
            case CHECK_TWO_CARDS:
                return isValidCheckOnTwoPlayers(attemptingPlayer, targetOne, targetTwo, effect, turn);
            case EXCHANGE_AFTER_CHECKS:
                return isValidExchangeAfterCheck(attemptingPlayer, targetOne, targetTwo, effect, turn);
            default: return false;
        }
    }

    private static boolean isValidEffectOnSelf(Player attemptingPlayer, Player targetPlayer, Effect effect, Turn turn) {
        return attemptingPlayer.equals(targetPlayer) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isValidCheckEffectOnOpponent(Player attemptingPlayer, Player targetPlayer, Effect effect, Turn turn) {
        return (!attemptingPlayer.equals(targetPlayer)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isValidExchange(Player attemptingPlayer, Player targetOne, Player targetTwo, Effect effect, Turn turn) {
        return isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                (!targetOne.equals(targetTwo)) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isValidCheckOnTwoPlayers(Player attemptingPlayer, Player targetOne, Player targetTwo, Effect effect, Turn turn) {
        return isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                (!targetOne.equals(targetTwo)) &&
                turn.gameStateEquals(Gamestate.DISCARD);
    }

    private static boolean isValidExchangeAfterCheck(Player attemptingPlayer, Player targetOne, Player targetTwo, Effect effect, Turn turn) {
        return isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                (!(attemptingPlayer.equals(targetOne) && attemptingPlayer.equals(targetTwo))) &&
                turn.gameStateEquals(Gamestate.KING_EFFECT);
    }

    private static boolean isPlayerCurrentPlayer(Player player, Turn turn) {
        return turn.getCurrentPlayer().equals(player);
    }
}
