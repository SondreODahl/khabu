package com.khabu.cardgame.config;


import com.khabu.cardgame.websocketutil.CustomHandshakeHandler;
import com.khabu.cardgame.websocketutil.HttpHandshakeInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

// Sets up websocket endpoint on /ws.
// /topic is used for all channels that broadcast to all users
// /queue is used to target single users
// /app is used for the frontend to publish messages through the server

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").addInterceptors(new HttpHandshakeInterceptor())
                .setHandshakeHandler(new CustomHandshakeHandler()).setAllowedOrigins("*");
        registry.addEndpoint("/ws").addInterceptors(new HttpHandshakeInterceptor())
                .setHandshakeHandler(new CustomHandshakeHandler()).setAllowedOrigins("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxSessionIdleTimeout(900000L);
        return container;
    }

}
