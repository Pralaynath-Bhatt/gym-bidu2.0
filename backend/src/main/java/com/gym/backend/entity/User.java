package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "gym_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password_hash;  // Hashed password

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false, length = 15)
    private String phone_number;

    // User measurements
    private Double weight;   // kg
    private Double height;   // cm

    // Body measurements
    private Double chest;
    private Double shoulders;
    private Double waist;
    private Double hips;
    private Double biceps;
    private Double forearm;
    private Double thighs;
    private Double calves;

    // Gym plan
    private String plan;  // Default plan

    @CreationTimestamp
    private LocalDateTime joinDate;
    private Double bmi;


}
