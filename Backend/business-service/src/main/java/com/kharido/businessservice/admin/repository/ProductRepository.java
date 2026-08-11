package com.kharido.businessservice.admin.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.admin.entity.Product;


public interface ProductRepository 
        extends JpaRepository<Product, Integer> {


    List<Product> findByApprovalStatus(String status);

}