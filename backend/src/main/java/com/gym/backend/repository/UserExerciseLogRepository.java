package com.gym.backend.repository;

import com.gym.backend.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserExerciseLogRepository extends JpaRepository<UserExerciseLog, Long> {
}
