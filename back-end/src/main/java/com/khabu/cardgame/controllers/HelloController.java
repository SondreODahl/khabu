package com.khabu.cardgame.controllers;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;


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
        String text = "Hello" + greeting;
        this.simpMessagingTemplate.convertAndSend("/greeting", text);
    }

}
