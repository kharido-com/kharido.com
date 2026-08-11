package com.kharido.businessservice.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kharido.businessservice.admin.dto.ReportResponse;
import com.kharido.businessservice.admin.service.AdminReportService;

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

    private final AdminReportService adminReportService;

    public AdminReportController(AdminReportService adminReportService) {
        this.adminReportService = adminReportService;
    }

    @GetMapping
    public ResponseEntity<ReportResponse> getReports() {
        return ResponseEntity.ok(adminReportService.getReports());
    }
}