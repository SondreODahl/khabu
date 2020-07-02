package com.khabu.cardgame.model;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PlayerRepository {
    private List<Player> players = new ArrayList<>();

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }

    public boolean IsPlayerInListBySessionId(String sessionId) {
        for (Player player: players) {
            if (player.getSessionId().equals(sessionId)) {
                return true;
            }
        }
        return false;
    }

    public boolean IsPlayerInListByName(String name) {
        for (Player player: players) {
            System.out.printf("\n %s is in the list \n \n", player);
            if (player.getName().equals(name)) {
                return true;
            }
        }
        return false;
    }

    public void removePlayerBySessionId(String sessionId) {
        players.removeIf(p -> p.getSessionId().equals(sessionId));
    }

    public List<Player> getPlayers() {
        return players;
    }
}
