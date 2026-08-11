package com.kharido.businessservice.seller.dto.request;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddProductRequest {

    private Integer categoryId;

    private Integer subCategoryId;

    private Integer brandId;

    private String productName;

    private String description;

    private BigDecimal price;

    private Integer stockQuantity;

    private Boolean isPrimary;

    private MultipartFile image;
}