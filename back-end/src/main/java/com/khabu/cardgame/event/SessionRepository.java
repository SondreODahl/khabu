package com.khabu.cardgame.event;

import com.khabu.cardgame.model.User;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionRepository {
    private Map<String, User> activeSessions = new ConcurrentHashMap<>();

    public void removeSession(String sessionId) {
        activeSessions.remove(sessionId);
    }

    public void addSession(String sessionId, User user) {
        activeSessions.put(sessionId, user);
    }

    public User getUser(String sessionId) {
        return activeSessions.get(sessionId);
    }


}
