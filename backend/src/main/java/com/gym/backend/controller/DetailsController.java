package com.gym.backend.controller;

import com.gym.backend.entity.User;
import com.gym.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/details")
@CrossOrigin(origins = "http://localhost:3000")
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

        // Calculate BMI dynamically
        double bmi = calculateBMI(user.getWeight(), user.getHeight());

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("user_id", user.getUser_id());
        responseMap.put("username", user.getUsername());
        responseMap.put("goal", user.getGoal());
        responseMap.put("plan_id", user.getPlan_id());
        responseMap.put("email", user.getEmail());
        responseMap.put("phone_number", user.getPhone_number());
        responseMap.put("weight", user.getWeight());
        responseMap.put("height", user.getHeight());
        responseMap.put("chest", user.getChest());
        responseMap.put("shoulders", user.getShoulders());
        responseMap.put("waist", user.getWaist());
        responseMap.put("hips", user.getHips());
        responseMap.put("biceps", user.getBiceps());
        responseMap.put("forearm", user.getForearm());
        responseMap.put("thighs", user.getThighs());
        responseMap.put("calves", user.getCalves());
        responseMap.put("bmi", bmi);  // Add calculated BMI
        responseMap.put("joinDate", user.getJoinDate());

        return ResponseEntity.ok(responseMap);
    }

    @PutMapping
    public ResponseEntity<?> updateUserProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody User updatedUser) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body("Unauthorized access");
        }

        User user = userService.findByUsername(userDetails.getUsername());
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (updatedUser.getGoal() != null) user.setGoal(updatedUser.getGoal());
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

        // Calculate BMI before saving
        double bmi = calculateBMI(user.getWeight(), user.getHeight());

        User savedUser = userService.saveUser(user);

        // Return updated user with calculated BMI
        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("user_id", savedUser.getUser_id());
        responseMap.put("username", savedUser.getUsername());
        responseMap.put("goal", savedUser.getGoal());
        responseMap.put("plan_id", savedUser.getPlan_id());
        responseMap.put("email", savedUser.getEmail());
        responseMap.put("phone_number", savedUser.getPhone_number());
        responseMap.put("weight", savedUser.getWeight());
        responseMap.put("height", savedUser.getHeight());
        responseMap.put("chest", savedUser.getChest());
        responseMap.put("shoulders", savedUser.getShoulders());
        responseMap.put("waist", savedUser.getWaist());
        responseMap.put("hips", savedUser.getHips());
        responseMap.put("biceps", savedUser.getBiceps());
        responseMap.put("forearm", savedUser.getForearm());
        responseMap.put("thighs", savedUser.getThighs());
        responseMap.put("calves", savedUser.getCalves());
        responseMap.put("bmi", bmi); // Send calculated BMI
        responseMap.put("joinDate", savedUser.getJoinDate());

        return ResponseEntity.ok(responseMap);
    }

    private double calculateBMI(Double weight, Double height) {
        if (weight != null && height != null && height > 0) {
            double heightInMeters = height / 100.0; // Convert cm to meters
            return Math.round((weight / (heightInMeters * heightInMeters)) * 100.0) / 100.0; // Round to 2 decimals
        }
        return 0.0;
    }
}
