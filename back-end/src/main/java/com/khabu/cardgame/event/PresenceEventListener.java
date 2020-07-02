package com.khabu.cardgame.event;

import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.*;


// Handles connection and disconnection events.

@Service
public class PresenceEventListener {

    private SimpMessagingTemplate messagingTemplate;
    private PlayerRepository playerRepository;
    private UserRepository userRepository;
    private SessionRepository sessionRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate,
                                 UserRepository userRepository,
                                 SessionRepository sessionRepository,
                                 PlayerRepository playerRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.playerRepository = playerRepository;
    }


    // TODO: Create user from cookie/prev session
    @EventListener
    public void handleSessionConnected(SessionConnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());

        // Retrieve session variables
        String sessionId = headers.getSessionId();
        String userName = headers.getUser().getName();

        System.out.println(userName);

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

        // Remove from ready/active players on disconnect
        if (userRepository.isPlayerReady(user)) {
            userRepository.removeUnreadiedPlayer(user);
        }
        if (playerRepository.getPlayers().stream().anyMatch(p -> p.getSessionId().equals(sessionId))) {
            playerRepository.removePlayerBySessionId(sessionId);
        }

        // Remove session
        userRepository.removeParticipantByName(userName);
        sessionRepository.removeSession(sessionId);
    }


    // TODO: Send a message to /topic/ready updating ready player count
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
