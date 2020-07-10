package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardHand;

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

    public void addCard(Card h) {
    }

    public Card getCard(int i) {
        return cardHand.getCard(i);
    }

    public Card removeCard(int i) { return cardHand.removeCard(i);}

    public boolean hasCard(Card checkCard) {
        return cardHand.getCards().values().stream().anyMatch(card -> card.equals(checkCard));
    }

    public String toString() {
        return String.format("[Player: %s, PlayerId: %d]", name, playerId);
    }
}
