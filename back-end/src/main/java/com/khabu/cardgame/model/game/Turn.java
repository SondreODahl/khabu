package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.NotYourTurnException;

public class Turn {
    private Player currentPlayer;
    private Player currentPuttingPlayer;
    private Gamestate gameState;

    public void endTurn() throws NotYourTurnException, IllegalMoveException {

    }

    public void updateCurrentPlayer(Player newCurrentPlayer) {
        this.currentPlayer = newCurrentPlayer;
    }

    public void updateCurrentPuttingPlayer(Player puttingPlayer) {
        this.currentPuttingPlayer = puttingPlayer;
    }

    public Player getCurrentPlayer() {
        return currentPlayer;
    }

    public Player getCurrentPuttingPlayer() {
        return currentPuttingPlayer;
    }

    public Gamestate getGameState() {
        return this.gameState;
    }

    public void setGameState(Gamestate gameState) {
        this.gameState = gameState;
    }

}
