package com.kharido.businessservice.admin.dto;


import java.math.BigDecimal;
import java.time.LocalDateTime;



public class OrderResponse {


    private Integer orderId;

    private Integer customerId;

    private String customerName;

    private BigDecimal totalAmount;

    private String paymentStatus;

    private String orderStatus;

    private LocalDateTime orderDate;



    public OrderResponse() {
    }




    public OrderResponse(
            Integer orderId,
            Integer customerId,
            String customerName,
            BigDecimal totalAmount,
            String paymentStatus,
            String orderStatus,
            LocalDateTime orderDate) {


        this.orderId = orderId;
        this.customerId = customerId;
        this.customerName = customerName;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
        this.orderStatus = orderStatus;
        this.orderDate = orderDate;

    }



    public Integer getOrderId() {
        return orderId;
    }



    public Integer getCustomerId() {
        return customerId;
    }



    public String getCustomerName() {
        return customerName;
    }



    public BigDecimal getTotalAmount() {
        return totalAmount;
    }



    public String getPaymentStatus() {
        return paymentStatus;
    }



    public String getOrderStatus() {
        return orderStatus;
    }



    public LocalDateTime getOrderDate() {
        return orderDate;
    }

}