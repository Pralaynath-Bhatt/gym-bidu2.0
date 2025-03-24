package com.gym.backend.repository;

import com.gym.backend.model.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExerciseLogRepository extends JpaRepository<UserExerciseLog, Long> {
}
