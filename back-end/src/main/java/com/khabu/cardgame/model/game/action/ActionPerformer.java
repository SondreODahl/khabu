package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.*;

public class ActionPerformer {

    private Turn turn;

    public ActionPerformer(Turn turn, CardDeck cardDeck, DiscardPile discardPile) {
    }

    public void putSelf(Player player, int i) {
    }

    public void endTurn(Player player) {
    }

    public Card drawFromDeck(Player player) {
        return null;
    }

    public Card drawFromDisc(Player player) {
        return null;
    }

    public void callKhabu(Player player) {
    }


    public void putOther(Player player1, Player player2, int index) {
    }

    public void swapDrawnCard(Player player, int index) {
    }

    public void discardCard(Player player, int index) {}

    public void giveCardToPlayer(Player player1, Player player2) {}

    /*
    public endTurn(Player player) {
        validateStateMove(player, Actions.END_TURN);
    }

    public khabu(Player player) {
        if (turn.getKhabuPlayer() == player) {
            throw new IllegalMoveException();
        }
        turn.setKhabuPlayer(player);
        endTurn();
    }

    private boolean validateStateMove(Player player, Actions action) {
        return ActionValidator.isValidMoveInCurrentState(player, action, turn);
    }
    */

}



