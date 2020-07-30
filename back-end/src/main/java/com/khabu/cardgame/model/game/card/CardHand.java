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
        if (cards.size() == 0) return 1;
        for (int i = 0; i <= cards.lastKey(); i++) {
            Integer firstKeyAfterI = cards.higherKey(i);
            if (firstKeyAfterI == null || firstKeyAfterI != i+1) {
                return i+1;
            }
        }
        return cards.size()+1;
//        List<Integer> keys = new ArrayList<>(cards.keySet());
//        // Empty map means that the smallest index is 1
//        if (cards.size() == 0) return 1;
//        // Find the smallest index if it is not 2
//        int lastEntry = cards.lastKey();
//        int highestId = keys.get(keys.size()-1);
//        for (int i = 2; i <= highestId; i++) {
//            if (keys.get(i) - keys.get(i-1) > 1) {
//                return keys.get(i-1)+1;
//            }
//        }
//        // Increases largest current key by 1
//        return cards.size()+1;
    }

    public int calculateHandScore() {
        int sum = 0;
        for (Card card : cards.values()) {
            if ((card.getFace() == 'D' || card.getFace() == 'H')
                    && card.getValue() == 13) {
                sum -= 1;
            } else {
                sum += (card.getValue());
            }
        }
        return sum;
    }

    public int getSize() {
        return cards.size();
    }
}
