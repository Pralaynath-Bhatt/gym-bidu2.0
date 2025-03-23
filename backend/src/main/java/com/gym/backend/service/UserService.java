package com.gym.backend.service;

import com.gym.backend.model.User;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> getUserByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByPhoneNumber(String phoneNumber);
}
