package com.khabu.cardgame.controllers;

import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

// Handles websocket interaction

@Order(1)
@RestController
public class GameStartController {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private GameRepository gameRepository;

    @Autowired
    public GameStartController(SimpMessagingTemplate simpMessagingTemplate,
                               GameRepository gameRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.gameRepository = gameRepository;
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
    public void userReady(@Payload Map<String, Object> payload) {
        int id = Integer.parseInt((String) payload.get("id"));
        Game game = gameRepository.getGames().get(0);
        Player player = game.getPlayers()[id-1];
        game.getRound().readyUp(player);
        this.simpMessagingTemplate.convertAndSend("/topic/ready",
                Integer.toString(game.getRound().getPlayersReady()));
    }


//  Might need this for session-control later
//    private MessageHeaders createHeaders(String sessionId) {
//        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
//        headers.setSessionId(sessionId);
//        headers.setLeaveMutable(true);
//        return headers.getMessageHeaders();
//    }
}
