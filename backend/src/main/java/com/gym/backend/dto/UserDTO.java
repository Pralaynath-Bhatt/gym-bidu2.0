package com.gym.backend.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String phoneNumber;
    private Double weight;
    private Double height;
    private Double chest;
    private Double shoulders;
    private Double waist;
    private Double hips;
    private Double biceps;
    private Double forearm;
    private Double thighs;
    private Double calves;
    private String plan;
    private LocalDateTime joinDate;
    private Double bmi;
}
