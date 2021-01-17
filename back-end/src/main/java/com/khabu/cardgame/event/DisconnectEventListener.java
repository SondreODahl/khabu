package com.khabu.cardgame.event;

import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;


@Component
public class DisconnectEventListener {

    private GameRepository gameRepository;
    private PlayerRepository playerRepository;

    @Autowired
    public DisconnectEventListener(GameRepository gameRepository, PlayerRepository playerRepository) {
        this.gameRepository = gameRepository;
        this.playerRepository = playerRepository;
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent disconnectEvent) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(disconnectEvent.getMessage());
        // Broadcast the disconnection to remaining connected players
        String disconnectedSessionId = Objects.requireNonNull(headerAccessor.getSessionAttributes()).get("sessionId").toString();
        Player removedPlayer = removePlayer(disconnectedSessionId);


        // Remove game if there are no connected players left
        if (gameRepository.getGames().size() > 0) {
            Game game = gameRepository.getGames().get(0);
            if (game.getConnectedPlayersSize() == 0) gameRepository.removeGame(game);
        }
    }

    // Helper methods
    private Player removePlayer(String sessionId) {
        if (gameRepository.getGames().size() > 0) {
            Game game = gameRepository.getGames().get(0);
            Player player = playerRepository.getPlayer(sessionId);
            game.removeConnectedPlayer(player);
            playerRepository.removePlayer(sessionId);
            return player;
        }
        return null;
    }

}
