package com.kharido.businessservice.admin.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kharido.businessservice.admin.dto.AdminProfileResponse;
import com.kharido.businessservice.admin.service.AdminService;


@RestController
@RequestMapping("/api/admin/profile")
public class AdminProfileController {


    private final AdminService adminService;


    public AdminProfileController(AdminService adminService) {

        this.adminService = adminService;
    }



    @GetMapping
    public ResponseEntity<AdminProfileResponse> getProfile() {


        return ResponseEntity.ok(
                adminService.getProfile()
        );
    }

}