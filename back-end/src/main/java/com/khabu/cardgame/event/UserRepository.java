package com.khabu.cardgame.event;

import com.khabu.cardgame.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserRepository {

    private List<User> activeUserSessions = new ArrayList<>();
    private List<User> playersReadiedUp = new ArrayList<>();

    public void add(User user) {
        activeUserSessions.add(user);
    }

    public User getParticipant(User user) {
        return activeUserSessions.get(activeUserSessions.indexOf(user));
    }

    public User getParticipantByIndex(int index) {
        return activeUserSessions.get(index);
    }

    public User getParticipantByName(String userName) {
        return activeUserSessions.stream().filter(u -> u.getName().equals(userName)).findFirst().get();
    }


    public void removeParticipant(User user) {
        activeUserSessions.remove(user);
    }

    public void removeParticipantByName(String userName) {
        activeUserSessions.removeIf(user -> user.getName().equals(userName));
    }

    public List<User> getActiveUserSessions() {
        return activeUserSessions;
    }

    public void setActiveUserSessions(List<User> activeUserSessions) {
        this.activeUserSessions = activeUserSessions;
    }

    public void addReadyPlayer(User user) {
        playersReadiedUp.add(user);
    }

    public void removeUnreadiedPlayer(User user) {
        playersReadiedUp.remove(user);
    }

    public int getNumberOfPlayersReadiedUp() {
        return playersReadiedUp.size();
    }
}
