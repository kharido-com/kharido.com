package com.kharido.businessservice.common.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.address.AddressRepository;
import com.kharido.businessservice.customer.order.CustomerOrderServiceImpl;
import com.kharido.businessservice.customer.repository.CustomerProfileRepository;
import com.kharido.businessservice.seller.OrderService;
import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.dto.response.OrderResponse;
import com.kharido.businessservice.seller.entity.OrderItem;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.OrderItemRepository;
import com.kharido.businessservice.seller.repository.OrderRepository;
import com.kharido.businessservice.seller.repository.ProductRepository;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderRepository sellerOrderRepository;

    @Autowired
    private com.kharido.businessservice.customer.order.OrderRepository customerOrderRepository;

    @Autowired
    private CustomerOrderServiceImpl customerOrderService;

    @Autowired
    private SellerService sellerService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerProfileRepository customerProfileRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<OrderResponse> getSellerOrders() {

        Seller seller = sellerService.getLoggedInSeller();

        List<OrderItem> orderItems = orderItemRepository.findBySellerId(seller.getSellerId());

        return orderItems.stream()
                .map(item -> {

                    String productName = "";
                    String customerName = "";
                    String shippingAddress = "";

                    // Product Name
                    var product = productRepository.findById(item.getProductId());
                    if (product.isPresent()) {
                        productName = product.get().getProductName();
                    }

                    // Customer Name & Address
                    var user = userRepository.findById(item.getOrder().getUserId());
                    if (user.isPresent()) {
                        var customer = customerProfileRepository.findByUser(user.get());
                        if (customer.isPresent()) {
                            customerName = customer.get().getFirstName() + " " + customer.get().getLastName();
                        }

                        // Fetch Shipping Address by order.addressId or default user address
                        if (item.getOrder().getAddressId() != null) {
                            var addrOpt = addressRepository.findById(item.getOrder().getAddressId());
                            if (addrOpt.isPresent()) {
                                var addr = addrOpt.get();
                                shippingAddress = String.format("%s, %s, %s - %s",
                                        addr.getStreet(), addr.getCity(), addr.getState(), addr.getPincode());
                            }
                        }

                        if (shippingAddress.isEmpty()) {
                            var addrs = addressRepository.findByUser(user.get());
                            if (!addrs.isEmpty()) {
                                var addr = addrs.get(0);
                                shippingAddress = String.format("%s, %s, %s - %s",
                                        addr.getStreet(), addr.getCity(), addr.getState(), addr.getPincode());
                            }
                        }
                    }

                    if (shippingAddress.isEmpty()) {
                        shippingAddress = "Address Not Specified";
                    }

                    return OrderResponse.builder()
                            .orderId(item.getOrder().getOrderId())
                            .orderItemId(item.getOrderItemId())
                            .productId(item.getProductId())
                            .productName(productName)
                            .customerName(customerName)
                            .customerAddress(shippingAddress)
                            .shippingAddress(shippingAddress)
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .subtotal(item.getSubtotal())
                            .paymentStatus(item.getOrder().getPaymentStatus())
                            .orderStatus(item.getOrder().getOrderStatus())
                            .orderDate(item.getOrder().getOrderDate())
                            .build();

                })
                .toList();
    }

    private boolean isValidTransition(String currentStatus, String newStatus) {
        if (currentStatus == null || newStatus == null) {
            return false;
        }
        String c = currentStatus.trim().toUpperCase();
        String n = newStatus.trim().toUpperCase();

        if (c.equals("CANCELLED") || c.equals("DELIVERED")) {
            return false;
        }

        switch (c) {
            case "PENDING_PAYMENT":
                return n.equals("PLACED");
            case "PLACED":
                return n.equals("PROCESSING");
            case "PROCESSING":
                return n.equals("DISPATCHED");
            case "DISPATCHED":
                return n.equals("SHIPPED");
            case "SHIPPED":
                return n.equals("DELIVERED");
            default:
                return false;
        }
    }

    @Override
    public OrderResponse updateOrderStatus(Integer orderId, String status) {
        if (status == null || status.trim().isEmpty()) {
            throw new IllegalArgumentException("Order status parameter is required");
        }

        String upperStatus = status.trim().toUpperCase();

        // 1. Load latest order from database
        var sellerOrderOpt = sellerOrderRepository.findById(orderId);
        if (sellerOrderOpt.isEmpty()) {
            throw new IllegalArgumentException("Order not found with id: " + orderId);
        }

        var order = sellerOrderOpt.get();
        String currentStatus = order.getOrderStatus() != null ? order.getOrderStatus().trim().toUpperCase() : "";

        // 2. Reject updates if order is in terminal state
        if ("CANCELLED".equals(currentStatus) || "DELIVERED".equals(currentStatus)) {
            throw new IllegalArgumentException("Order status cannot be changed.");
        }

        // 3. Validate transition against state machine
        if (!isValidTransition(currentStatus, upperStatus)) {
            throw new IllegalArgumentException("Invalid order status transition.");
        }

        // 4. Update seller entity order
        order.setOrderStatus(upperStatus);
        sellerOrderRepository.save(order);

        // 5. Update customer entity order (enum)
        var customerOrderOpt = customerOrderRepository.findById(orderId);
        if (customerOrderOpt.isPresent()) {
            var cOrder = customerOrderOpt.get();
            try {
                cOrder.setOrderStatus(com.kharido.businessservice.customer.order.OrderStatus.valueOf(upperStatus));
                customerOrderRepository.save(cOrder);
                customerOrderService.syncTrackingEventsForOrder(cOrder);
            } catch (Exception e) {
                System.err.println("Could not map order status enum: " + e.getMessage());
            }
        }

        List<OrderResponse> orders = getSellerOrders();
        return orders.stream()
                .filter(o -> o.getOrderId().equals(orderId))
                .findFirst()
                .orElse(OrderResponse.builder()
                        .orderId(orderId)
                        .orderStatus(upperStatus)
                        .build());
    }
}