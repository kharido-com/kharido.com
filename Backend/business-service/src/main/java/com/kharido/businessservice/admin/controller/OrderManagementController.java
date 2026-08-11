package com.kharido.businessservice.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.admin.dto.OrderResponse;
import com.kharido.businessservice.admin.service.OrderManagementService;


@RestController
@RequestMapping("/api/admin/orders")
public class OrderManagementController {


    private final OrderManagementService orderManagementService;


    public OrderManagementController(
            OrderManagementService orderManagementService) {

        this.orderManagementService = orderManagementService;
    }



    // View all orders
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderManagementService.getAllOrders()
        );
    }



    // View pending orders
    @GetMapping("/pending")
    public ResponseEntity<List<OrderResponse>> getPendingOrders() {

        return ResponseEntity.ok(
                orderManagementService.getPendingOrders()
        );
    }



    // Cancel order by admin
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(
            @PathVariable Integer orderId) {


        return ResponseEntity.ok(
                orderManagementService.cancelOrder(orderId)
        );
    }

}