package com.khabu.cardgame.controllers;

import com.khabu.cardgame.event.UserRepository;
import com.khabu.cardgame.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;

// Handles websocket interaction

@RestController
public class GameStartController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private UserRepository userRepository;

    @Autowired
    public GameStartController(SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
    }

    @MessageMapping("/greeting")
    public void greet(String greeting) {
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        String text = "[" + time + "]" + "Hello" + greeting;
        this.simpMessagingTemplate.convertAndSend("/topic/greeting", text);
    }

    @MessageMapping("/great")
    @SendToUser("/queue/great")
    public String great(String text, Principal principal) {
        String user = principal.getName();
        System.out.println(user);
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        return "[" + time + "]" + "Hello" + text;
    }

    @MessageMapping("/ready")
    public void userReady(@Payload String message, Principal principal) {
        User user = userRepository.getParticipantByName(principal.getName());
        if (message.equals("true")) {
            user.setReady(true);
            userRepository.addReadyPlayer(user);
        } else {
            user.setReady(false);
            userRepository.removeUnreadiedPlayer(user);
        }
        this.simpMessagingTemplate.convertAndSend("/topic/ready",
                Integer.toString(userRepository.getNumberOfPlayersReadiedUp()));
    }


//  Might need this for session-control later
//    private MessageHeaders createHeaders(String sessionId) {
//        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
//        headers.setSessionId(sessionId);
//        headers.setLeaveMutable(true);
//        return headers.getMessageHeaders();
//    }
}
