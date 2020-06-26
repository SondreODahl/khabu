package com.khabu.cardgame.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectedEvent;


@Service
public class PresenceEventListener {

    private SimpMessagingTemplate messagingTemplate;
    private UserRepository userRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }


    @EventListener
    private void handleSessionConnected(SessionConnectedEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
        String user = headers.getSessionId();
        String userName = headers.getUser().getName();
        System.out.printf("%s has this name \n", userName);
        userRepository.add(user);
        System.out.printf("%s has connected \n", user);
        System.out.println(userRepository.getActiveUserSessions());
    }


}
