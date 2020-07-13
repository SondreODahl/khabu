package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.ActionPerformer;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.CardHand;
import com.khabu.cardgame.model.game.card.DiscardPile;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Round {

    private DiscardPile discardPile = new DiscardPile();
    private CardDeck cardDeck = new CardDeck(discardPile);
    private Turn turn;
    private ActionPerformer actionPerformer;
    private Player[] players;

    private boolean roundStarted;
    private Map<Player, Boolean> playersReady = new HashMap<>();

    private final int MIN_INIT_HAND_SIZE = 2;
    private final int MAX_INIT_HAND_SIZE = 8; // TODO: Should be changed to be more dynamic

    public Round(Player[] players, int initialHandSize) {
        validateHandSize(initialHandSize);
        this.turn = new Turn(players);
        this.actionPerformer = new ActionPerformer(turn, cardDeck, discardPile);
        this.players = players;
        this.playersReady.keySet().addAll(Arrays.asList(players));
    }

    private void validateHandSize(int initialHandSize) {
        if (initialHandSize < MIN_INIT_HAND_SIZE || initialHandSize > MAX_INIT_HAND_SIZE )
            throw new IllegalArgumentException(String.format(
                    "Initial hand size is larger or smaller than allowed (%d-%d)",
                    MIN_INIT_HAND_SIZE, MAX_INIT_HAND_SIZE));
    }

    public void beginRound() {
        // This is the logic before first player's turn
        // TODO: Deal cards (separate method)
        // TODO: Reveal cards (separate method ?)
        // TODO: Set a starting player (connected to turn, currentPlayer?)
    }

    public boolean getStarted() {
        return this.roundStarted;
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
