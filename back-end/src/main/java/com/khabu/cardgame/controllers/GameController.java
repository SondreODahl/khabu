package com.khabu.cardgame.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class GameController {

    private PlayerRepository playerRepository;
    private SimpMessagingTemplate simpMessagingTemplate;
    private GameRepository gameRepository;

    @Autowired
    public GameController(PlayerRepository playerRepository, SimpMessagingTemplate simpMessagingTemplate, GameRepository gameRepository) {
        this.playerRepository = playerRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.gameRepository = gameRepository;
    }


    @MessageMapping("/ready")
    public void userReady(@Payload String payload) {
        // Retrieve data and server data
        int id = Integer.parseInt(payload);
        Game game = gameRepository.getGames().get(0);
        Player player = game.getPlayer(id);
        game.getRound().readyUp(player);

        // Send amount of players ready
        this.simpMessagingTemplate.convertAndSend("/topic/ready",
                Integer.toString(game.getRound().getPlayersReady()));

        // Start game if all players ready
        if (game.getRound().getPlayersReady() == Game.getNumOfPlayers()) {
            game.getRound().beginRound();
            // Store response to notify client that game can start
            Map<String, String> output = new HashMap<>();
            output.put("type", "INITIALIZE");
            output.put("time", Integer.toString(Game.REVEAL_TIME));
            String jsonOutput = "";

            //Convert to json
            try {
                jsonOutput = new ObjectMapper().writeValueAsString(output);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            this.simpMessagingTemplate.convertAndSend("/topic/ready", jsonOutput);
        }
    }

    // TODO: Implement game startup method (Might to this in another controller)
    // TODO: Implement /round/actions/playerId with responses to drawing

    // Method should send back an updated list of players
    @MessageMapping("/game/flow")
    public void playerInfo(@Payload String playerJoining) {
        Map<String, String> output = new HashMap<>();
        int playerId = Integer.parseInt(playerJoining);
        Game game = gameRepository.getGames().get(0);
        String capacityReached = game.getPlayers().length == Game.getNumOfPlayers() ? "true" : "false";
        output.put("type", "PLAYER_JOINED");
        output.put("playerId", Integer.toString(playerId));
        output.put("playerName", game.getPlayer(playerId).getName());
        output.put("capacityReached", capacityReached);
        String jsonOutput = "";

        //Convert object to json string
        try {
            jsonOutput = new ObjectMapper().writeValueAsString(output);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        this.simpMessagingTemplate.convertAndSend("/topic/game/flow", jsonOutput);
    }


}
