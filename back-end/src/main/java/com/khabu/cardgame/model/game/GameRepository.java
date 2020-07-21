package com.khabu.cardgame.model.game;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GameRepository {
    List<Game> games = new ArrayList<>();

    public List<Game> getGames() {
        return games;
    }
}

