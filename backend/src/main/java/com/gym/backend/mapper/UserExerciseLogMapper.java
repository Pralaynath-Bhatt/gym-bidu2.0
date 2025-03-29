package com.gym.backend.mapper;

import com.gym.backend.dto.UserExerciseLogDTO;
import com.gym.backend.entity.UserExerciseLog;

public class UserExerciseLogMapper {

    public static UserExerciseLogDTO toDTO(UserExerciseLog log) {
        if (log == null) {
            return null;
        }
        return UserExerciseLogDTO.builder()
                .logId(log.getLog_id())
                .userId(log.getUser_id().getUser_id()) // Extract user ID
                .exerciseId(log.getExercise_id().getExercise_id()) // Extract exercise ID
                .sessionDate(log.getSession_date())
                .weightUsed(log.getWeight_used())
                .reps(log.getReps())
                .sets(log.getSets())
                .build();
    }

    public static UserExerciseLog toEntity(UserExerciseLogDTO logDTO) {
        if (logDTO == null) {
            return null;
        }
        return UserExerciseLog.builder()

                .session_date(logDTO.getSessionDate())
                .weight_used(logDTO.getWeightUsed())
                .reps(logDTO.getReps())
                .sets(logDTO.getSets())
                .build();
    }
}
