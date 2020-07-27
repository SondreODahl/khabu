package com.khabu.cardgame.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.JsonConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

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

    @MessageMapping("/round/actions")
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
                drawFromDisc(jsonMap);
                break;
            case "SWAP":
                swapCard(jsonMap);
                break;
            case "DISCARD":
                discardCard(jsonMap);
                break;
            case "PUT_OTHER":
                putOther(jsonMap);
                break;
            case "PUT_SELF":
                putSelf(jsonMap);
                break;
            case "TRANSFER":
                transferCard(jsonMap);
                break;
            case "CALL_KHABU":
                callKhabu(jsonMap);
                break;
            case "END_TURN":
                endTurn(jsonMap);
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
        round.beginRound();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                // Get starting playerId and change jsonOutput to send a BEGIN message to client
                int playerId = game.getRound().getTurn().getCurrentPlayer().getPlayerId();
                String jsonOutput = JsonConverter.createJsonString(objectMapper, output, "BEGIN", Integer.toString(playerId));
                simpMessagingTemplate.convertAndSend("/topic/round/flow", jsonOutput);
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
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));
        Round round = gameRepository.getGames().get(0).getRound();

        // Create response
        Map<String, String> response = new HashMap<>();
        response.put("type", "REVEAL");
        Card revealedCard = null;
        try {
            revealedCard = round.revealCard(round.getPlayerById(playerId), targetCardIndex);
            response.put("status", "SUCCESS");
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
            response.put("status", "FAIL");
        }

        response.put("value", Integer.toString(Objects.requireNonNull(revealedCard).getValue()));
        response.put("id", Integer.toString(targetCardIndex));
        response.put("playerId", Integer.toString(playerId));

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
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        Round round = gameRepository.getGames().get(0).getRound();
        int cardValue = 0;
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DRAW_FROM_DECK);
            cardValue = round.getCardDrawnFromDeck().getValue();
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        Map<String, String> response = new HashMap<>();
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response,
                "CARD_DRAWN_DECK", Integer.toString(cardValue));
        simpMessagingTemplate.convertAndSend("/topic/round/actions/" + Integer.toString(currentPlayerId), jsonResponse);
        jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response,
                "DECK");
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void drawFromDisc(HashMap<String, Object> jsonMap) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end logic
        Round round = gameRepository.getGames().get(0).getRound();
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DRAW_FROM_DISC, targetCardIndex);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        Map<String, String> response = new HashMap<>();
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response,
                "DISC", Integer.toString(cardValue), Integer.toString(targetCardIndex));
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void swapCard(HashMap<String, Object> jsonMap) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.SWAP, targetCardIndex);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        Map<String, String> response = new HashMap<>();
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response,
                "SWAP", Integer.toString(cardValue), Integer.toString(targetCardIndex));
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void discardCard(HashMap<String, Object> jsonMap) {
        // Retrieve id
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DISCARD);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                "DISCARD", Integer.toString(cardValue));
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void endTurn(HashMap<String, Object> jsonMap) {
        // Retrieve the current player
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.END_TURN);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int nextPlayer = round.getTurn().getCurrentPlayer().getPlayerId();
        // Started boolean gets set to false when round.endRound() is called
        String roundOver = round.getStarted() ? "false" : "true";
        // Keys and values for response
        List<String> keys = Arrays.asList("type", "nextPlayer", "roundOver");
        List<String> values = Arrays.asList("END_TURN", Integer.toString(nextPlayer), roundOver);

        // Create response and send it
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);

    }

    private void callKhabu(HashMap<String, Object> jsonMap) {
        // Retrieve currentPlayer
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.CALL_KHABU);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int nextPlayerId = round.getTurn().getCurrentPlayer().getPlayerId();

        // Create response
        List<String> keys = Arrays.asList("type","nextPlayer");
        List<String> values = Arrays.asList("TRANSFER",Integer.toString(nextPlayerId));

        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);

    }

    private void transferCard(HashMap<String, Object> jsonMap) {
        // Retrieve the player transferring a card,
        // the card being transferred and the target of the transfer
        int transferringPlayerId = Integer.parseInt((String) jsonMap.get("transferringPlayerId"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        Card targetCard = round.getPlayerById(transferringPlayerId).getCard(targetCardIndex);
        try {
            round.performAction(round.getPlayerById(transferringPlayerId), round.getPlayerById(targetPlayerId),
                    Actions.TRANSFER, targetCardIndex);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardIndexAfterTransfer = round.getPlayerById(targetPlayerId).findCardIndexbyCard(targetCard);

        // Create response
        List<String> keys = Arrays.asList("type","victim","agentCard");
        List<String> values = Arrays.asList("TRANSFER",Integer.toString(targetPlayerId),
                Integer.toString(cardIndexAfterTransfer));

        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void putOther(HashMap<String, Object> jsonMap) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        Card targetCard = round.getPlayerById(targetPlayerId).getCard(targetCardIndex);
        String status = "";
        try {
            round.performAction(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(targetPlayerId), Actions.PUT_OTHER, targetCardIndex);
            status = "success";
        } catch (IllegalMoveException e) {
            e.printStackTrace();
            status = "fail";
        }

        // Create response
        Map<String, String> response = new HashMap<>();
        List<String> keys = Arrays.asList("type","agent","victim","victimCard", "status", "value");
        List<String> values = Arrays.asList("PUT",Integer.toString(currentPlayerId),
                Integer.toString(targetPlayerId), Integer.toString(targetCardIndex),
                status, Integer.toString(targetCard.getValue()));
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response, keys, values);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }

    private void putSelf(HashMap<String, Object> jsonMap) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Round round = gameRepository.getGames().get(0).getRound();
        Card targetCard = round.getPlayerById(currentPlayerId).getCard(targetCardIndex);
        boolean successfulPut = false;
        String status = "";
        try {
            round.performAction(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(currentPlayerId), Actions.PUT_SELF, targetCardIndex);
            status = "success";
        } catch (IllegalMoveException e) {
            e.printStackTrace();
            status = "fail";
        }

        // Create response
        Map<String, String> response = new HashMap<>();
        // Keys and values
        List<String> names = Arrays.asList("type","agent","victim","victimCard", "status", "value");
        List<String> values = Arrays.asList("PUT",Integer.toString(currentPlayerId),
                Integer.toString(currentPlayerId), Integer.toString(targetCardIndex),
                status, Integer.toString(targetCard.getValue()));
        String jsonResponse = JsonConverter.createJsonString(new ObjectMapper(), response, names, values);
        simpMessagingTemplate.convertAndSend("/topic/round/actions", jsonResponse);
    }
}
