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


// Handles connection and disconnection events.

@Service
public class PresenceEventListener {

    private SimpMessagingTemplate messagingTemplate;
    private UserRepository userRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }


    // TODO: Create user from cookie/prev session
    @EventListener
    private void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String userName = headers.getUser().getName();
        User user = new User(userName);
        userRepository.add(user);
    }

    @EventListener
    private void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String userName = headers.getUser().getName();
        userRepository.removeUnreadiedPlayer(userRepository.getParticipantByName(userName));
        userRepository.removeParticipantByName(userName);
    }

    @EventListener
    private void handleSessionSubscribe(SessionSubscribeEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        System.out.println(headerAccessor.getSessionAttributes().get("sessionId").toString());
    }


}
