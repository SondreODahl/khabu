package com.khabu.cardgame.controllers;


import org.springframework.web.bind.annotation.*;


//@CrossOrigin(origins="http://localhost:3000") // To have it class-wide
@RestController
public class HelloController {

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }

}
