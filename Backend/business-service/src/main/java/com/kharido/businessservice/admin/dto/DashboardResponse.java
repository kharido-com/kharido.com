package com.kharido.businessservice.admin.dto;


public class DashboardResponse {


    private long totalUsers;

    private long totalSellers;

    private long totalProducts;

    private long totalOrders;


import java.math.BigDecimal;

public class DashboardResponse {

    private long totalUsers;
    private long totalSellers;
    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;

    public DashboardResponse() {
    }

    public DashboardResponse(
            long totalUsers,
            long totalSellers,
            long totalProducts,
            long totalOrders) {
            long totalOrders,
            BigDecimal totalRevenue) {

        this.totalUsers = totalUsers;
        this.totalSellers = totalSellers;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
    }



        this.totalRevenue = totalRevenue;
    }

    public long getTotalUsers() {
        return totalUsers;
    }


    public long getTotalSellers() {
        return totalSellers;
    }


    public long getTotalProducts() {
        return totalProducts;
    }


    public long getTotalOrders() {
        return totalOrders;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }
}