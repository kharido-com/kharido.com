package com.kharido.businessservice.admin.service.impl;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.OrderResponse;
import com.kharido.businessservice.admin.entity.Order;
import com.kharido.businessservice.admin.repository.OrderRepository;
import com.kharido.businessservice.admin.service.OrderManagementService;



@Service
public class OrderManagementServiceImpl 
        implements OrderManagementService {


    private final OrderRepository orderRepository;



    public OrderManagementServiceImpl(
            OrderRepository orderRepository) {

        this.orderRepository = orderRepository;
    }





    @Override
    public List<OrderResponse> getAllOrders() {


        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }






    @Override
    public List<OrderResponse> getPendingOrders() {


        return orderRepository
                .findByOrderStatus("PLACED")
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }






    @Override
    public String cancelOrder(Integer orderId) {


        Order order = orderRepository.findById(orderId)

                .orElseThrow(
                    () -> new RuntimeException(
                        "Order not found"
                    )
                );



        order.setOrderStatus("CANCELLED");


        orderRepository.save(order);



        return "Order cancelled successfully";

    }







    private OrderResponse mapToResponse(
            Order order) {



        return new OrderResponse(

                order.getOrderId(),

                order.getUser()
                     .getUserId(),

                order.getUser()
                     .getUsername(),

                order.getTotalAmount(),

                order.getPaymentStatus(),

                order.getOrderStatus(),

                order.getOrderDate()

        );

    }

}