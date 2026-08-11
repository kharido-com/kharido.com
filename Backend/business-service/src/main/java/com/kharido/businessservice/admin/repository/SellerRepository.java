package com.kharido.businessservice.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kharido.businessservice.admin.entity.SellerProfile;

public interface SellerRepository 
        extends JpaRepository<SellerProfile, Integer> {


    List<SellerProfile> findByApprovalStatus(String status);

    List<SellerProfile> findByApprovalStatus(String status);

    @Query(value = """
            SELECT p.sellerid, COUNT(p.productid)
            FROM products p
            GROUP BY p.sellerid
            """, nativeQuery = true)
    List<Object[]> getSellerProductCounts();

}