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



    private static void exchangeCardsAfterChecking(HashMap<String, Object> jsonMap, Round round) {
        try {
            int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
            round.performEffect(round.getPlayerById(currentPlayerId), 0, Effect.EXCHANGE_AFTER_CHECKS);

            // Clear variables set to handle effect in effectPerformer
            round.clearTemps();
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }
    }
}
