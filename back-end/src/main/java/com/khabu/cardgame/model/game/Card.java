package com.khabu.cardgame.model.game;

public class Card {
    private int value;
    private char face;

    public Card(int value, char face) {
        if (isValidCardValue(value)) this.value = value;
        if (isValidFaceValue(face)) this.face = face;
    }

    public int getValue() {
        return value;
    }

    public char getFace() {
        return face;
    }

    private boolean isValidCardValue(int value) {
        if (value <= 13 && value >= 1) {
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
}
