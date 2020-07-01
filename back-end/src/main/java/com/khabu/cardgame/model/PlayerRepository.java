package com.khabu.cardgame.model;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlayerRepository {
    private List<Player> players;

    public PlayerRepository(List<Player> players) {
        this.players = players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }

    public List<Player> getPlayers() {
        return players;
    }
}
