package com.kharido.businessservice.seller.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.seller.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findBySellerId(Integer sellerId);

    void deleteBySellerId(Integer sellerId);

    // Count total products of a seller
    long countBySellerId(Integer sellerId);

}