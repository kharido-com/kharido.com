package com.kharido.businessservice.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kharido.businessservice.admin.entity.Order;


public interface OrderRepository 
        extends JpaRepository<Order, Integer> {


    List<Order> findByOrderStatus(String orderStatus);

    List<Order> findAllByOrderByOrderDateDescOrderIdDesc();

    List<Order> findByOrderStatusOrderByOrderDateDescOrderIdDesc(String orderStatus);

    List<Order> findByOrderStatus(String orderStatus);

    @Query("""
    	    SELECT COALESCE(SUM(o.totalAmount), 0)
    	    FROM AdminOrder o
    	    WHERE UPPER(o.paymentStatus) = 'PAID'
    	""")
    	BigDecimal getTotalPaidRevenue();

}