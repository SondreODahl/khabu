package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.NotYourTurnException;

public class Turn {
    private Player currentPuttingPlayer;
    private Player[] players;
    private int currentPlayer;
    private Gamestate gameState;

    public Turn(Player[] players) {
        this.players = players;
        currentPlayer = 0;
    }

    public void nextPlayer() {
        currentPlayer = (currentPlayer + 1) % players.length;
        currentPuttingPlayer = null;
    }

    public void setCurrentPlayer(Player newCurrentPlayer) {
        for (int i = 0; i < players.length; i++) {
            if (players[i] == newCurrentPlayer) {
                this.currentPlayer = i;
                return;
            }
        }
        throw new IllegalArgumentException("Player not in list of players");
    }

    public void updateCurrentPuttingPlayer(Player puttingPlayer) {
        this.currentPuttingPlayer = puttingPlayer;
    }

    public Player getCurrentPlayer() {
        return players[currentPlayer];
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
