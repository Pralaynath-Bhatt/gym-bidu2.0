package com.gym.backend.service;

import com.gym.backend.entity.User;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register user with plain text password (not recommended for production)
    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists.");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use.");
        }
        user.setPassword_hash(user.getPassword_hash());  // No encryption
        return userRepository.save(user);
    }

    // Login user with plain text password (not recommended for production)
    public boolean loginUser(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return false; // User not found
        }

        // Compare plain text passwords
        return user.getPassword_hash().equals(password);  // Compare plain text password
    }
}
