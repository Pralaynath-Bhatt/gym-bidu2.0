package com.gym.backend.repository;

import com.gym.backend.entity.Exercise;
import com.gym.backend.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
}
