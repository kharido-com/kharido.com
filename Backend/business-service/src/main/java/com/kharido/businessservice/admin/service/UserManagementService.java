package com.kharido.businessservice.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.UserResponse;
import com.kharido.businessservice.admin.entity.User;
import com.kharido.businessservice.admin.repository.UserRepository;

@Service
public class UserManagementService {

    private final UserRepository userRepository;

    public UserManagementService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }
    public List<UserResponse> getAllCustomers() {

        return userRepository.findByRoleRoleName("CUSTOMER")
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public UserResponse getUserById(Integer userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        return convertToResponse(user);
    }

    public UserResponse updateUserStatus(
            Integer userId,
            String status) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        if (!status.equalsIgnoreCase("ACTIVE")
                && !status.equalsIgnoreCase("BLOCKED")) {

            throw new RuntimeException(
                    "Invalid status. Use ACTIVE or BLOCKED"
            );
        }

        user.setStatus(status.toUpperCase());

        return convertToResponse(
                userRepository.save(user)
        );
    }

    private UserResponse convertToResponse(User user) {

        String roleName = null;

        if (user.getRole() != null) {
            roleName = user.getRole().getRoleName();
        }

        return new UserResponse(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                roleName,
                user.getStatus(),
                user.getCreatedAt()
        );
    }
}