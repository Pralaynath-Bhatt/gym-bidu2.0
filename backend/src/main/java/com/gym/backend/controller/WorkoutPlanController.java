package com.gym.backend.controller;

import com.gym.backend.entity.Exercise;
import com.gym.backend.entity.Plan;
import com.gym.backend.entity.PlanExercise;
import com.gym.backend.repository.PlanExerciseRepository;
import com.gym.backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/workout-plan")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutPlanController {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PlanExerciseRepository planExerciseRepository;

    @GetMapping("/{planId}")
    public ResponseEntity<?> getPlanDetails(@PathVariable Long planId) {
        Optional<Plan> planOptional = planRepository.findById(planId);

        if (planOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Plan plan = planOptional.get();

        // Get the maximum day value to determine total days in the plan
        Integer maxDay = planExerciseRepository.findMaxDayByPlanId(planId);

        Map<String, Object> response = new HashMap<>();
        response.put("id", plan.getId());
        response.put("name", plan.getName());
        response.put("description", plan.getDescription());
        response.put("days", maxDay != null ? maxDay : 0);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{planId}/day/{day}")
    public ResponseEntity<?> getExercisesForDay(
            @PathVariable Long planId,
            @PathVariable Integer day) {
        List<PlanExercise> planExercises = planExerciseRepository.findByPlanIdAndDayOrderByOrder(planId, day);

        if (planExercises.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Map<String, Object>> exercisesResponse = planExercises.stream()
                .map(pe -> {
                    Exercise exercise = pe.getExercise();
                    Map<String, Object> exerciseMap = new HashMap<>();
                    exerciseMap.put("exercise_id", exercise.getExercise_id());
                    exerciseMap.put("name", exercise.getName());
                    exerciseMap.put("muscle_group", exercise.getMuscle_group());
                    exerciseMap.put("target_muscle", exercise.getTarget_muscle());
                    exerciseMap.put("youtube_link", exercise.getYoutube_link());

                    return exerciseMap;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(exercisesResponse);
    }
}