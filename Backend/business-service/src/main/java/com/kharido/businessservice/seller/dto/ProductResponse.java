package com.kharido.businessservice.seller.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponse {

    private Integer productId;

    private Integer sellerId;

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
}