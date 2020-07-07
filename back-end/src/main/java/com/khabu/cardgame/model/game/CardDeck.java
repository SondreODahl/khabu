package com.khabu.cardgame.model.game;

import java.util.ArrayList;
import java.util.Collections;

public class CardDeck {

    private final int DECK_SIZE = 52;
    private final ArrayList<Card> cards = new ArrayList<>();
    private final DiscardPile discardPile;

    public CardDeck(DiscardPile discardPile) {
        this.discardPile = discardPile;
        initializeCards();
        shuffle();
    }

    private void initializeCards() {
        char[] faces = {'H', 'C', 'S', 'D'};
        for (int i = 0; i < DECK_SIZE; i++) {
            int val = i % 13;
            char face = faces[i / 13];
            Card card = new Card(val, face);
            cards.add(card);
        }
    }

    @SuppressWarnings(value="unchecked")
    public ArrayList<Card> getCards() {
        return (ArrayList<Card>) cards.clone();
    }

    public int getSize() {
        return cards.size();
    }

    public DiscardPile getPile() {
        return discardPile;
    }

    public Card drawCard() {
        if (cards.size() == 0) shuffle(); // TODO: Implementation if both decks empty
        return cards.remove(cards.size()-1);
    }

    public void shuffle() {
        int pileSize = discardPile.getSize();
        for (int i = 0; i < pileSize; i++) {
            Card discardedCard = discardPile.draw();
            cards.add(discardedCard);
        }
        Collections.shuffle(cards);
    }
}
