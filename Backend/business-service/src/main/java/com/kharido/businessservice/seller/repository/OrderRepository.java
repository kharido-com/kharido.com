package com.kharido.businessservice.seller.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.seller.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}