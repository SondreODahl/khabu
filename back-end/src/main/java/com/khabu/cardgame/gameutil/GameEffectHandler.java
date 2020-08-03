package com.khabu.cardgame.gameutil;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.khabu.cardgame.model.game.Round;
import com.khabu.cardgame.model.game.action.Gamestate;
import com.khabu.cardgame.model.game.card.Card;
import com.khabu.cardgame.model.game.effect.Effect;
import com.khabu.cardgame.util.IllegalMoveException;
import com.khabu.cardgame.util.JsonConverter;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

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

    public static String handleFinishEffect(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        if (round.getTurn().getCurrentPlayer() != round.getPlayerById(currentPlayerId)) {
            return "fail";
        }
        if (jsonMap.get("swap").equals("true")) {
            exchangeCardsAfterChecking(jsonMap, round);
        }
        if (round.getTurn().gameStateEquals(Gamestate.KING_EFFECT)) {
            Gamestate gameState = round.getTurn().getCurrentPuttingPlayer() == null ? Gamestate.FRENZY : Gamestate.PUT;
            round.getTurn().setGameState(gameState);
        }

        List<String> keys = Arrays.asList("type", "swap");
        List<String> values = Arrays.asList("FINISH_EFFECT", (String) jsonMap.get("swap"));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePrivateCheckSelfCard(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetIndex = Integer.parseInt((String) jsonMap.get("targetIndex"));
        int targetCardValue = round.getPlayerById(currentPlayerId).getCard(targetIndex).getValue();

        try {
            round.performEffect(round.getPlayerById(currentPlayerId), targetIndex, Effect.CHECK_SELF_CARD);
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }

        // Create response
        List<String> keys = Arrays.asList("type","playerId", "value");
        List<String> values = Arrays.asList("SELF_CHECK",Integer.toString(currentPlayerId),
                Integer.toString(targetCardValue));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePublicCheckSelfCard(HashMap<String, Object> jsonMap) {
        List<String> keys = Arrays.asList("type","cardId");
        List<String> values = Arrays.asList("PLAYER_CHECK_SELF", (String) jsonMap.get("targetIndex"));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePrivateCheckOpponentCard(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetIndex = Integer.parseInt((String) jsonMap.get("targetIndex"));
        int targetPlayerId = Integer.parseInt((String) jsonMap.get("targetPlayerId"));
        int targetCardValue = round.getPlayerById(currentPlayerId).getCard(targetIndex).getValue();

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

    public static String handlePublicCheckOpponentCard(HashMap<String, Object> jsonMap) {
        List<String> keys = Arrays.asList("type", "targetPlayer","cardId");
        List<String> values = Arrays.asList("PLAYER_CHECK_OPPONENT",
                (String) jsonMap.get("targetPlayerId"),
                (String) jsonMap.get("targetIndex"));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handleExchangeCards(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetOneId = Integer.parseInt((String) jsonMap.get("targetOneId"));
        int targetOneIndex = Integer.parseInt((String) jsonMap.get("targetOneIndex"));
        int targetTwoId = Integer.parseInt((String) jsonMap.get("targetTwoId"));
        int targetTwoIndex = Integer.parseInt((String) jsonMap.get("targetTwoIndex"));

        try {
            round.performEffect(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(targetOneId), round.getPlayerById(targetTwoId),
                    Effect.EXCHANGE_CARDS, targetOneIndex, targetTwoIndex);
        } catch(IllegalMoveException ime) {
            ime.printStackTrace();
        }

        List<String> keys = Arrays.asList("type","victimOne", "cardOne", "victimTwo", "cardTwo");
        List<String> values = Arrays.asList("EXCHANGE_CARDS",Integer.toString(targetOneId),
                Integer.toString(targetOneIndex), Integer.toString(targetTwoId),
                Integer.toString(targetTwoIndex));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePrivateCheckTwoCards(HashMap<String, Object> jsonMap,Round round) {
        int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
        int targetOneId = Integer.parseInt((String) jsonMap.get("targetOneId"));
        int targetOneIndex = Integer.parseInt((String) jsonMap.get("targetOneIndex"));
        Card cardOne = round.getPlayerById(targetOneId).getCard(targetOneIndex);

        int targetTwoId = Integer.parseInt((String) jsonMap.get("targetTwoId"));
        int targetTwoIndex = Integer.parseInt((String) jsonMap.get("targetTwoIndex"));
        Card cardTwo = round.getPlayerById(targetTwoId).getCard(targetTwoIndex);

        try {
            round.performEffect(round.getPlayerById(currentPlayerId),
                    round.getPlayerById(targetOneId), round.getPlayerById(targetTwoId),
                    Effect.CHECK_TWO_CARDS, targetOneIndex, targetTwoIndex);
        } catch(IllegalMoveException ime) {
            ime.printStackTrace();
        }

        List<String> keys = Arrays.asList("type", "agent","victimOne", "cardOne",
                "cardOneValue", "victimTwo", "cardTwo", "cardTwoValue");
        List<String> values = Arrays.asList("CHECK_TWO_CARDS", Integer.toString(currentPlayerId),
                Integer.toString(targetOneId),
                Integer.toString(targetOneIndex), Integer.toString(cardOne.getValue()),
                Integer.toString(targetTwoId),
                Integer.toString(targetTwoIndex), Integer.toString(cardTwo.getValue()));

        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }

    public static String handlePublicCheckTwoCards(HashMap<String, Object> jsonMap) {

        List<String> keys = Arrays.asList("type","victimOne", "cardOne",
                "victimTwo", "cardTwo");
        List<String> values = Arrays.asList("CHECK_TWO_CARDS",
                (String) jsonMap.get("targetOneId"),
                (String) jsonMap.get("targetOneIndex"),
                (String) jsonMap.get("targetTwoId"),
                (String) jsonMap.get("targetTwoIndex"));
        return JsonConverter.createJsonString(new ObjectMapper(), new HashMap<>(), keys, values);
    }


    private static void  exchangeCardsAfterChecking(HashMap<String, Object> jsonMap, Round round) {
        try {
            int currentPlayerId = Integer.parseInt((String) jsonMap.get("currentPlayerId"));
            round.performEffect(round.getPlayerById(currentPlayerId), 0, Effect.EXCHANGE_AFTER_CHECKS);
        } catch (IllegalMoveException ime) {
            ime.printStackTrace();
        }

        // Clear variables set to handle effect in effectPerformer
        round.clearTemps();
    }
}
