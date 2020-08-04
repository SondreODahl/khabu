package com.khabu.cardgame.gameutil;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.model.game.effect.Effect;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.JsonConverter;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
// Handles all game logic related to effects
// Each public method should return a String containing the correct response for the client(s)
public class GameEffectHandler {
    public static String handleActivateEffect(HashMap<String, Object> jsonMap, Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        try {
            round.performEffect(round.getPlayerById(currentPlayerId), 0, Effect.ACTIVATE_EFFECT);
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), "ACTIVATE_EFFECT");
    }

    public static String handleFinishEffect(HashMap<String, Object> jsonMap, Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        if (round.getTurn().getCurrentPlayer() != round.getPlayerById(currentPlayerId)) {
            return "fail";
        }
        if (jsonMap.get("swap").equals("true")) {
            exchangeCardsAfterChecking(jsonMap, round);
        }
        // Create response
        List<String> keys = Arrays.asList("type", "swap");
        List<String> values = Arrays.asList("FINISH_EFFECT", (String) jsonMap.get("swap"));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }


    public static String handlePrivateResponseCheckSelfCard(HashMap<String, Object> jsonMap, Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));
        int targetCardValue = round.getPlayerById(currentPlayerId).getCard(targetIndex).getValue();

        try {
            round.performEffect(round.getPlayerById(currentPlayerId), targetIndex, Effect.CHECK_SELF_CARD);
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }

        // Create response
        List<String> keys = Arrays.asList("type","playerId", "targetCardIndex", "value");
        List<String> values = Arrays.asList("SELF_CHECK", Integer.toString(currentPlayerId), Integer.toString(targetIndex),
                Integer.toString(targetCardValue));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePublicResponseCheckSelfCard(HashMap<String, Object> jsonMap) {
        List<String> keys = Arrays.asList("type","targetCardIndex");
        List<String> values = Arrays.asList("PLAYER_CHECK_SELF", (String) jsonMap.get("targetCardIndex"));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePrivateResponseCheckOpponentCard(HashMap<String, Object> jsonMap, Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetIndex = Integer.parseInt((String) jsonMap.get("targetCardIndex"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardValue = round.getPlayerById(targetPlayerId).getCard(targetIndex).getValue();

        try {
            round.performEffect(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(targetPlayerId), targetIndex, Effect.CHECK_OTHER_CARD);
        } catch(IllegalMoveException ime) {
            ime.printStackTrace();
        }

        List<String> keys = Arrays.asList("type","agent", "victim", "victimCard", "value");
        List<String> values = Arrays.asList("OPPONENT_CHECK",Integer.toString(currentPlayerId),
                Integer.toString(targetPlayerId), Integer.toString(targetIndex),
                Integer.toString(targetCardValue));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePublicResponseCheckOpponentCard(HashMap<String, Object> jsonMap) {
        List<String> keys = Arrays.asList("type", "targetPlayerId","targetCardIndex");
        List<String> values = Arrays.asList("PLAYER_CHECK_OPPONENT",
                (String) jsonMap.get("targetPlayerId"),
                (String) jsonMap.get("targetCardIndex"));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }




    private static void exchangeCardsAfterChecking(HashMap<String, Object> jsonMap, Round round) {
        try {
            int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
            round.performEffect(round.getPlayerById(currentPlayerId), 0, Effect.EXCHANGE_AFTER_CHECKS);
            // TODO: ALSO CLEAR TEMPS ON NORMAL EXCHANGE CARD
            // Clear variables set to handle effect in effectPerformer
            round.clearTemps();
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }
    }
}
