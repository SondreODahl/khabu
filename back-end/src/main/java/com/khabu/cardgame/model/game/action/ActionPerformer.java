package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.*;
import com.khabu.cardgame.util.IllegalMoveException;

public class ActionPerformer {

    private final Turn turn;
    private final CardDeck cardDeck;
    private final DiscardPile discardPile;
    private Card temporaryCard;

    public ActionPerformer(Turn turn, CardDeck cardDeck, DiscardPile discardPile) {
        if (turn == null || cardDeck == null || discardPile == null)
            throw new IllegalArgumentException("Argument cannot be null");
        this.turn = turn;
        this.cardDeck = cardDeck;
        this.discardPile = discardPile;
    }

    private void validateAction(Player player, Actions action, Turn turn) {
        if (!ActionValidator.isValidMoveInCurrentState(player, action, turn)) {
            String errorMessage = String.format("Tried to perform action %s with player %s on turn %s", action.toString(), player.toString(), turn.toString());
            throw new IllegalMoveException(errorMessage);
        }
    }

    private Card putExecutor(Player player1, Player player2, int index, Actions action) throws IllegalArgumentException, IllegalMoveException {
        validateAction(player1, action, turn);
        Card card = player2.getCard(index);
        if (discardPile.showTopCard().isSameValue(card)) {
            discardPile.put(card);
            Gamestate nextState = action == Actions.PUT_OTHER ? Gamestate.PUT_OTHER_TRANSFER : Gamestate.PUT;
            turn.setGameState(nextState);
            turn.setCurrentPuttingPlayer(player1);
        }
        return null;
    }

    public Card putSelf(Player player, int index) throws IllegalArgumentException, IllegalMoveException{
        return putExecutor(player, player, index, Actions.PUT_SELF);
    }
    
    public Card putOther(Player player1, Player player2, int index) throws  IllegalArgumentException, IllegalMoveException {
        return putExecutor(player1, player2, index, Actions.PUT_OTHER);
    }

    public void endTurn(Player player) {
        validateAction(player, Actions.END_TURN, turn);
        turn.nextPlayer();
        Gamestate nextState;
        if (turn.getCurrentPlayer() == turn.getKhabuPlayer()) {
            nextState = Gamestate.ENDED;
            Round.endRound(); // TODO: Replace
        } else
            nextState = Gamestate.DRAW;
        turn.setGameState(nextState);
    }

    public Card drawFromDeck(Player player) {
        return null;
    }

    public Card drawFromDisc(Player player) {
        return null;
    }

    public void callKhabu(Player player) {
    }

    public void swapDrawnCard(Player player, int index) {
    }

    public void discardCard(Player player) {
    }

    public void transferCard(Player player1, Player player2, int cardIndex) {
    }

}



