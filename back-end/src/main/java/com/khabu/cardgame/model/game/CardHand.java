package com.khabu.cardgame.model.game;

import java.util.*;

public class CardHand {
    Map<Integer, Card> cards = new TreeMap<>();

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
        cards.remove(id);
        return removedCard;
    }

    public void addCard(Card card) {
        int index = findSmallestAvailableIndex();
        cards.put(index, card);
    }

    private int findSmallestAvailableIndex() {
        List<Integer> keys = new ArrayList<>(cards.keySet());
        // Empty map means that the smallest index is 1
        if (cards.size() == 0) return 1;
        // Smallest index available is 2 in this case
        if (cards.size() < 2) return 2;
        // Find the smallest index if it is not 2
        for (int i = 1; i < keys.size(); i++) {
            if (keys.get(i) - keys.get(i-1) > 1) {
                return keys.get(i-1)+1;
            }
        }
        // Increases largest current key by 1
        return cards.size()+1;
    }
}
