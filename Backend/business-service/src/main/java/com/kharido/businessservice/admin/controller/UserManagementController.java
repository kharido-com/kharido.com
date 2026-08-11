package com.kharido.businessservice.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.admin.dto.UserResponse;
import com.kharido.businessservice.admin.service.UserManagementService;

@RestController
@RequestMapping("/api/admin/users")
public class UserManagementController {

    private final UserManagementService userManagementService;

    public UserManagementController(
            UserManagementService userManagementService) {

        this.userManagementService = userManagementService;
    }

    // GET ALL USERS
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        return ResponseEntity.ok(
                userManagementService.getAllUsers()
        );
    }
    

    // GET USER BY ID
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                userManagementService.getUserById(userId)
        );
    }

    // UPDATE USER STATUS
    @PutMapping("/{userId}/status")
    public ResponseEntity<UserResponse> updateUserStatus(
            @PathVariable Integer userId,
            @RequestParam String status) {

        return ResponseEntity.ok(
                userManagementService.updateUserStatus(
                        userId,
                        status
                )
        );
    }
    @GetMapping("/customers")
    public ResponseEntity<List<UserResponse>> getAllCustomers() {

        return ResponseEntity.ok(
                userManagementService.getAllCustomers()
        );
    }

}