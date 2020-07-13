package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.action.ActionPerformer;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardDeck;
import com.khabu.cardgame.model.game.card.CardHand;
import com.khabu.cardgame.model.game.card.DiscardPile;
import com.khabu.cardgame.util.IllegalMoveException;

import java.util.*;

public class Round {

    private DiscardPile discardPile = new DiscardPile();
    private CardDeck cardDeck = new CardDeck(discardPile);
    private Turn turn;
    private ActionPerformer actionPerformer;
    private Player[] players;

    private boolean roundStarted;
    private Map<Player, Boolean> playersReady = new HashMap<>();
    private Map<Player, Integer> revealedCard = new HashMap<>();

    private final int MIN_INIT_HAND_SIZE = 2;
    private final int MAX_INIT_HAND_SIZE = 8; // TODO: Should be changed to be more dynamic
    private final int INIT_HAND_SIZE;
    private final int REVEAL_TIME;

    public Round(Player[] players, int INIT_HAND_SIZE, int REVEAL_TIME) {
        validateHandSize(INIT_HAND_SIZE);
        this.INIT_HAND_SIZE = INIT_HAND_SIZE;
        this.REVEAL_TIME = REVEAL_TIME;
        this.turn = new Turn(players);
        this.actionPerformer = new ActionPerformer(turn, cardDeck, discardPile);
        this.players = players;
        for (Player player : players) {
            this.playersReady.put(player, false);
            this.revealedCard.put(player, 0);
        }
    }

    private void validateHandSize(int initialHandSize) {
        if (initialHandSize < MIN_INIT_HAND_SIZE || initialHandSize > MAX_INIT_HAND_SIZE )
            throw new IllegalArgumentException(String.format(
                    "Initial hand size is larger or smaller than allowed (%d-%d)",
                    MIN_INIT_HAND_SIZE, MAX_INIT_HAND_SIZE));
    }

    public void beginRound() {
        // This is the logic before first player's turn
        dealCards();
        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                setStarted(true);
            }
        };
        timer.schedule(task, this.REVEAL_TIME);
    }

    public void setStarted(boolean started) {
        this.roundStarted = started;
    }

    private void dealCards() {
        cardDeck.shuffle();
        for (Player player: this.players) {
            for (int i = 0; i < this.INIT_HAND_SIZE; i++) {
                Card drawnCard = cardDeck.drawCard();
                player.addCard(drawnCard);
            }
        }
    }

    public void performAction(Player player, Actions action) {
        performAction(player, null, action, -1);
    }
    public void performAction(Player player, Actions action, int index) {
        performAction(player, null, action, index);
    }
    public void performAction(Player player1, Player player2, Actions action, int index) {

    }

    public boolean readyUp(Player player) {
        boolean readiedUp = playersReady.get(player);
        playersReady.put(player, !readiedUp);
        if (getPlayersReady() == players.length) {
            beginRound();
        }
        return this.roundStarted;
    }

    public Card revealCard(Player player, int index) {
        if (this.roundStarted) {throw new IllegalStateException("Round has already begun");}
        int alreadyRevealed = this.revealedCard.get(player);
        int maxReveal = INIT_HAND_SIZE/2;
        if (alreadyRevealed == maxReveal) {
            throw new IllegalMoveException(String.format("Already shown %d cards", maxReveal));
        }
        return player.getCard(index);
    }

    public Map<Player, CardHand> revealHands() {
        return new HashMap<>();  // TODO: Change
    }

    // ------------------------------ GETTERS ---------------------------------

    public int getPlayersReady() {
        return (int) playersReady.values().stream().filter(Boolean::booleanValue).count();
    }

    public void endRound() {
    }

    public Turn getTurn() {
        return this.turn;
    }

    public CardDeck getCardDeck() {
        return this.cardDeck;
    }

    public Player[] getPlayers() {
        return this.players.clone();
    }

    public boolean getStarted() {
        return this.roundStarted;
    }
}
