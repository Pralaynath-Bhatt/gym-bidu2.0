package com.gym.backend.controller;

import com.gym.backend.entity.User;
import com.gym.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from React frontend
@RequestMapping("/api/details")
public class DetailsController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized access");
        }

        User user = userService.findByUsername(userDetails.getUsername());
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        return ResponseEntity.ok(user);
    }

    @PutMapping
    public ResponseEntity<?> updateUserProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody User updatedUser
    ) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized access");
        }

        User user = userService.findByUsername(userDetails.getUsername());
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        // Update user details if they are not null
        if (updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if (updatedUser.getPhone_number() != null) user.setPhone_number(updatedUser.getPhone_number());
        if (updatedUser.getWeight() != null) user.setWeight(updatedUser.getWeight());
        if (updatedUser.getHeight() != null) user.setHeight(updatedUser.getHeight());
        if (updatedUser.getChest() != null) user.setChest(updatedUser.getChest());
        if (updatedUser.getShoulders() != null) user.setShoulders(updatedUser.getShoulders());
        if (updatedUser.getWaist() != null) user.setWaist(updatedUser.getWaist());
        if (updatedUser.getHips() != null) user.setHips(updatedUser.getHips());
        if (updatedUser.getBiceps() != null) user.setBiceps(updatedUser.getBiceps());
        if (updatedUser.getForearm() != null) user.setForearm(updatedUser.getForearm());
        if (updatedUser.getThighs() != null) user.setThighs(updatedUser.getThighs());
        if (updatedUser.getCalves() != null) user.setCalves(updatedUser.getCalves());
        if (updatedUser.getPlan_id() != null) user.setPlan_id(updatedUser.getPlan_id());
        if (updatedUser.getBmi() != null) user.setBmi(updatedUser.getBmi());

        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
