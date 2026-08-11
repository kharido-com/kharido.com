package com.kharido.businessservice.admin.dto;

public class ReportResponse {

    private Long totalUsers;
    private Long totalSellers;
    private Long totalProducts;
    private Long totalOrders;

    public ReportResponse() {
    }

    public ReportResponse(
            Long totalUsers,
            Long totalSellers,
            Long totalProducts,
            Long totalOrders) {

        this.totalUsers = totalUsers;
        this.totalSellers = totalSellers;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
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
}