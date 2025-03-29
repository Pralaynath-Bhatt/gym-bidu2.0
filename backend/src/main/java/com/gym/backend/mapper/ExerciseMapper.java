package com.gym.backend.mapper;

import com.gym.backend.dto.ExerciseDTO;
import com.gym.backend.entity.Exercise;

public class ExerciseMapper {

    public static ExerciseDTO toDTO(Exercise exercise) {
        if (exercise == null) {
            return null;
        }
        return ExerciseDTO.builder()
                .exerciseId(exercise.getExercise_id())
                .name(exercise.getName())
                .muscleGroup(exercise.getMuscle_group())
                .targetMuscle(exercise.getTarget_muscle())
                .youtubeLink(exercise.getYoutube_link())
                .build();
    }

    public static Exercise toEntity(ExerciseDTO exerciseDTO) {
        if (exerciseDTO == null) {
            return null;
        }
        return Exercise.builder()
                .name(exerciseDTO.getName())
                .muscle_group(exerciseDTO.getMuscleGroup())
                .target_muscle(exerciseDTO.getTargetMuscle())
                .youtube_link(exerciseDTO.getYoutubeLink())
                .build();
    }
}
