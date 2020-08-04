package com.khabu.cardgame.event;

import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.game.Game;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Objects;


// Handles connection and disconnection events.

@Service
public class PresenceEventListener {
//
    private SimpMessagingTemplate messagingTemplate;
    private PlayerRepository playerRepository;
    private SessionRepository sessionRepository;
    private GameRepository gameRepository;

    @Autowired
    public PresenceEventListener(SimpMessagingTemplate messagingTemplate,
                                 SessionRepository sessionRepository,
                                 PlayerRepository playerRepository,
                                 GameRepository gameRepository) {
        this.messagingTemplate = messagingTemplate;
        this.sessionRepository = sessionRepository;
        this.playerRepository = playerRepository;
        this.gameRepository = gameRepository;
    }
//
//
//    // TODO: Create user from cookie/prev session
//    @EventListener
//    public void handleSessionConnected(SessionConnectEvent event) {
//        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
//
//        // Retrieve session variables
//        String sessionId = headers.getSessionId();
//        String userName = headers.getUser().getName();
//
//        System.out.println(userName);
//
//        // Create new user and add user + session
//        User user = new User(userName);
//        userRepository.add(user);
//        sessionRepository.addSession(sessionId, user);
//    }
//
//    // TODO: Find a better way to remove sessions when inactive for a long time
    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());

        // Retrieve sessionId
        String sessionId = Objects.requireNonNull(headers.getSessionAttributes()).get("sessionId").toString();

        // Check if the player left an active game
        if (gameRepository.getGames().size() > 0) {
            // Retrieve player disconnecting
            Game game = gameRepository.getGames().get(0);
            Player[] players = game.getPlayers();

            // Remove player from playerRepository and gameRepository
            for (Player player: players) {
                if (player.getSessionId().equals(sessionId)) {
                    playerRepository.removePlayer(player.getPlayerId());
                    game.removePlayer(player);
                    PlayerRepository.PLAYER_ID_COUNT -= 1;
                    break;
                }
            }
            if (playerRepository.getPlayers().size() == 0) {
                gameRepository.getGames().remove(game);
            }
        }
    }
//
//
//    // TODO: Send a message to /topic/ready updating ready player count
//    @EventListener
//    public void handleSessionUnsubscribe(SessionUnsubscribeEvent event) {
//        StompHeaderAccessor headers = StompHeaderAccessor.wrap(event.getMessage());
//
//        // Retrieve session variables
//        String sessionId = headers.getSessionId();
//        User user = sessionRepository.getUser(sessionId);
//
//        // Remove from ready players
//        if (userRepository.isPlayerReady(user)) {
//            userRepository.removeUnreadiedPlayer(user);
//        }
//    }
}
