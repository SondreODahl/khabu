package com.khabu.cardgame.event;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class UserRepository {

    private Map<String, LoginEvent> activeUserSessions = new ConcurrentHashMap<>();

    public void add(String sessionId, LoginEvent event) {
        activeUserSessions.put(sessionId, event);
    }

    public LoginEvent getParticipant(String sessionId) {
        return activeUserSessions.get(sessionId);
    }

    public void removeParticipant(String sessionId) {
        activeUserSessions.remove(sessionId);
    }

    public Map<String, LoginEvent> getActiveUserSessions() {
        return activeUserSessions;
    }

    public void setActiveUserSessions(Map<String, LoginEvent> activeUserSessions) {
        this.activeUserSessions = activeUserSessions;
    }
}
