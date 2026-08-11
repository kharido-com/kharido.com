package com.kharido.businessservice.admin.dto;


public class DashboardResponse {


    private long totalUsers;

    private long totalSellers;

    private long totalProducts;

    private long totalOrders;



    public DashboardResponse(
            long totalUsers,
            long totalSellers,
            long totalProducts,
            long totalOrders) {

        this.totalUsers = totalUsers;
        this.totalSellers = totalSellers;
        this.totalProducts = totalProducts;
        this.totalOrders = totalOrders;
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

}