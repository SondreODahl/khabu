package com.khabu.cardgame.event;

import com.khabu.cardgame.model.PlayerRepository;
import com.khabu.cardgame.model.User;
import com.khabu.cardgame.model.game.GameRepository;
import com.khabu.cardgame.model.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;


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
        String sessionId = headers.getSessionId();

        // Retrieve array of players
        Player[] players = gameRepository.getGames().get(0).getPlayers();

        // Remove player from playerRepository and gameRepository
        for (Player player:
             players) {
            if (player.getSessionId().equals(sessionId)) {
                playerRepository.getPlayers().remove(player.getPlayerId());
                if (playerRepository.getPlayers().size() == 0) {
                    gameRepository.getGames().remove(0);
                }
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
