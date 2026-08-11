package com.kharido.businessservice.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.admin.dto.DashboardResponse;
import com.kharido.businessservice.admin.service.AdminService;


@RestController
@RequestMapping("/api/admin")
public class AdminController {


    private final AdminService adminService;


    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }



    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }

}