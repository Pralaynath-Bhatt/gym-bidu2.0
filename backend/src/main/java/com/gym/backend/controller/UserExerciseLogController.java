package com.gym.backend.controller;

import com.gym.backend.model.UserExerciseLog;
import com.gym.backend.service.UserExerciseLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-exercise-log")
@RequiredArgsConstructor
public class UserExerciseLogController {

    private final UserExerciseLogService logService;

    @GetMapping
    public List<UserExerciseLog> getAllLogs() {
        return logService.getAllLogs();
    }

    @PostMapping
    public UserExerciseLog createLog(@RequestBody UserExerciseLog log) {
        return logService.saveLog(log);
    }
}
