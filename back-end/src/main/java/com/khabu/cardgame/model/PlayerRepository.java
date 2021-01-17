package com.khabu.cardgame.model;

import com.khabu.cardgame.model.game.Player;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class PlayerRepository {
    private Map<String, Player> players = new HashMap<>();

    public void addPlayer(String sessionId, Player player) {
        players.put(sessionId, player);
    }

    public void removePlayer(String sessionId) {
        players.remove(sessionId);
    }

    public Player getPlayer(String sessionId) {
        return players.get(sessionId);
    }

    public Map<String, Player> getPlayers() {
        return players;
    }

    public Map<Object, String> getPlayerNamesAndIds() {
        Map<Object, String> output = new HashMap<>();
        for (String sessionId:players.keySet()) {
            output.put(players.get(sessionId).getPlayerId(), players.get(sessionId).getName());
        }
        return output;
    }
}
