package com.kharido.businessservice.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.admin.entity.Order;


public interface OrderRepository 
        extends JpaRepository<Order, Integer> {


    List<Order> findByOrderStatus(String orderStatus);

}