package com.gym.backend.controller;

import com.gym.backend.entity.UserExerciseLog;
import com.gym.backend.service.UserExerciseLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-exercise-log")

public class UserExerciseLogController {

    private final UserExerciseLogService logService;
    public UserExerciseLogController(UserExerciseLogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public List<UserExerciseLog> getAllLogs() {
        return logService.getAllLogs();
    }

    @PostMapping
    public UserExerciseLog createLog(@RequestBody UserExerciseLog log) {
        return logService.saveLog(log);
    }
}
