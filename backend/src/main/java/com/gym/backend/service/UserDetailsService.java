package com.gym.backend.service;

import com.gym.backend.entity.User;
import com.gym.backend.entity.UserPrincipal;
import com.gym.backend.repository.UserDetailsRepository;
import com.gym.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDetailsRepository.findByUsername(username);
        if (user == null){
            System.out.println("user not found");
            throw new UsernameNotFoundException("username not found");
        };
        return new UserPrincipal(user);
    }
}
