package com.khabu.cardgame.controllers;

import com.khabu.cardgame.model.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GameController {

    PlayerRepository playerRepository;

    @Autowired
    public GameController(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    // TODO: Implement game startup method (Might to this in another controller)
    // TODO: Implement /round/actions/playerId with responses to drawing

    // Method should send back an updated list of players
    @MessageMapping("/game/flow")
    public PlayerRepository playerInfo() {
        return playerRepository;
    }


}
