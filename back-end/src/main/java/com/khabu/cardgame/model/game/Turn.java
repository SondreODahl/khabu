package com.khabu.cardgame.model.game;

import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.NotYourTurnException;

public class Turn {
    private Player currentPlayer;
    private Player currentPuttingPlayer;
    private Gamestate gameState;

    public void endTurn() throws NotYourTurnException, IllegalMoveException {

    }

    public void updateCurrentPlayer() {

    }

    public Gamestate getGameState() {
        return this.gameState;
    }

    public void setGameState(Gamestate gameState) {
        this.gameState = gameState;
    }

    public boolean isValidMoveInCurrentState(Player attemptingPlayer, Actions action) {
        return false;
    }

}
