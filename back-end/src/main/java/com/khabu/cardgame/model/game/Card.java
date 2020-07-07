package com.khabu.cardgame.model.game;

public class Card {
    private int value;
    private char face;

    public Card(int value, char face) {
        this.value = value;
        this.face = face;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public char getFace() {
        return face;
    }

    public void setFace(char face) {
        this.face = face;
    }
}
