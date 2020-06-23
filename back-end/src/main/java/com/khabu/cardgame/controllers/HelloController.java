package com.khabu.cardgame.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {

    @CrossOrigin
    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }
}
