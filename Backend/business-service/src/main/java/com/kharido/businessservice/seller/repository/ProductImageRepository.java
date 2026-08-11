package com.kharido.businessservice.seller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.seller.entity.Product;
import com.kharido.businessservice.seller.entity.ProductImage;
import java.util.Optional;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    Optional<ProductImage> findByProduct(Product product);

}