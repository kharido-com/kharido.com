package com.kharido.businessservice.admin.dto;

import java.time.LocalDateTime;

public class SellerResponse {

    private Integer sellerId;
    private Integer userId;
    private String username;
    private String email;
    private String shopName;
    private String gstNumber;
    private String phone;
    private String approvalStatus;
    private LocalDateTime approvedDate;
    private Long productCount;

    public SellerResponse() {
    }

    public SellerResponse(
            Integer sellerId,
            Integer userId,
            String username,
            String email,
            String shopName,
            String gstNumber,
            String phone,
            String approvalStatus,
            LocalDateTime approvedDate,
            Long productCount) {

        this.sellerId = sellerId;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.shopName = shopName;
        this.gstNumber = gstNumber;
        this.phone = phone;
        this.approvalStatus = approvalStatus;
        this.approvedDate = approvedDate;
        this.productCount = productCount != null ? productCount : 0L;
    }

    public SellerResponse(
            Integer sellerId,
            Integer userId,
            String username,
            String email,
            String shopName,
            String gstNumber,
            String phone,
            String approvalStatus,
            LocalDateTime approvedDate) {

        this.sellerId = sellerId;
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.shopName = shopName;
        this.gstNumber = gstNumber;
        this.phone = phone;
        this.approvalStatus = approvalStatus;
        this.approvedDate = approvedDate;
        this(sellerId, userId, username, email, shopName, gstNumber, phone, approvalStatus, approvedDate, 0L);
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getShopName() {
        return shopName;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public String getPhone() {
        return phone;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public LocalDateTime getApprovedDate() {
        return approvedDate;
    }
    public Long getProductCount() {
        return productCount != null ? productCount : 0L;
    }

    public void setProductCount(Long productCount) {
        this.productCount = productCount;
    }

    public Long getProducts() {
        return getProductCount();
    }

    public void setProducts(Long products) {
        this.productCount = products;
    }

    public Long getProductsCount() {
        return getProductCount();
    }

    public void setProductsCount(Long productsCount) {
        this.productCount = productsCount;
    }
}