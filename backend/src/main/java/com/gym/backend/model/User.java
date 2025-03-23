package com.gym.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "gym_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String passwordHash;  // Hashed password

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String phoneNumber;

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
    @Getter
    private String plan ;

    @CreationTimestamp
    private LocalDateTime joinDate;

    // Constructors
    public User() {}

    public User(String username, String passwordHash, String plan) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.plan = plan;
    }

    // Getters & Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public void setPlan(String plan) { this.plan = plan; }

    public LocalDateTime getJoinDate() { return joinDate; }
}
