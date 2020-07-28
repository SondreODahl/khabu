package com.khabu.cardgame.controllers;


import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import com.khabu.cardgame.model.game.Game;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
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

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }

    @RequestMapping(value="/api/player", method=RequestMethod.POST)
    public Map<String, Object> createPlayer(@RequestBody Map<String, Object> player, HttpServletRequest req) {
        Map<String, Object> response = new HashMap<>();

        // GET ATTRIBUTES
        String playerName = (String) player.get("username");
        String sessionId = req.getSession().getId();

        if (playerRepository.getPlayers().size() <= 2 ) {
            Player newPlayer = new Player(playerName, PlayerRepository.PLAYER_ID_COUNT, sessionId);
            PlayerRepository.PLAYER_ID_COUNT += 1;
            playerRepository.addPlayer(newPlayer.getPlayerId(), newPlayer);
            if (gameRepository.getGames().size() == 0) {
                Game game = new Game(RandomStringUtils.randomAlphabetic(SHORT_ID_LENGTH), Game.getNumOfPlayers(), Game.REVEAL_TIME);
                gameRepository.addGame(game);
            }
            // CREATE THE PROPER RESPONSE
            response.put("status", ResponseEntity.status(HttpStatus.CREATED).build());
            response.put("playerIds", playerRepository.getPlayerNamesAndIds());
            response.put("yourId", Integer.toString(newPlayer.getPlayerId()));
            return response;
        }

        // ERROR
        response.put("status", ResponseEntity.status(HttpStatus.CONFLICT).build());
        return response;
    }

}
