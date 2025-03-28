package com.gym.backend.service;

import com.gym.backend.entity.UserExerciseLog;
import com.gym.backend.repository.UserExerciseLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserExerciseLogService {

    private final UserExerciseLogRepository logRepository;

    public List<UserExerciseLog> getAllLogs() {
        return logRepository.findAll();
    }

    public UserExerciseLog saveLog(UserExerciseLog log) {
        return logRepository.save(log);
    }
}

