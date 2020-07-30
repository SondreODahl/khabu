package com.khabu.cardgame.model.game.card;

public class Card {
    private int value;
    private char face;

    public Card(int value, char face) {
        if (isValidCardValue(value)) this.value = value;
        if (isValidFaceValue(face)) this.face = face;
    }

    public int getValue() {
        return value + 1;
    }

    public char getFace() {
        return face;
    }

    private boolean isValidCardValue(int value) {
        if (value <= 12 && value >= 0) {
            return true;
        }
        throw new IllegalArgumentException("Invalid card value");
    }

    private boolean isValidFaceValue(char face) {
        if (face == 'H' || face == 'S' || face == 'C' || face == 'D') {
            return true;
        }
        throw new IllegalArgumentException("Invalid face value");
    }

    public boolean isSameValue(Card card2) { // To be used for putting
        return this.value == card2.value;
    }

    @Override
    public String toString() {
        return String.format("[CARD, Value:%d Face:%c ]", getValue(), getFace());
    }
}
