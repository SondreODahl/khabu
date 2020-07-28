package com.khabu.cardgame.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.action.Actions;
import com.khabu.cardgame.model.game.card.Card;

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
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                "CARD_DRAWN_DECK", Integer.toString(cardValue));
    }


    public static String handleDrawFromDiscard(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DRAW_FROM_DISC, targetCardIndex);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                "DISC", Integer.toString(cardValue), Integer.toString(targetCardIndex));
    }


    public static String handleSwap(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id and the target card
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.SWAP, targetCardIndex);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                "SWAP", Integer.toString(cardValue), Integer.toString(targetCardIndex));
    }


    public static String handleDiscard(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve id
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.DISCARD);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int cardValue = round.getDiscardPile().showTopCard().getValue();

        // Create response
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(),
                "DISCARD", Integer.toString(cardValue));
    }


    public static String handleEndTurn(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve the current player
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
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
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }


    public static String handleKhabuCall(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve currentPlayer
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));

        // Perform back-end game logic
        try {
            round.performAction(round.getPlayerById(currentPlayerId), Actions.CALL_KHABU);
        } catch (IllegalMoveException e) {
            e.printStackTrace();
        }
        int nextPlayerId = round.getTurn().getCurrentPlayer().getPlayerId();

        // Create response
        List<String> keys = Arrays.asList("type","nextPlayer");
        List<String> values = Arrays.asList("TRANSFER",Integer.toString(nextPlayerId));

       return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }


    public static String handleTransfer(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve the player transferring a card,
        // the card being transferred and the target of the transfer
        int transferringPlayerId = Integer.parseInt((String) jsonMap.get("transferringPlayerId"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
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

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }
    public static String handlePutOther(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
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
        return createPutResponse(currentPlayerId, targetPlayerId, targetCard, targetCardIndex, status);

    }
    public static String handlePutSelf(HashMap<String, Object> jsonMap, Round round) {
        // Retrieve puttingPlayerId and targetPlayerId and targetCardindex
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetCardIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));

        // Perform back-end game logic
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
        return createPutResponse(currentPlayerId, currentPlayerId, targetCard, targetCardIndex, status);
    }

    private static String createPutResponse(int currentPlayerId, int victimPlayerId, Card targetCard, int targetCardIndex, String status) {
        List<String> names = Arrays.asList("type","agent","victim","victimCard", "status", "value");
        List<String> values = Arrays.asList("PUT",Integer.toString(currentPlayerId),
                Integer.toString(victimPlayerId), Integer.toString(targetCardIndex),
                status, Integer.toString(targetCard.getValue()));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), names, values);
    }


}
