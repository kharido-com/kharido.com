package com.kharido.businessservice.customer.cart;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class CartResponse {

    private Integer cartId;

    private Integer userId;

    private List<CartItemResponse> items;

    private BigDecimal totalAmount;
}