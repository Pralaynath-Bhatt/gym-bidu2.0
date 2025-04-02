package com.gym.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:3000")
public class test {
    @GetMapping("/win")
    public String Getmaptest(){
        return "test sucsessful";
    }
}
