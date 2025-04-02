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
        Long userId = Long.valueOf(request.get("userId").toString());
        Long exerciseId = Long.valueOf(request.get("exerciseId").toString());
        Integer sets = Integer.valueOf(request.get("sets").toString());
        Integer reps = Integer.valueOf(request.get("reps").toString());
        Double weight = Double.valueOf(request.get("weight").toString());

        UserExerciseLog savedLog = logService.saveExerciseLog(userId, exerciseId, sets, reps, weight);
        return ResponseEntity.ok(savedLog);
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
