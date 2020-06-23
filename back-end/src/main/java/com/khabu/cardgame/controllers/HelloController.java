package com.khabu.cardgame.controllers;

import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// @CrossOrigin(origins="http://localhost:3000") // To have it class-wide
@RestController
public class HelloController {

    @RequestMapping(value="/api/hello", method = RequestMethod.GET, produces = "application/json")
    public String hello() {
        return "Hei på deg T, logg inn på Oracle her :)";
    }

    @Bean // For global CORS
    public WebMvcConfigurer configureMvc () {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/*").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
