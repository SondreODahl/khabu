package com.khabu.cardgame.gameutil;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.effect.Effect;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.JsonConverter;

import java.util.HashMap;

public class GameEffectHandler {
    public static String handleActivateEffect(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        try {
            round.performEffect(round.getPlayerById(currentPlayerId), 0, Effect.ACTIVATE_EFFECT);
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), "ACTIVATE_EFFECT");
    }

    public static String handleFinishEffect() {
        return "";
    }

    public static String handleCheckSelfCard() {
        return "";
    }

    public static String handleCheckOpponentCard() {
        return "";
    }

    public static String handleExchangeCards() {
        return "";
    }

    public static String handleCheckTwoCards() {
        return "";
    }
}
