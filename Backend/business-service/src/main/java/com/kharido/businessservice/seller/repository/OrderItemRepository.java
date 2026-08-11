package com.kharido.businessservice.seller.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kharido.businessservice.seller.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    List<OrderItem> findBySellerId(Integer sellerId);

    // Total Orders
    @Query("""
            SELECT COUNT(DISTINCT oi.order.orderId)
            FROM OrderItem oi
            WHERE oi.sellerId = :sellerId
            """)
    long getTotalOrders(Integer sellerId);

    // Pending Orders
    @Query("""
            SELECT COUNT(DISTINCT oi.order.orderId)
            FROM OrderItem oi
            WHERE oi.sellerId = :sellerId
            AND oi.order.orderStatus='Pending'
            """)
    long getPendingOrders(Integer sellerId);

    // Total Revenue
    @Query("""
            SELECT COALESCE(SUM(oi.subtotal),0)
            FROM OrderItem oi
            WHERE oi.sellerId = :sellerId
            """)
    BigDecimal getTotalRevenue(Integer sellerId);

}