package com.khabu.cardgame.model.game.card;

import java.util.Stack;

public class DiscardPile {


    private Stack<Card> pile;

    public DiscardPile() {
        pile = new Stack<>();
    }

    public void reset() {
        pile.clear();
    }

    public Card draw() {
        if (pile.empty()) {
            throw new IllegalStateException("Illegal Move. DiscardPile is empty");
        }
        return pile.pop();
    }

    public void put(Card card) {
        if (pile.contains(card)) {
            throw new IllegalStateException("That card already exists in the pile");
        }
        pile.push(card);
    }

    public Card swap(Card card) {
        Card returnCard = draw();
        put(card);
        return returnCard;
    }

    public int getSize() {
        return pile.size();
    }

    public Card showTopCard() {
        if (pile.size() == 0) {
            return null;
        }
        return pile.peek();
    }
}
