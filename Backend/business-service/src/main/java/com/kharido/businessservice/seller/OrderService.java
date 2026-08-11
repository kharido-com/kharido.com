package com.kharido.businessservice.seller;

import java.util.List;

import com.kharido.businessservice.seller.dto.response.OrderResponse;

public interface OrderService {

    List<OrderResponse> getSellerOrders();

}