package com.kharido.businessservice.admin.service;

import java.util.List;

import com.kharido.businessservice.admin.dto.ProductResponse;


public interface ProductManagementService {


    List<ProductResponse> getAllProducts();


    List<ProductResponse> getPendingProducts();


    String approveProduct(Integer productId);


    String rejectProduct(Integer productId);


    String deleteProduct(Integer productId);

}