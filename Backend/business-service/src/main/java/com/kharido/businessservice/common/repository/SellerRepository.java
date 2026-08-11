package com.kharido.businessservice.common.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.seller.entity.Seller;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

    Optional<Seller> findByUserId(Integer userId);

}