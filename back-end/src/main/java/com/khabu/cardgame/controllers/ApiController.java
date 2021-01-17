package com.khabu.cardgame.controllers;


import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
public class ApiController {

    private PlayerRepository playerRepository;
    private GameRepository gameRepository;
    private final int SHORT_ID_LENGTH = 8;

    @Autowired
    public ApiController(PlayerRepository playerRepository, GameRepository gameRepository) {
        this.playerRepository = playerRepository;
        this.gameRepository = gameRepository;
    }

    @RequestMapping(value="/api/player", method=RequestMethod.POST)
    public Map<String, Object> createPlayer(@RequestBody Map<String, Object> data, HttpServletRequest req) {
        Map<String, Object> response = new HashMap<>();

        // GET ATTRIBUTES
        String playerName = (String) data.get("username");
        String sessionId = req.getSession().getId();

        // Create/update game
        Game game = initializeOrUpdateGame();
        Player player = initializeOrUpdatePlayer(sessionId, playerName, game);

        if (playerRepository.getPlayers().size() <= 2 ) {
            // CREATE THE PROPER RESPONSE
            response.put("status", ResponseEntity.status(HttpStatus.CREATED).build());
            response.put("playerIds", playerRepository.getPlayerNamesAndIds());
            response.put("yourId", Integer.toString(player.getPlayerId()));
            return response;
        }

        // ERROR
        response.put("status", ResponseEntity.status(HttpStatus.CONFLICT).build());
        return response;
    }


    // Helper methods

    private Player initializeOrUpdatePlayer(String sessionId, String name, Game game) {
        int newPlayerIndex = game.getPlayers().size();

        // Check for active game and initialize reconnection process if there is an active game
        if (game.isGameInitialized()) {
            System.out.println("Player reconnecting ...");
            Player player = (Player) game.getPlayers().stream().filter(p -> p.getSessionId().equals(sessionId)).toArray()[0];
            playerRepository.addPlayer(sessionId, player);
            game.addConnectedPlayer(player);
            // TODO: Broadcast game state to reconnecting player and broadcast new connection to players connected
            return player;
        } else {
            // Create new player
            Player newPlayer = new Player(name, newPlayerIndex, sessionId);
            game.addPlayer(newPlayer);
            playerRepository.addPlayer(sessionId, newPlayer);
            game.addConnectedPlayer(newPlayer);
            return newPlayer;
        }
    }

    private Game initializeOrUpdateGame() {
        if (gameRepository.getGames().size() == 0) {
            Game game = new Game(RandomStringUtils.randomAlphabetic(SHORT_ID_LENGTH), Game.REVEAL_TIME);
            gameRepository.addGame(game);
            return game;
        } else {
            return gameRepository.getGames().get(0);
        }
    }
}
