package com.gym.backend.repository;

import com.gym.backend.entity.Exercise;
import com.gym.backend.entity.PlanExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanExersiceRepository extends JpaRepository<PlanExercise, Long> {
}
