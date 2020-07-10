package com.khabu.cardgame.model.game;

import java.util.*;

public class Game {
    private String roomId;
    private List<Player> players;
    static private final int NUM_OF_PLAYERS = 4;
    private Map<Player, Integer> playerTotalScores;
    private Round currentRound;

    public Game(String roomId) {
        this.roomId = roomId;
        this.players = new ArrayList<>();
        this.playerTotalScores = new HashMap<>();
        this.currentRound = new Round(NUM_OF_PLAYERS);
    }

    public String getRoomId() {
        return roomId;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public int getNUM_OF_PLAYERS() {
        return NUM_OF_PLAYERS;
    }

    public Map<Player, Integer> getPlayerTotalScores() {
        return playerTotalScores;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }
}
