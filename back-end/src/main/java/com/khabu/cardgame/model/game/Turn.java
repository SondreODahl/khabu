package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.util.IllegalMoveException;

import java.util.ArrayList;

public class Turn {
    private Player currentPuttingPlayer;
    private ArrayList<Player> players;
    private int currentPlayer;
    private Gamestate gameState;
    private Player khabuPlayer;

    public Turn(ArrayList<Player> players) {
        this.players = players;
        currentPlayer = 0; // TODO: Randomize starting player
    }

    public void nextPlayer() {
        currentPlayer = (currentPlayer + 1) % players.size();
        currentPuttingPlayer = null;
    }

    public Player getKhabuPlayer() {
        return this.khabuPlayer;
    }

    public void resetKhabuPlayer() {
        this.khabuPlayer = null;
    }

    public void setKhabuPlayer(Player khabuPlayer) throws IllegalMoveException {
        checkPlayerForNull(khabuPlayer);
        if (this.khabuPlayer != null) {
            throw new IllegalMoveException("Khabu player is already set");
        }
        this.khabuPlayer = khabuPlayer;
    }

    public Player getCurrentPlayer() {
        return players.get(currentPlayer);
    }

    public void setCurrentPlayer(Player newCurrentPlayer) {
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i) == newCurrentPlayer) {
                this.currentPlayer = i;
                return;
            }
        }
        throw new IllegalArgumentException("Player not in list of players");
    }

    public Player getCurrentPuttingPlayer() {
        return currentPuttingPlayer;
    }

    public void setCurrentPuttingPlayer(Player puttingPlayer) {
        checkPlayerForNull(puttingPlayer);
        this.currentPuttingPlayer = puttingPlayer;
    }

    private void checkPlayerForNull(Player player) {
        if (player == null) throw new IllegalArgumentException("Player cannot be null");
    }

    public Gamestate getGameState() {
        return this.gameState;
    }

    public void setGameState(Gamestate gameState) {
        this.gameState = gameState;
    }

    public boolean gameStateEquals(Gamestate state) {
        return this.gameState.equals(state);
    }

    @Override
    public String toString() {
        return String.format("[Turn CurrentPlayer: %s, CurrentPuttingPlayer: %s, KhabuPlayer: %s, State: %s]",
                getCurrentPlayer(), currentPuttingPlayer, khabuPlayer, gameState);
    }
}
