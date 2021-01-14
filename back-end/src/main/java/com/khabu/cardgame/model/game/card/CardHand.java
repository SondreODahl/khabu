package com.khabu.cardgame.model.game.card;

import java.util.Map;
import java.util.TreeMap;

public class CardHand {
    TreeMap<Integer, Card> cards = new TreeMap<>();

    public Map<Integer, Card> getCards() {
        return cards;
    }

    public Card getCard(int key) {
        if (! cards.containsKey(key))
            throw new IllegalArgumentException("Card key does not exist");
        return cards.get(key);
    }

    public Card removeCard(int id) {
        Card removedCard = cards.get(id);
        if (removedCard == null) throw new IllegalArgumentException("Illegal Id for card in cardhand");
        cards.remove(id);
        return removedCard;
    }

    public void addCard(Card card) {
        int index = findSmallestAvailableIndex();
        cards.put(index, card);
    }

    public void addCardToSpecificIndex(Card card, int index) {
        cards.put(index, card);
    }

    public int findCardIndexbyCard(Card card) {
        for (int i: cards.keySet()) {
            if (cards.get(i).equals(card)) {
                return i;
            }
        }
        return 0;
    }

    private int findSmallestAvailableIndex() {
        if (cards.size() == 0 || cards.firstKey() > 0) return 0;
        for (int i = 0; i <= cards.lastKey(); i++) {
            Integer firstKeyAfterI = cards.higherKey(i);
            if (firstKeyAfterI == null || firstKeyAfterI != i+1) {
                return i+1;
            }
        }
        return cards.size();
    }

    public int calculateHandScore() {
        int sum = 0;
        for (Card card : cards.values()) {
            sum += card.getValue();
        }
        return sum;
    }

    public int getSize() {
        return cards.size();
    }
}
