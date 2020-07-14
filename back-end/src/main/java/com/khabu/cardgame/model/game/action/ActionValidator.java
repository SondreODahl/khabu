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
            case PUT_OTHER:
                return isValidPut(attemptingPlayer, turn);
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
    }

    private static boolean isValidDrawFromDiscard(Player attemptingPlayer, Turn turn) {
        return (!turn.gameStateEquals(Gamestate.FIRST_TURN) &&
                turn.gameStateEquals(Gamestate.DRAW)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isValidKhabuCall(Player attemptingPlayer, Turn turn) {
        return (turn.gameStateEquals(Gamestate.DRAW) ||
                turn.gameStateEquals(Gamestate.FIRST_TURN)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn) &&
                turn.getKhabuPlayer() == null;
    }

    private static boolean isValidTransfer(Player attemptingPlayer, Turn turn) {
        if (turn.gameStateEquals(Gamestate.PUT_OTHER_TRANSFER)) {
            Player CPP = turn.getCurrentPuttingPlayer();
            return CPP != null && CPP == attemptingPlayer;
        }
        return false;
    }

    private static boolean isValidSwap(Player attemptingPlayer, Turn turn) {
        return turn.gameStateEquals(Gamestate.CARD_DRAWN) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn);
    }


    private static boolean isValidPut(Player attemptingPlayer, Turn turn) {
        return ((turn.gameStateEquals(Gamestate.PUT) &&
                turn.getCurrentPuttingPlayer().equals(attemptingPlayer))
                ||
                turn.gameStateEquals(Gamestate.DISCARD) ||
                turn.gameStateEquals(Gamestate.FRENZY));
    }

    private static boolean isValidEndTurn(Player attemptingPlayer, Turn turn) {
        return (turn.gameStateEquals(Gamestate.PUT) ||
                turn.gameStateEquals(Gamestate.DISCARD) ||
                turn.gameStateEquals(Gamestate.FRENZY)) &&
                isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isValidDiscard(Player attemptingPlayer, Turn turn) {
        return turn.gameStateEquals(Gamestate.CARD_DRAWN)
                && isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isValidDrawFromDeck(Player attemptingPlayer, Turn turn) {
        return turn.gameStateEquals(Gamestate.DRAW)
                && isPlayerCurrentPlayer(attemptingPlayer, turn);
    }

    private static boolean isPlayerCurrentPlayer(Player player, Turn turn) {
        return turn.getCurrentPlayer().equals(player);
    }

}
