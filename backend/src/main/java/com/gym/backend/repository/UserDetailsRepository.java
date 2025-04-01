package com.gym.backend.repository;

import com.gym.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
