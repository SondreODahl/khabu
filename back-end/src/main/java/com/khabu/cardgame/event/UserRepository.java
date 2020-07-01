package com.khabu.cardgame.event;

import com.khabu.cardgame.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

// TODO: Create separate class to keep control of players and ready state

@Component
public class UserRepository {

    private List<User> activeUserSessions = new ArrayList<>();
    private List<User> playersReadiedUp = new ArrayList<>();


    // ---------------------------------------------
    // THIS SECTION HANDLES THE ACTIVE USER SESSIONS
    // ---------------------------------------------
    public void add(User user) {
        activeUserSessions.add(user);
    }

    public User getParticipantByName(String userName) {
        return activeUserSessions.stream().filter(u -> u.getName().equals(userName)).findFirst().get();
    }

    public void removeParticipantByName(String userName) {
        activeUserSessions.removeIf(user -> user.getName().equals(userName));
    }
    
    // ---------------------------------
    // HANDLES THE LIST OF READY PLAYERS
    // ---------------------------------
    public void addReadyPlayer(User user) {
        playersReadiedUp.add(user);
    }

    public void removeUnreadiedPlayer(User user) {
        playersReadiedUp.remove(user);
    }

    public int getNumberOfPlayersReadiedUp() {
        return playersReadiedUp.size();
    }

    public boolean isPlayerReady(User user) {
        return playersReadiedUp.contains(user);
    }
}
