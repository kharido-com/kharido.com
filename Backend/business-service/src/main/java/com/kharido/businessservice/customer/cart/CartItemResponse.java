package com.kharido.businessservice.customer.cart;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class CartItemResponse {

    private Integer cartItemId;

    private Integer productId;

    private String productName;

    private String brand;

    private String imageUrl;

    private BigDecimal price;

    private Integer quantity;

    private BigDecimal subtotal;

}