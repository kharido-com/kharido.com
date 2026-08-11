package com.kharido.businessservice.admin.service;

import com.kharido.businessservice.admin.dto.AdminProfileResponse;
import com.kharido.businessservice.admin.dto.DashboardResponse;
import com.kharido.businessservice.admin.dto.ReportResponse;

public interface AdminService {

    DashboardResponse getDashboard();

    ReportResponse getReports();

    AdminProfileResponse getProfile();
}