package com.gym.backend.mapper;

import com.gym.backend.dto.UserDTO;
import com.gym.backend.entity.User;

public class UserMapper {

    public static UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .userId(user.getUser_id())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhone_number())
                .weight(user.getWeight())
                .height(user.getHeight())
                .chest(user.getChest())
                .shoulders(user.getShoulders())
                .waist(user.getWaist())
                .hips(user.getHips())
                .biceps(user.getBiceps())
                .forearm(user.getForearm())
                .thighs(user.getThighs())
                .calves(user.getCalves())
                .plan(user.getPlan())
                .joinDate(user.getJoinDate())
                .bmi(user.getBmi())
                .build();
    }

    public static User toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        return User.builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .phone_number(userDTO.getPhoneNumber())
                .weight(userDTO.getWeight())
                .height(userDTO.getHeight())
                .chest(userDTO.getChest())
                .shoulders(userDTO.getShoulders())
                .waist(userDTO.getWaist())
                .hips(userDTO.getHips())
                .biceps(userDTO.getBiceps())
                .forearm(userDTO.getForearm())
                .thighs(userDTO.getThighs())
                .calves(userDTO.getCalves())
                .plan(userDTO.getPlan())
                .joinDate(userDTO.getJoinDate())
                .bmi(userDTO.getBmi())
                .build();
    }
}
