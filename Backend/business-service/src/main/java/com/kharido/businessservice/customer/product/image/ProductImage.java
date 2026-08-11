package com.kharido.businessservice.customer.product.image;

import com.kharido.businessservice.customer.product.Product;

import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "CustomerProductImage")
@Table(name = "product_images")
@Data
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imageid")
    private Integer imageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productid")
    private Product product;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_primary")
    private Boolean isPrimary;
}