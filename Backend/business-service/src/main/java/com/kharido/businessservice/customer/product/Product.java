package com.kharido.businessservice.customer.product;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.kharido.businessservice.common.entity.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "CustomerProduct")
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "productid")
    private Integer productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sellerid", nullable = false)
    private User seller;

    @Column(name = "categoryid", nullable = false)
    private Integer categoryId;

    @Column(name = "subcategoryid", nullable = false)
    private Integer subcategoryId;

    @Column(name = "brandid", nullable = false)
    private Integer brandId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "status")
    private String status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}