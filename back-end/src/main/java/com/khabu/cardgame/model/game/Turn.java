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
    private Player khabuPlayer;

    public Turn(Player[] players) {
        this.players = players;
        currentPlayer = 0;
    }

    public void nextPlayer() {
        currentPlayer = (currentPlayer + 1) % players.length;
        currentPuttingPlayer = null;
    }

    private void checkPlayerForNull(Player player) {
        if (player == null) throw new IllegalArgumentException("Player cannot be null");
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

    public void setCurrentPuttingPlayer(Player puttingPlayer) {
        checkPlayerForNull(puttingPlayer);
        this.currentPuttingPlayer = puttingPlayer;
    }

    public void setKhabuPlayer(Player khabuPlayer) {
        checkPlayerForNull(khabuPlayer);
        if (this.khabuPlayer != null) {throw new IllegalMoveException("Khabu player is already set");}
        this.khabuPlayer = khabuPlayer;
    }

    public Player getKhabuPlayer() {
        return this.khabuPlayer;
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
