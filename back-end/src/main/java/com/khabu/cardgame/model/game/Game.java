package com.khabu.cardgame.model.game;

import java.util.*;

public class Game {
    private String roomId;
    private ArrayList<Player> players;
    private final int INIT_STARTING_HAND = 4;
    public static int REVEAL_TIME = 7*1000;
    public static int NUM_OF_PLAYERS = 2;
    private final Map<Player, Integer> playerTotalScores = new HashMap<>();
    private Round currentRound;

    public Game(String roomId) {
        this.roomId = roomId;
        this.players = new ArrayList<>();
    }

    public Game(String roomId, int REVEAL_TIME) {
        this.roomId = roomId;
        this.players = new ArrayList<>();
        Game.REVEAL_TIME = REVEAL_TIME;
    }

    public void beginGame() {
        this.currentRound = Round.Constructor(this, players, INIT_STARTING_HAND, REVEAL_TIME);
    }

    public void roundEnded() {
        if (currentRound == null) return; // Used so other test classes will run
        for (Player player : players) {
            int score = currentRound.getScore(player);
            int prevScore = playerTotalScores.get(player);
            playerTotalScores.put(player, prevScore + score);
        }
    }

    public int getTotalScore(Player player) {
        return playerTotalScores.get(player);
    }

    public void addPlayer(Player player) {
        if (player == null)
            throw new IllegalArgumentException("Player cannot be null");
        if (players.size() == NUM_OF_PLAYERS)
            throw new IllegalStateException("Added maximum amount of players");
        playerTotalScores.put(player, 0);
        players.add(player);
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }


    public ArrayList<Player> getPlayers() {
        return players;
    }

    public Player getPlayer(int index) {
        return players.get(index);
    }

    public int getINIT_STARTING_HAND() {
        return INIT_STARTING_HAND;
    }

    public Round getRound() {
        return currentRound;
    }
}
