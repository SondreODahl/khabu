package com.khabu.cardgame.event;

import com.khabu.cardgame.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;


// Handles connection and disconnection events.

@Service
public class PresenceEventListener {

    private SimpMessagingTemplate messagingTemplate;
    private UserRepository userRepository;
    private SessionRepository sessionRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate, UserRepository userRepository, SessionRepository sessionRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }


    // TODO: Create user from cookie/prev session
    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());

        // Retrieve session variables
        String sessionId = headers.getSessionId();
        String userName = headers.getUser().getName();

        // Create new user and add user + session
        User user = new User(userName);
        userRepository.add(user);
        sessionRepository.addSession(sessionId, user);
    }

    // TODO: Find a better way to remove sessions when inactive for a long time
    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());

        // Retrieve session variables
        String sessionId = headers.getSessionId();
        String userName = headers.getUser().getName();
        User user = userRepository.getParticipantByName(userName);

        // Remove from ready players on disconnect
        if (userRepository.isPlayerReady(user)) {
            userRepository.removeUnreadiedPlayer(user);
        }

        // Remove session
        userRepository.removeParticipantByName(userName);
        sessionRepository.removeSession(sessionId);
    }

    @EventListener
    public void handleSessionUnsubscribe(SessionUnsubscribeEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());

        // Retrieve session variables
        String sessionId = headers.getSessionId();
        User user = sessionRepository.getUser(sessionId);

        // Remove from ready players
        if (userRepository.isPlayerReady(user)) {
            userRepository.removeUnreadiedPlayer(user);
        }
    }
}