package com.kharido.businessservice.admin.service;

import java.util.List;

import com.kharido.businessservice.admin.dto.OrderResponse;


public interface OrderManagementService {


    List<OrderResponse> getAllOrders();


    List<OrderResponse> getPendingOrders();


    String cancelOrder(Integer orderId);

}