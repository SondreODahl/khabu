package com.khabu.cardgame.controllers;


import com.khabu.cardgame.event.UserRepository;
import com.khabu.cardgame.model.Player;
import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.awt.print.PrinterIOException;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;


@RestController
public class ApiController {

    private PlayerRepository playerRepository;

    @Autowired
    public ApiController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }

    @RequestMapping(value="/api/player", method=RequestMethod.POST)
    public ResponseEntity<String> createPlayer(@RequestBody Map<String, Object> player, HttpServletRequest req) {
        String sessionId = req.getSession().getId();
        String playerName = (String) player.get("username");
        if (playerRepository.getPlayers().stream().anyMatch(p -> p.getName().equals(playerName))) {
            return ResponseEntity.status(HttpStatus.IM_USED).build();
        }
        if (playerRepository.getPlayers().size() <= 2) {
            Player newPlayer = new Player(playerName, sessionId);
            playerRepository.addPlayer(newPlayer);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

}
