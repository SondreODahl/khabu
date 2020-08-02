package com.khabu.cardgame.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.Card;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.*;

// Contains a handler method for each game action to be executed from the controller
public class GameHandler {
    public static String handleReveal(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve info from client json
        int playerId = Integer.parseInt((String) jsonMap.get("playerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Create response
        Map<String, String> response = new HashMap<>();
        response.put("type", "REVEAL");
        Card revealedCard = null;
        try {
            revealedCard = round.revealCard(round.getPlayerById(playerId), targetCardIndex);
            response.put("status", "SUCCESS");
        } catch (Exception ex) {
            ex.printStackTrace();
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
        return jsonResponse;
    }


    public static String handleDrawFromDeck(HashMap<String, Object> jsonMap, Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int cardValue = 0;
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DRAW_FROM_DECK);
            cardValue = round.getCardDrawnFromDeck().getValue();
            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                    "CARD_DRAWN_DECK", Integer.toString(cardValue));
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleDrawFromDiscard(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DRAW_FROM_DISC, targetCardIndex);
            int cardValue = round.getDiscardPile().showTopCard().getValue();

            // Create response
            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                    "DISC", Integer.toString(cardValue), Integer.toString(targetCardIndex));
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleSwap(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.SWAP, targetCardIndex);
            int cardValue = round.getDiscardPile().showTopCard().getValue();

            // Create response
            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                    "SWAP", Integer.toString(cardValue), Integer.toString(targetCardIndex));
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleDiscard(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DISCARD);
            int cardValue = round.getDiscardPile().showTopCard().getValue();

            // Create response
            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                    "DISCARD", Integer.toString(cardValue));
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleEndTurn(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve the current player
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.END_TURN);
            int nextPlayer = round.getTurn().getCurrentPlayer().getPlayerId();
            // Started boolean gets set to false when round.endRound() is called
            String roundOver = round.getStarted() ? "false" : "true";
            // Keys and values for response
            List<String> keys = Arrays.asList("type", "nextPlayer", "roundOver");
            List<String> values = Arrays.asList("END_TURN", Integer.toString(nextPlayer), roundOver);

            // Create response and send it
            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleKhabuCall(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve currentPlayer
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.CALL_KHABU);
            int nextPlayerId = round.getTurn().getCurrentPlayer().getPlayerId();

            // Create response
            List<String> keys = Arrays.asList("type","nextPlayer");
            List<String> values = Arrays.asList("TRANSFER",Integer.toString(nextPlayerId));

            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }


    public static String handleTransfer(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve the player transferring a card,
        // the card being transferred and the target of the transfer
        int transferringPlayerId = Integer.parseInt((String) jsonMap.get("transferringPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Card targetCard = round.getPlayerById(transferringPlayerId).getCard(targetCardIndex);
        Player targetPlayer = round.getTransferTarget();
        try {
            round.performAction(round.getPlayerById(transferringPlayerId), targetPlayer,
                    Actions.TRANSFER, targetCardIndex);
            int cardIndexAfterTransfer = targetPlayer.findCardIndexbyCard(targetCard);

            // Create response
            List<String> keys = Arrays.asList("type","victim","victimCardIndex", "agentCardIndex");
            List<String> values = Arrays.asList("TRANSFER",Integer.toString(targetPlayer.getPlayerId()),
                    Integer.toString(cardIndexAfterTransfer), Integer.toString(targetCardIndex));

            return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }
    public static String handlePutOther(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("puttingPlayerId"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Card targetCard = round.getPlayerById(targetPlayerId).getCard(targetCardIndex);
        String status;
        try {
            boolean success = round.performAction(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(targetPlayerId), Actions.PUT_OTHER, targetCardIndex);
            status = success ? "success" : "fail";

            // Create response
            return createPutResponse(currentPlayerId, targetPlayerId, targetCard, targetCardIndex, status);
        } catch (IllegalMoveException e) {
            return "fail";
        }


    }
    public static String handlePutSelf(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("puttingPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        Card targetCard = round.getPlayerById(currentPlayerId).getCard(targetCardIndex);
        boolean successfulPut = false;
        String status;
        try {
            boolean success = round.performAction(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(currentPlayerId), Actions.PUT_SELF, targetCardIndex);
            status = success ? "success" : "fail";

            // Create response
            return createPutResponse(currentPlayerId, currentPlayerId, targetCard, targetCardIndex, status);
        } catch (IllegalMoveException e) {
            return "fail";
        }

    }

    private static String createPutResponse(int currentPlayerId, int victimPlayerId, Card targetCard, int targetCardIndex, String status) {
        List<String> names = Arrays.asList("type","agent","victim","victimCard", "status", "value");
        List<String> values = Arrays.asList("PUT",Integer.toString(currentPlayerId),
                Integer.toString(victimPlayerId), Integer.toString(targetCardIndex),
                status, Integer.toString(targetCard.getValue()));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), names, values);
    }

    public static String createEndGameResponse(Round round) {
        Map<String, Object> data = new HashMap<>();
        data.put("type", "END");
        Map<String, Object> players = new HashMap<>();
        List<Integer> cardValues = new ArrayList<>();
        Map<String, Object> playerData = new HashMap<>();
        for (Player player: round.getPlayers()) {
            // Clear old data
            cardValues.clear();
            playerData.clear();

            // Add new data
            for (Card card:player.getCardHand().getCards().values()) {
                cardValues.add(card.getValue());
            }
            int score = player.calculateScore();
            playerData.put("score", score);
            playerData.put("cards", cardValues);
            players.put(player.getName(), playerData);
        }
        data.put("players", players);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = "";
        try {
            jsonResponse = objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonResponse;
    }


}
