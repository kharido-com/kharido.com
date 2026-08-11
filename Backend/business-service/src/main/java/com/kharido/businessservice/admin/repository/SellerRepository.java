package com.kharido.businessservice.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.admin.entity.SellerProfile;

public interface SellerRepository 
        extends JpaRepository<SellerProfile, Integer> {


    List<SellerProfile> findByApprovalStatus(String status);

}