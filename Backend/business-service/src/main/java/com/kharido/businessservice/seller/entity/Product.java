package com.kharido.businessservice.seller.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private Integer productId;

    @Column(name = "sellerid")
    private Integer sellerId;

    @Column(name = "categoryid")
    private Integer categoryId;

    @Column(name = "subcategoryid")
    private Integer subCategoryId;

    @Column(name = "brandid")
    private Integer brandId;

    @Column(name = "product_name")
    private String productName;

    private String description;

    private BigDecimal price;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "approval_status")
    private String approvalStatus;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProductImage> images;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.status = "ACTIVE";
        this.approvalStatus = "PENDING";
    }
}