package com.khabu.cardgame.model;

import com.khabu.cardgame.model.game.Player;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PlayerRepository {
    private Map<Integer, Player> players = new HashMap<>();
    public static int PLAYER_ID_COUNT = 1;

    public void addPlayer(int id, Player player) {
        players.put(id, player);
    }

    public void removePlayer(int id) {
        players.remove(id);
    }

    public Map<Integer, Player> getPlayers() {
        return players;
    }

    public Map<Object, String> getPlayerNamesAndIds() {
        Map<Object, String> output = new HashMap<>();
        for (int id:players.keySet()) {
            output.put(Integer.toString(id), players.get(id).getName());
        }
        return output;
    }
}
