package com.khabu.cardgame.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Optional;

@Service
public class PresenceEventListener {

    private SimpMessagingTemplate messagingTemplate;
    private UserRepository userRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    private void handleSessionConnected(SessionConnectEvent event) {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String user = headers.getUser().getName();
        System.out.printf("%s has connected", user);
        messagingTemplate.convertAndSend("/queue/greeting", user);
    }

    @EventListener
    private void handleSessionDisconnect(SessionDisconnectEvent event) {

        Optional.ofNullable(userRepository.getParticipant(event.getSessionId()))
                .ifPresent(login -> {
                    messagingTemplate.convertAndSend("/topic/greeting", new LogoutEvent(login.getUsername()));
                    userRepository.removeParticipant(event.getSessionId());
                });
    }

}
