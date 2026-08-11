package com.kharido.businessservice.admin.dto;

import java.math.BigDecimal;

public class ReportResponse {

    private Long totalUsers;
    private Long totalSellers;
    private Long totalProducts;
    private Long totalOrders;
=======
    private BigDecimal totalRevenue;

    public ReportResponse() {
    }

    public ReportResponse(
            Long totalUsers,
            Long totalSellers,
            Long totalProducts,
            Long totalOrders) {
            Long totalOrders,
            BigDecimal totalRevenue) {

        this.totalUsers = totalUsers;
        this.totalSellers = totalSellers;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
        this.totalRevenue = totalRevenue;
    }

    public Long getTotalUsers() {
        return totalUsers;
    }

    public Long getTotalSellers() {
        return totalSellers;
    }

    public Long getTotalProducts() {
        return totalProducts;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
}