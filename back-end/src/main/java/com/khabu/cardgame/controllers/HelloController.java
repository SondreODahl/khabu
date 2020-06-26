package com.khabu.cardgame.controllers;


import com.khabu.cardgame.event.UserRepository;
import com.khabu.cardgame.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.awt.print.PrinterIOException;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;


//@CrossOrigin(origins="http://localhost:3000") // To have it class-wide
@RestController
public class HelloController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private UserRepository userRepository;

    @Autowired
    public HelloController(SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
    }

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
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

//    private MessageHeaders createHeaders(String sessionId) {
//        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
//        headers.setSessionId(sessionId);
//        headers.setLeaveMutable(true);
//        return headers.getMessageHeaders();
//    }



}
