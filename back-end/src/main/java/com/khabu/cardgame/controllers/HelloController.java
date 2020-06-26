package com.khabu.cardgame.controllers;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;


//@CrossOrigin(origins="http://localhost:3000") // To have it class-wide
@RestController
public class HelloController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public HelloController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }

    @MessageMapping("/greeting")
    public void greet(String greeting) {
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        String text = "[" + time + "]" + "Hello" + greeting;
        this.simpMessagingTemplate.convertAndSend("/topic/greeting", text);
    }

    @MessageMapping("/great")
    public void great(String text) {
        String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        String message = "[" + time + "]" + "Hello" + text;
        this.simpMessagingTemplate.convertAndSend("/queue/great", message);
    }

}
