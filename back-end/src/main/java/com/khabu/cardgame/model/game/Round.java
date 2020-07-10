package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;

public class Round {

    public Round(int numOfPlayers) {}

    public void beginRound() {
        // This is the logic before first player's turn
        // TODO: Deal cards (separate method)
        // TODO: Reveal cards (separate method ?)
        // TODO: Set a starting player (conneced to turn, currentPlayer?)
    }

    public boolean getStarted() {
        return true;
    }

    public void performAction(Player player2, Actions discard) {
    }

    public boolean readyUp(Player player1) {
        return false;
    }

    public int getPlayersReady() {
        return 0;
    }
}
