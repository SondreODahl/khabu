package com.khabu.cardgame.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.JsonConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

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

    @MessageMapping("/topic/round/actions")
    public void receiveAction(@Payload String payload) {
        // Convert the payload to a hashmap
        HashMap<String, Object> jsonMap = JsonConverter.createMapFromJsonString(payload);

        switch ((String) jsonMap.get("action")) {
            case "REVEAL":
                revealCard(jsonMap);
                break;
            case "DRAW_FROM_DECK":
                drawFromDeck(jsonMap);
                break;
            case "DRAW_FROM_DISC":
                break;
            case "SWAP":
                break;
            case "DISCARD":
                break;
            case "PUT_OTHER":
                break;
            case "PUT_SELF":
                break;
            case "TRANSFER":
                break;
            case "CALL_KHABU":
                break;
            default: sendError(jsonMap);
        }
    }



    @MessageMapping("/round/flow")
    public void userReady(@Payload String payload) {
        // Retrieve data and server data
        int id = Integer.parseInt(payload);
        Game game = gameRepository.getGames().get(0);
        Player player = game.getPlayer(id);
        game.getRound().readyUp(player);
        Map<String, String> output = new HashMap<>();

        // JSON OBJECT MAPPER
        ObjectMapper objectMapper = new ObjectMapper();

        String jsonOutput = JsonConverter.createJsonString(objectMapper, output,
                "READY", Integer.toString(game.getRound().getPlayersReady()));
        // Send amount of players ready
        this.simpMessagingTemplate.convertAndSend("/topic/round/flow",
                jsonOutput);

        // Start game if all players ready
        if (game.getRound().getPlayersReady() == Game.getNumOfPlayers()) {
            output.clear();
            // Populate output with correct data
            output.put("type", "INITIALIZE");
            output.put("revealTime", Integer.toString(Game.REVEAL_TIME));
            output.put("startingHandSize", Integer.toString(game.getINIT_STARTING_HAND()));

            // Convert data to json
            try {
                jsonOutput = objectMapper.writeValueAsString(output);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            // Initializes the countdown and informs front-end the countdown has been initiated
            this.simpMessagingTemplate.convertAndSend("/topic/round/flow", jsonOutput);

            // Sends a message informing the client that the countdown is finished
            beginRound(objectMapper, output);
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


    // Initiates round
    private void beginRound(ObjectMapper objectMapper, Map<String, String> output) {
        Game game = this.gameRepository.getGames().get(0);
        Round round = game.getRound();
        Timer timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                // Get starting playerId and change jsonOutput to send a BEGIN message to client
                int playerId = game.getRound().getTurn().getCurrentPlayer().getPlayerId();
                String jsonOutput = JsonConverter.createJsonString(objectMapper, output, "BEGIN", Integer.toString(playerId));
                simpMessagingTemplate.convertAndSend("/topic/round/flow", jsonOutput);
                round.beginRound();
            }
        }; // Sets the time available for reveals
        timer.schedule(task, Game.REVEAL_TIME);
    }


    // ------------------------------
    // ACTION HANDLER METHODS
    // ------------------------------

    // Action receiver defaults to sending an error in case of faulty behaviour
    private void sendError(HashMap<String, Object> jsonMap) {
        Map<String, String> output = new HashMap<>();
        // TODO: Fix a better errorMsg
        String errorMsg = "Something went wrong";
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), output, "ERROR", errorMsg);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    // Handles request from a player to reveal one of his/her cards
    private void revealCard(HashMap<String, Object> jsonMap) {
        // Retrieve info from client json
        int playerId = Integer.parseInt((String) jsonMap.get("playerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("index"));
        Round round = gameRepository.getGames().get(0).getRound();

        // Create response
        Map<String, String> response = new HashMap<>();
        response.put("type", "REVEAL");
        Card revealedCard = null;
        try {
            revealedCard = round.revealCard(round.getPlayers()[playerId], targetCardIndex);
            response.put("status", "SUCCESS");
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
            response.put("status", "FAIL");
        }

        response.put("value", Integer.toString(revealedCard.getValue()));
        response.put("id", Integer.toString(targetCardIndex));

        // Convert response to json
        String jsonResponse = "";
        try {
            jsonResponse = new ObjectMapper().writeValueAsString(response);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        // Send json response back to player
        simpMessagingTemplate.convertAndSend("/topic/round/actions/" + Integer.toString(playerId), jsonResponse);
    }

    private void drawFromDeck(HashMap<String, Object> jsonMap) {

    }

}
