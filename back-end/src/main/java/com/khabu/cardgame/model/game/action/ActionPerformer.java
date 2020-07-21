package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.Turn;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.DiscardPile;
import com.khabu.cardgame.util.IllegalMoveException;

public class ActionPerformer {

    private final Turn turn;
    private final CardDeck cardDeck;
    private final DiscardPile discardPile;
    private final Round round;

    private Card temporaryCard;

    public ActionPerformer(Turn turn, CardDeck cardDeck, DiscardPile discardPile, Round round) {
        if (turn == null || cardDeck == null || discardPile == null || round == null)
            throw new IllegalArgumentException("Argument cannot be null");
        this.turn = turn;
        this.cardDeck = cardDeck;
        this.discardPile = discardPile;
        this.round = round;
    }

    private void validateAction(Player player, Actions action) {
        if (!ActionValidator.isValidMoveInCurrentState(player, action, turn)) {
            String errorMessage = String.format("Tried to perform action %s with player %s on turn %s", action.toString(), player.toString(), turn.toString());
            throw new IllegalMoveException(errorMessage);
        }
    }

    private boolean putExecutor(Player player1, Player player2, int index, Actions action) throws IllegalArgumentException, IllegalMoveException {
        validateAction(player1, action);
        Card card = player2.getCard(index);
        if (discardPile.showTopCard().isSameValue(card)) {
            discardPile.put(card);
            player2.removeCard(index);
            Gamestate nextState = action == Actions.PUT_OTHER ? Gamestate.PUT_OTHER_TRANSFER : Gamestate.PUT;
            turn.setGameState(nextState);
            turn.setCurrentPuttingPlayer(player1);
            return true;
        }
        // If this code runs the put failed
        player1.addCard(cardDeck.drawCard());
        return false;
    }

    public boolean putSelf(Player player, int index) throws IllegalArgumentException, IllegalMoveException {
        return putExecutor(player, player, index, Actions.PUT_SELF);
    }

    public boolean putOther(Player player1, Player player2, int index) throws IllegalArgumentException, IllegalMoveException {
        return putExecutor(player1, player2, index, Actions.PUT_OTHER);
    }

    public void endTurn(Player player) throws IllegalMoveException {
        validateAction(player, Actions.END_TURN);
        turn.nextPlayer();
        temporaryCard = null;
        Player nextPlayer = turn.getCurrentPlayer();
        if (nextPlayer == turn.getKhabuPlayer()) {
            turn.setGameState(Gamestate.ENDED);
            round.endRound();
        }
        else
            turn.setGameState(Gamestate.DRAW);
    }

    public Card drawFromDeck(Player player) {
        validateAction(player, Actions.DRAW_FROM_DECK);
        this.temporaryCard = cardDeck.drawCard();
        turn.setGameState(Gamestate.CARD_DRAWN);
        return temporaryCard;
    }

    public void drawFromDisc(Player player, int index) {
        validateAction(player, Actions.DRAW_FROM_DISC);
        try {
            this.temporaryCard = discardPile.draw();
        } catch (IllegalStateException e) { // TODO: Rethink
            throw new IllegalMoveException(e);
        }
        turn.setGameState(Gamestate.CARD_DRAWN);
        swapDrawnCard(player, index);
    }

    public void callKhabu(Player player) {
        validateAction(player, Actions.CALL_KHABU);
        khabu(player);
    }

    private void khabu(Player player) {
        turn.setGameState(Gamestate.FRENZY);
        turn.setKhabuPlayer(player);
        endTurn(player);
    }

    public void swapDrawnCard(Player player, int index) {
        validateAction(player, Actions.SWAP);
        Card cardToBeSwapped = player.removeCard(index);
        player.addCard(temporaryCard);
        temporaryCard = null;
        discardPile.put(cardToBeSwapped);
        turn.setGameState(Gamestate.FRENZY);
    }

    public void discardCard(Player player) {
        validateAction(player, Actions.DISCARD);
        if (temporaryCard != null) {
            discardPile.put(temporaryCard);
            temporaryCard = null;
            turn.setGameState(Gamestate.DISCARD);
        } else {
            throw new IllegalMoveException("TemporaryCard is null");
        }
    }

    public void transferCard(Player player1, Player player2, int cardIndex) {
        validateAction(player1, Actions.TRANSFER);
        if (player1 == player2) {
            throw new IllegalMoveException("Cannot transfer to yourself");
        }
        Card card = player1.removeCard(cardIndex);
        player2.addCard(card);
        turn.setGameState(Gamestate.PUT);
    }

    public Card getTemporaryCard() {
        return temporaryCard;
    }

    public void setTemporaryCard(Card temporaryCard) {
        this.temporaryCard = temporaryCard;
    }
}



