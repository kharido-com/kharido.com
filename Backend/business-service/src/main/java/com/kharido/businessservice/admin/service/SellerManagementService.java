package com.kharido.businessservice.admin.service;

import java.util.List;

import com.kharido.businessservice.admin.dto.SellerResponse;

public interface SellerManagementService {


    List<SellerResponse> getAllSellers();


    List<SellerResponse> getPendingSellers();


    String approveSeller(Integer sellerId);


    String rejectSeller(Integer sellerId);


    String blockSeller(Integer sellerId);


    String activateSeller(Integer sellerId);

}