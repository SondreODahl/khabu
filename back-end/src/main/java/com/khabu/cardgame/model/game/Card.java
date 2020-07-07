package com.khabu.cardgame.model.game;

public class Card {
    private int value;
    private String face;

    public Card(int value, String face) {
        if (isValidCardValue(value)) this.value = value;
        if (isValidFaceValue(face)) this.face = face;
    }

    public int getValue() {
        return value;
    }

    public String getFace() {
        return face;
    }

    private boolean isValidCardValue(int value) {
        if (value <= 13 && value >= 1) {
            return true;
        }
        throw new IllegalArgumentException("Invalid card value");
    }

    private boolean isValidFaceValue(String face) {
        if (face.equals("H") || face.equals("S") || face.equals("C") || face.equals("D")) {
            return true;
        }
        throw new IllegalArgumentException("Invalid face value");
    }

}
