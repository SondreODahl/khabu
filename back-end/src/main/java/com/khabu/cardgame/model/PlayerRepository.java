package com.khabu.cardgame.model;

import com.khabu.cardgame.model.game.Player;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PlayerRepository {
    private Map<Integer, String> players = new HashMap<>();
    public static int PLAYER_ID_COUNT = 1;

    public void addPlayer(int id, String name) {
        players.put(id, name);
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }

    public boolean IsPlayerInListByName(String name) {
        return players.containsValue(name);
    }

    public void removePlayerByUsername(String userName) {
        for (Integer id: players.keySet()) {
            if (players.get(id).equals(userName)) {
                players.remove(id);
            }
        }
    }

    public Map<Integer, String> getPlayers() {
        return players;
    }
}
