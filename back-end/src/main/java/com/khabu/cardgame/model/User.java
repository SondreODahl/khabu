package com.khabu.cardgame.model;

public class User {
    String name;
    boolean ready;

    public User(String name) {
        this.name = name;
        this.ready = false;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isReady() {
        return ready;
    }

    public void setReady(boolean ready) {
        this.ready = ready;
    }
}
