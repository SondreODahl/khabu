package com.khabu.cardgame.controllers;


import com.khabu.cardgame.model.Player;
import com.khabu.cardgame.model.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
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
        // GET ATTRIBUTES
        String sessionId = req.getSession().getId();
        String playerName = (String) player.get("username");

        // VALIDATE AND CREATE
        if (playerRepository.getPlayers().stream().anyMatch(p -> p.getName().equals(playerName))) {
            return ResponseEntity.status(HttpStatus.IM_USED).build();
        }
        if (playerRepository.getPlayers().size() <= 2) {
            Player newPlayer = new Player(playerName, sessionId);
            playerRepository.addPlayer(newPlayer);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }

        // ERROR
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

}
