package com.kharido.businessservice.admin.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ProductResponse {

    private Integer productId;

    private Integer sellerId;

    private String sellerName;

    private Integer categoryId;

    private Integer subCategoryId;

    private Integer brandId;

    private String productName;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;

    private String approvalStatus;

    private String status;

    private LocalDateTime createdAt;


    public ProductResponse(
            Integer productId,
            Integer sellerId,
            String sellerName,
            Integer categoryId,
            Integer subCategoryId,
            Integer brandId,
            String productName,
            String description,
            BigDecimal price,
            Integer stockQuantity,
            String approvalStatus,
            String status,
            LocalDateTime createdAt) {


        this.productId = productId;
        this.sellerId = sellerId;
        this.sellerName = sellerName;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.brandId = brandId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.stockQuantity = stockQuantity;
        this.approvalStatus = approvalStatus;
        this.status = status;
        this.createdAt = createdAt;
    }


    public Integer getProductId() {
        return productId;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public String getSellerName() {
        return sellerName;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public Integer getSubCategoryId() {
        return subCategoryId;
    }

    public Integer getBrandId() {
        return brandId;
    }

    public String getProductName() {
        return productName;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}