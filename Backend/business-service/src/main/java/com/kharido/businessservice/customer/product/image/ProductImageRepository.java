package com.kharido.businessservice.customer.product.image;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository
        extends JpaRepository<ProductImage, Integer> {

    Optional<ProductImage> findByProductProductIdAndIsPrimaryTrue(
            Integer productId);

    Optional<ProductImage> findFirstByProductProductIdAndIsPrimaryTrue(
            Integer productId);

    Optional<ProductImage> findFirstByProductProductId(
            Integer productId);
}