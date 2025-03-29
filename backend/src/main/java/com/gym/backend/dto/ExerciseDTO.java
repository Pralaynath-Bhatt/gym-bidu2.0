package com.gym.backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExerciseDTO {
    private Long exerciseId;
    private String name;
    private String muscleGroup;
    private String targetMuscle;
    private String youtubeLink;
}
