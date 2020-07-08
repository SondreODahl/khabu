package com.khabu.cardgame.model.game.action;

import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Turn;

public class ActionValidator {
    public static boolean isValidMoveInCurrentState(Player attemptingPlayer, Actions action, Turn turn) {
        switch (action) {
            case DRAW_FROM_DECK:
                return isValidDrawFromDeck(attemptingPlayer, turn);
            case DISCARD:
                return isValidDiscard(attemptingPlayer, turn);
            case END_TURN:
                return isValidEndTurn(attemptingPlayer, turn);
            case PUT_SELF:
                return isValidPutSelf(attemptingPlayer, turn);
            case PUT_OTHER:
                return isValidPutOther(attemptingPlayer, turn);
            case SWAP:
                return isValidSwap(attemptingPlayer, turn);
            case TRANSFER:
                return isValidTransfer(attemptingPlayer, turn);
            case CALL_KHABU:
                return isValidKhabuCall(attemptingPlayer, turn);
            case DRAW_FROM_DISC:
                return isValidDrawFromDiscard(attemptingPlayer, turn);
            default:
                return false;
        }
        return false;
    }

    private static boolean isValidPutSelf(Player attemptingPlayer, Turn turn) {
        if (turn.getCurrentPuttingPlayer().equals());
    }

    private static boolean isValidEndTurn(Player attemptingPlayer, Turn turn) {
        return (turn.getGameState().equals(Gamestate.PUT) ||
                turn.getGameState().equals(Gamestate.DISCARD) ||
                turn.getGameState().equals(Gamestate.FRENZY)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isValidDiscard(Player attemptingPlayer, Turn turn) {
        return turn.getGameState().equals(Gamestate.CARD_DRAWN)
                && isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isValidDrawFromDeck(Player attemptingPlayer, Turn turn) {
        return turn.getGameState().equals(Gamestate.DRAW)
                && isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isPlayerCurrentPlayer(Player player, Turn turn) {
        return turn.getCurrentPlayer().equals(player);
    }

}
