package com.kharido.businessservice.admin.dto;

import java.time.LocalDateTime;

public class UserResponse {

    private Integer userId;
    private String username;
    private String email;
    private String role;
    private String status;
    private LocalDateTime createdAt;

    public UserResponse() {
    }

    public UserResponse(Integer userId,
                        String username,
                        String email,
                        String role,
                        String status,
                        LocalDateTime createdAt) {

        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}