package com.gym.backend.service;

import com.gym.backend.entity.UserExerciseLog;
import com.gym.backend.entity.User;
import com.gym.backend.entity.Exercise;
import com.gym.backend.repository.UserExerciseLogRepository;
import com.gym.backend.repository.UserRepository;
import com.gym.backend.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class UserExerciseLogService {

    @Autowired
    private UserExerciseLogRepository logRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    private UserExerciseLog userExerciseLog;

    // Get latest log for a specific user and exercise
    public Optional<UserExerciseLog> getLatestExerciseLog(Long userId, Long exerciseId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        return logRepository.findTopByUserAndExerciseOrderByDateDesc(user, exercise);
    }

    // Save or update an exercise log
    public UserExerciseLog saveExerciseLog(Long userId, Long exerciseId, Integer sets, Integer reps, Double weight) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new RuntimeException("Exercise not found"));

        UserExerciseLog log = UserExerciseLog.builder()
                .user(user)
                .exercise(exercise)
                .date(LocalDate.now())
                .sets(sets)
                .reps(reps)
                .weight_used(weight)
                .build();

        return logRepository.save(log);
    }

    // Get all logs for a user on a specific date
    public List<UserExerciseLog> getLogsByUserAndDate(Long userId, LocalDate sessionDate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return logRepository.findByUserAndDate(user, sessionDate);

    }
}cd
