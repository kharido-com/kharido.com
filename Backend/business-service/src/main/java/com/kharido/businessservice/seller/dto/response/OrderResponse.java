package com.kharido.businessservice.seller.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {

    private Integer orderId;

    private Integer orderItemId;

    private Integer productId;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;

    private String paymentStatus;

    private String orderStatus;

    private LocalDateTime orderDate;

    private String customerName;
    private String productName;
}