package com.kharido.businessservice.customer.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByApprovalStatusAndStatus(
            String approvalStatus,
            String status);

    List<Product> findByCategoryIdAndApprovalStatusAndStatus(
            Integer categoryId,
            String approvalStatus,
            String status);

    List<Product> findByProductNameContainingIgnoreCaseAndApprovalStatusAndStatus(
            String keyword,
            String approvalStatus,
            String status);

}