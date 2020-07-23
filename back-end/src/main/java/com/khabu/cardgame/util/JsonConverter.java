package com.khabu.cardgame.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
// Converts maps to json strings and vice versa
public class JsonConverter {

    public static String createJsonString(ObjectMapper objectMapper, Map<String, String> data, String type, String value) {
        data.clear();
        String jsonOutput = "";

        // Add new data
        data.put("type", type);
        data.put("value", value);

        // CONVERT TO JSON STRING
        try {
            jsonOutput = objectMapper.writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonOutput;
    }

    public static HashMap<String, Object> createMapFromJsonString(String json) {
        // Create a map from payload
        ObjectMapper objectMapper = new ObjectMapper();
        TypeReference<HashMap<String, Object>> typeRef =
                new TypeReference<HashMap<String, Object>>() {};

        HashMap<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(json, typeRef);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonMap;
    }

}
