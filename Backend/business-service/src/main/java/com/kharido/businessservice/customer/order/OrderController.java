package com.kharido.businessservice.customer.order;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            Authentication authentication,
            @RequestBody PlaceOrderRequest request) {

        return new ResponseEntity<>(
                orderService.placeOrder(
                        authentication.getName(),
                        request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(
            Authentication authentication) {

        return ResponseEntity.ok(
                orderService.getMyOrders(
                        authentication.getName()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            Authentication authentication,
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.getOrderById(
                        authentication.getName(),
                        orderId));
    }

    @PatchMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(
            Authentication authentication,
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.cancelOrder(
                        authentication.getName(),
                        orderId));
    }
    
    
    @PostMapping("/{orderId}/payment-success")
    public ResponseEntity<String> paymentSuccess(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.paymentSuccess(orderId));
    }

    @PostMapping("/{orderId}/payment-failed")
    public ResponseEntity<String> paymentFailed(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.paymentFailed(orderId));
    }

    @GetMapping("/{orderId}/tracking")
    public ResponseEntity<List<OrderTrackingResponse>> getTracking(
            @PathVariable Integer orderId) {

        return ResponseEntity.ok(
                orderService.getTracking(orderId));
    }

    @PostMapping("/{orderId}/tracking")
    public ResponseEntity<OrderTrackingResponse> addTrackingEvent(
            @PathVariable Integer orderId,
            @RequestBody UpdateTrackingRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.addTrackingEvent(orderId, request));
    }

}