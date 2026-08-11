package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kharido.businessservice.common.entity.User;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findByUserOrderByOrderDateDescOrderIdDesc(User user);

    List<Order> findByUser(User user);

    @Query("""
            SELECT COALESCE(SUM(o.totalAmount), 0)
            FROM CustomerOrder o
            WHERE o.user = :user
            AND UPPER(o.orderStatus) != 'CANCELLED'
            AND UPPER(o.paymentStatus) NOT IN ('FAILED', 'REFUNDED')
            """)
    BigDecimal getTotalSpent(@Param("user") User user);
}