package com.khabu.cardgame.model;

import com.khabu.cardgame.model.game.Player;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PlayerRepository {
    private List<Player> players = new ArrayList<>();
    public static int PLAYER_COUNT = 0;

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void removePlayer(Player player) {
        players.remove(player);
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

    public void removePlayerByUsername(String userName) {
        players.removeIf(p -> p.getName().equals(userName));
    }

    public List<Player> getPlayers() {
        return players;
    }
}
