package com.khabu.cardgame.model.game;

import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.card.CardHand;

public class Player {
    private String name;
    String sessionId;
    private int playerId;
    private CardHand cardHand;
    private boolean ready = false;

    public Player(String name, int playerId, String sessionId) {
        this.name = name;
        this.playerId = playerId;
        this.sessionId = sessionId;
        this.cardHand = new CardHand();
    }

    public String getName() {
        return name;
    }

    public String getSessionId() {
        return sessionId;
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
        cardHand.addCard(h);
    }

    public Card getCard(int i) {
        return cardHand.getCard(i);
    }

    public Card removeCard(int i) { return cardHand.removeCard(i);}

    public boolean hasCard(Card checkCard) {
        return cardHand.getCards().values().stream().anyMatch(card -> card.equals(checkCard));
    }

    public int calculateScore() {
        return cardHand.calculateHandScore();
    }

    public String toString() {
        return String.format("[Player: %s, PlayerId: %d]", name, playerId);
    }

    public int getHandSize() {
        return cardHand.getSize();
    }

    public int findCardIndexbyCard(Card card) {
        return cardHand.findCardIndexbyCard(card);
    }
}
