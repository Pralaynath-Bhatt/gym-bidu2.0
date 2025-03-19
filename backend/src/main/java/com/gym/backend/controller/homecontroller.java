package com.gym.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class homecontroller {
    @GetMapping("/")
    public String first_mapping(){
        return "welcome to home page";
    }
    @GetMapping("/try")
    public String second_mapping(){
        return "hello try";
    }
}