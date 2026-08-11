package com.kharido.businessservice.customer.product;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductDetailsDTO {

    private Integer productId;

    private String productName;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;

    private String category;

    private String subCategory;

    private String brand;

    private String imageUrl;

}