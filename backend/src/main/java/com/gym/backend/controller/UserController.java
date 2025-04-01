package com.gym.backend.controller;

import com.gym.backend.entity.User;
import com.gym.backend.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User signup", description = "insert name")
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend requests
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginDetails) {
        if (loginDetails == null || loginDetails.getUsername() == null || loginDetails.getPassword_hash() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username or password is missing");
        }

        // Call the login service to validate the user (you should write the login logic)
        boolean isValidUser = userService.loginUser(loginDetails.getUsername(), loginDetails.getPassword_hash());

        if (isValidUser) {
            // Assuming a valid login generates a token (you may need to replace this with your token generation logic)
            String token = "your-jwt-token-here";  // This is just a placeholder

            return ResponseEntity.ok().body(new LoginResponse("Login successful", token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
