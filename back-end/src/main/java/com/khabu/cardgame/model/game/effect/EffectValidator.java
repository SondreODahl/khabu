package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;

public class EffectValidator {
    public static boolean isValidEffectUseInCurrentState(Player attemptingPlayer, Effect effect, Turn turn) {
        switch (effect) {
            case EXCHANGE_CARDS:
            case CHECK_SELF_CARD:
            case CHECK_OTHER_CARD:
            case CHECK_AND_EXCHANGE:
            default: return false;
        }
    }
}
