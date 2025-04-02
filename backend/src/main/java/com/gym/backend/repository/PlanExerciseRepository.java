package com.gym.backend.repository;

import com.gym.backend.entity.PlanExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanExerciseRepository extends JpaRepository<PlanExercise, Long> {

    // ✅ Fixed method name to match the entity field `exercise_order`
    List<PlanExercise> findByPlanIdAndDayOrderByOrder(Long planId, Integer day);


    // ✅ This query is correct
    @Query("SELECT MAX(pe.day) FROM PlanExercise pe WHERE pe.plan.id = :planId")
    Integer findMaxDayByPlanId(@Param("planId") Long planId);
}
