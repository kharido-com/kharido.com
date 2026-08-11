package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemResponse {

    private Integer orderItemId;

    private Integer productId;

    private String productName;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;

}