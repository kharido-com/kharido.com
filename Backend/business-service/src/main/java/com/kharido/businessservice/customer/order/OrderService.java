package com.kharido.businessservice.customer.order;

import java.util.List;

public interface OrderService {

    OrderResponse placeOrder(
            String username,
            PlaceOrderRequest request);

    List<OrderResponse> getMyOrders(
            String username);

    OrderResponse getOrderById(
            String username,
            Integer orderId);

    String cancelOrder(
            String username,
            Integer orderId);
    
    String paymentSuccess(Integer orderId);

    String paymentFailed(Integer orderId);

    List<OrderTrackingResponse> getTracking(Integer orderId);

    OrderTrackingResponse addTrackingEvent(Integer orderId, UpdateTrackingRequest request);

    String updateOrderStatus(Integer orderId, String status);
}