package com.gym.backend.controller;

import com.gym.backend.entity.UserExerciseLog;
import com.gym.backend.service.UserExerciseLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercise-log")
public class UserExerciseLogController {

    @Autowired
    private UserExerciseLogService logService;



    // Fetch the latest log for an exercise by user ID
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestExerciseLog(
            @RequestParam Long userId,
            @RequestParam Long exerciseId) {

        Optional<UserExerciseLog> log = logService.getLatestExerciseLog(userId, exerciseId);
        return log.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Save a new exercise log entry
    @PostMapping("/save")
    public ResponseEntity<?> saveExerciseLog(@RequestBody Map<String, Object> request) {
        try {
            // Validate and extract values safely
            if (!request.containsKey("userId") || !request.containsKey("exerciseId") ||
                    !request.containsKey("sets") || !request.containsKey("reps") || !request.containsKey("weight")) {
                return ResponseEntity.badRequest().body("Missing required fields");
            }

            Long userId = ((Number) request.get("userId")).longValue();
            Long exerciseId = ((Number) request.get("exerciseId")).longValue();
            Integer sets = ((Number) request.get("sets")).intValue();
            Integer reps = ((Number) request.get("reps")).intValue();
            Double weight = ((Number) request.get("weight")).doubleValue();

            // Ensure values are valid
            if (sets <= 0 || reps <= 0 || weight < 0) {
                return ResponseEntity.badRequest().body("Invalid sets, reps, or weight values");
            }

            UserExerciseLog savedLog = logService.saveExerciseLog(userId, exerciseId, sets, reps, weight);
            return ResponseEntity.ok(savedLog);

        } catch (ClassCastException | NullPointerException e) {
            return ResponseEntity.badRequest().body("Invalid data format: " + e.getMessage());
        }
    }


    // Get all logs for a user on a specific date
    @GetMapping("/logs")
    public ResponseEntity<List<UserExerciseLog>> getLogsByUserAndDate(
            @RequestParam Long userId, @RequestParam String sessionDate) {

        LocalDate date = LocalDate.parse(sessionDate);
        List<UserExerciseLog> logs = logService.getLogsByUserAndDate(userId, date);
        return ResponseEntity.ok(logs);
    }
}
