package com.gym.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_exercise_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserExerciseLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long log_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise_id;

    @Column(nullable = false)
    private LocalDate session_date;

    @Column(nullable = false)
    private Double weight_used;

    @Column(nullable = false)
    private Integer reps;

    @Column(nullable = false)
    private Integer sets;
}
