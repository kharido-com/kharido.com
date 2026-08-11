package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class OrderResponse {

    private Integer orderId;

    private Integer userId;

    private OrderAddressResponse address;

    private LocalDateTime orderDate;

    private BigDecimal totalAmount;

    private PaymentStatus paymentStatus;

    private OrderStatus orderStatus;

    private List<OrderItemResponse> items;

}