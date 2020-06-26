package com.khabu.cardgame.event;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class UserRepository {

    private List<String> activeUserSessions = new ArrayList<>();

    public void add(String sessionId) {
        activeUserSessions.add(sessionId);
    }

    public String getParticipant(String sessionId) {
        return activeUserSessions.get(activeUserSessions.indexOf(sessionId));
    }
    public String getParticipantByIndex(int index) {
        return activeUserSessions.get(index);
    }

    public void removeParticipant(String sessionId) {
        activeUserSessions.remove(sessionId);
    }

    public List<String> getActiveUserSessions() {
        return activeUserSessions;
    }

    public void setActiveUserSessions(List<String> activeUserSessions) {
        this.activeUserSessions = activeUserSessions;
    }
}
