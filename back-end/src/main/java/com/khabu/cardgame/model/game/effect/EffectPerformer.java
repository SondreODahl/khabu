package com.khabu.cardgame.model.game.effect;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.card.Card;

public class EffectPerformer {
    Turn turn;
    Round round;

    public Card checkOwnCard(Player player, int index) {
        return null;
    }

    public Card checkOpponentCard(Player player, int index) {
        return null;
    }

    public void exchangeCards(Player targetOne, Player targetTwo, int targetOneIndex, int targetTwoIndex) {
    }

    public void checkAndExchangeCards(Player targetOne, Player targetTwo, int targetOneIndex, int targetTwoIndex) {

    }

    public void checkTwoCards(Player targetOne, Player targetTwo, int targetOneIndex, int targetTwoIndex) {

    }

    // TODO: Might not need this, check if it is possible to use exchangeCards()
    public void exchangeCheckedCards(Player targetOne, Player targetTwo, int targetOneIndex, int targetTwoIndex) {

    }


}
