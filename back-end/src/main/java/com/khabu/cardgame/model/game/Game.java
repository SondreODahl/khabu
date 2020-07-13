package com.khabu.cardgame.model.game;

import java.util.*;

public class Game {
    private String roomId;
    private List<Player> players;
    static private final int NUM_OF_PLAYERS = 2;
    private final int INIT_STARTING_HAND = 4;
    private final int REVEAL_TIME = 10*1000;
    private Map<Player, Integer> playerTotalScores;
    private Round currentRound;

    public Game(String roomId, Player[] players) {
        this.roomId = roomId;
        this.players = new ArrayList<>();
        this.playerTotalScores = new HashMap<>();
        this.currentRound = Round.Constructor(players, INIT_STARTING_HAND, REVEAL_TIME);
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
