package com.kharido.businessservice.seller.dashboard;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seller/dashboard")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class SellerDashboardController {

    private final SellerDashboardService sellerDashboardService;

    public SellerDashboardController(
            SellerDashboardService sellerDashboardService) {

        this.sellerDashboardService = sellerDashboardService;
    }

    @GetMapping
    public SellerDashboardDTO getDashboard() {

        return sellerDashboardService.getDashboard();

    }

}