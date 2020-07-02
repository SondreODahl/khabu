package com.khabu.cardgame.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Player {

    private String name;
    private String sessionId;

    public Player() {
    }

    public Player(String name, String sessionid) {
        this.sessionId = sessionid;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    @Override
    public String toString() {
        return "Player{" +
                "name='" + name + '\'' +
                ", sessionId='" + sessionId + '\'' +
                '}';
    }
}
