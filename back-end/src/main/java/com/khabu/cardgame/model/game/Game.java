package com.khabu.cardgame.model.game;

import java.util.*;

public class Game {
    private String roomId;
    private Player[] players;
    private int playersAdded = 0;
    static private final int NUM_OF_PLAYERS = 2;
    private final int INIT_STARTING_HAND = 4;
    public static int REVEAL_TIME = 7*1000;
    private final Map<Player, Integer> playerTotalScores = new HashMap<>();;
    private Round currentRound;

    public Game(String roomId, int numOfPlayers) {
        this.roomId = roomId;
        this.players = new Player[numOfPlayers];
    }

    public Game(String roomId, int NUM_OF_PLAYERS, int REVEAL_TIME) {
        this.roomId = roomId;
        this.players = new Player[NUM_OF_PLAYERS];
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
        if (playersAdded == NUM_OF_PLAYERS)
            throw new IllegalStateException("Added maximum amount of players");
        playerTotalScores.put(player, 0);
        players[playersAdded] = player;
        playersAdded++;
    }

    public void removePlayer(Player player) {
        List<Player> players = new ArrayList<>(Arrays.asList(this.players));
        players.remove(player);
        this.players = players.toArray(new Player[0]);
        // TODO: Possible to do with streams?
        // Arrays.stream(players).filter(p -> !p.equals(player))
    }


    public Player[] getPlayers() {
        return players;
    }

    public Player getPlayer(int index) {
        return players[index-1];
    }

    public static int getNumOfPlayers() {
        return NUM_OF_PLAYERS;
    }

    public int getINIT_STARTING_HAND() {
        return INIT_STARTING_HAND;
    }

    public Round getRound() {
        return currentRound;
    }

    public int getPlayersAdded() {
        return playersAdded;
    }
}
