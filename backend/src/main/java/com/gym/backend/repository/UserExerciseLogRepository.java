package com.gym.backend.repository;

import com.gym.backend.entity.Exercise;
import com.gym.backend.entity.User;
import com.gym.backend.entity.UserExerciseLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserExerciseLogRepository extends JpaRepository<UserExerciseLog, Long> {

    // Find the latest log for a user and an exercise
    Optional<UserExerciseLog> findTopByUserAndExerciseOrderByDateDesc(User user, Exercise exercise);


    // Find all logs for a user on a given date
    List<UserExerciseLog> findByUserAndDate(User user, LocalDate sessionDate);

}
