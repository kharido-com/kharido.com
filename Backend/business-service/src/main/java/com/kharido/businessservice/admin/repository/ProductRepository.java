package com.kharido.businessservice.admin.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.admin.entity.Product;


public interface ProductRepository 
        extends JpaRepository<Product, Integer> {


    List<Product> findByApprovalStatus(String status);

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kharido.businessservice.admin.entity.Product;

public interface ProductRepository 
        extends JpaRepository<Product, Integer> {

    List<Product> findByApprovalStatus(String status);

    @Query(value = """
            SELECT oi.productid, COALESCE(SUM(oi.quantity), 0)
            FROM order_items oi
            JOIN orders o ON oi.orderid = o.orderid
            WHERE (o.order_status IS NULL OR UPPER(o.order_status) != 'CANCELLED')
            AND (o.payment_status IS NULL OR UPPER(o.payment_status) NOT IN ('FAILED', 'REFUNDED'))
            GROUP BY oi.productid
            """, nativeQuery = true)
    List<Object[]> getProductOrdersAggregates();

    @Query(value = """
            SELECT COALESCE(SUM(oi.quantity), 0)
            FROM order_items oi
            JOIN orders o ON oi.orderid = o.orderid
            WHERE oi.productid = :productId
            AND (o.order_status IS NULL OR UPPER(o.order_status) != 'CANCELLED')
            AND (o.payment_status IS NULL OR UPPER(o.payment_status) NOT IN ('FAILED', 'REFUNDED'))
            """, nativeQuery = true)
    Long countOrdersByProductId(@Param("productId") Integer productId);

}