package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.CardHand;

import java.util.Map;

public class Round {

    public Round(Player[] players, int initialHandSize) {
    }

    public void beginRound() {
        // This is the logic before first player's turn
        // TODO: Deal cards (separate method)
        // TODO: Reveal cards (separate method ?)
        // TODO: Set a starting player (connected to turn, currentPlayer?)
    }

    public boolean getStarted() {
        return true;
    }

    public void performAction(Player player, Actions action) {
        performAction(player, null, action, -1);
    }

    public void performAction(Player player, Actions action, int index) {
        performAction(player, null, action, index);
    }

    public void performAction(Player player1, Player player2, Actions action, int index) {

    }

    public boolean readyUp(Player player1) {
        return false;
    }

    public int getPlayersReady() {
        return 0;
    }

    public boolean getEnded() {
    }

    public Map<Player, CardHand> revealHands() {
    }

    public void endRound() {
    }

    public Turn getTurn() {
    }

    public CardDeck getCardDeck() {
    }

    public Player[] getPlayers() {
    }
}
