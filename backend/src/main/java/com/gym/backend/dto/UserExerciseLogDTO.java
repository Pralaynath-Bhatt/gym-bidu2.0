package com.gym.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserExerciseLogDTO {
    private Long logId;
    private Long userId;
    private Long exerciseId;
    private LocalDate sessionDate;
    private Double weightUsed;
    private Integer reps;
    private Integer sets;
}
