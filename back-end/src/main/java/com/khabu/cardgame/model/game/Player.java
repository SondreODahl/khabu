package com.khabu.cardgame.model.game;

public class Player {
    private String name;
    private int playerId;
    private CardHand cardHand;
    private boolean ready = false;

    public Player(String name, int playerId) {
        this.name = name;
        this.playerId = playerId;
    }

    public String getName() {
        return name;
    }

    public int getPlayerId() {
        return playerId;
    }

    public CardHand getCardHand() {
        return cardHand;
    }

    public boolean isReady() {
        return ready;
    }

    void setReady(boolean ready) {
        this.ready = ready;
    }
}
