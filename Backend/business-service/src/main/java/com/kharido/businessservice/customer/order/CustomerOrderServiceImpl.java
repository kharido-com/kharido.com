package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.address.Address;
import com.kharido.businessservice.customer.address.AddressRepository;
import com.kharido.businessservice.customer.cart.Cart;
import com.kharido.businessservice.customer.cart.CartItem;
import com.kharido.businessservice.customer.cart.CartItemRepository;
import com.kharido.businessservice.customer.cart.CartRepository;
import com.kharido.businessservice.customer.product.Product;
import com.kharido.businessservice.customer.product.ProductRepository;

@Service
@Transactional
public class CustomerOrderServiceImpl implements OrderService {

        private final OrderRepository orderRepository;
        private final OrderItemRepository orderItemRepository;
        private final UserRepository userRepository;
        private final AddressRepository addressRepository;
        private final CartRepository cartRepository;
        private final CartItemRepository cartItemRepository;
        private final ProductRepository productRepository;
        private final OrderTrackingRepository orderTrackingRepository;

        public CustomerOrderServiceImpl(
                        OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        UserRepository userRepository,
                        AddressRepository addressRepository,
                        CartRepository cartRepository,
                        CartItemRepository cartItemRepository,
                        ProductRepository productRepository,
                        OrderTrackingRepository orderTrackingRepository) {

                this.orderRepository = orderRepository;
                this.orderItemRepository = orderItemRepository;
                this.userRepository = userRepository;
                this.addressRepository = addressRepository;
                this.cartRepository = cartRepository;
                this.cartItemRepository = cartItemRepository;
                this.productRepository = productRepository;
                this.orderTrackingRepository = orderTrackingRepository;
        }

        @Override
        public OrderResponse placeOrder(
                        String username,
                        PlaceOrderRequest request) {

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Address address = addressRepository
                                .findByAddressIdAndUser(request.getAddressId(), user)
                                .orElseThrow(() -> new RuntimeException("Address not found"));

                Cart cart = cartRepository.findByUser(user)
                                .orElseThrow(() -> new RuntimeException("Cart not found"));

                List<CartItem> cartItems = cartItemRepository.findByCart(cart);

                if (cartItems.isEmpty()) {
                        throw new RuntimeException("Cart is empty.");
                }

                // Check stock and group cart items by seller ID
                BigDecimal grandTotalAmount = BigDecimal.ZERO;
                Map<Integer, List<CartItem>> itemsBySeller = new LinkedHashMap<>();
                Map<Integer, User> sellerMap = new HashMap<>();

                for (CartItem cartItem : cartItems) {
                        Product product = cartItem.getProduct();
                        if (product.getStockQuantity() < cartItem.getQuantity()) {
                                throw new RuntimeException(
                                                product.getProductName() + " is out of stock.");
                        }
                        BigDecimal subtotal = cartItem.getPrice()
                                        .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
                        grandTotalAmount = grandTotalAmount.add(subtotal);

                        User seller = product.getSeller();
                        Integer sellerId = seller != null ? seller.getUserId() : 0;
                        if (seller != null) {
                                sellerMap.put(sellerId, seller);
                        }
                        itemsBySeller.computeIfAbsent(sellerId, k -> new ArrayList<>()).add(cartItem);
                }

                Order primaryOrder = null;
                List<OrderItemResponse> allItemResponses = new ArrayList<>();
                
                System.out.println("--------------");

                for (Map.Entry<Integer, List<CartItem>> e : itemsBySeller.entrySet()) {

                    System.out.println("Seller : " + e.getKey());

                    for (CartItem c : e.getValue()) {

                        System.out.println(
                            "Product = " +
                            c.getProduct().getProductId() +
                            " Seller = " +
                            c.getProduct().getSeller().getUserId()
                        );
                    }
                }

                // Create a distinct Order per seller
                for (Map.Entry<Integer, List<CartItem>> entry : itemsBySeller.entrySet()) {
                        Integer sellerId = entry.getKey();
                        User seller = sellerMap.get(sellerId);
                        List<CartItem> sellerItems = entry.getValue();

                        BigDecimal sellerTotalAmount = BigDecimal.ZERO;
                        for (CartItem item : sellerItems) {
                                BigDecimal subtotal = item.getPrice()
                                                .multiply(BigDecimal.valueOf(item.getQuantity()));
                                sellerTotalAmount = sellerTotalAmount.add(subtotal);
                        }

                        Order order = new Order();
                        order.setUser(user);
                        order.setAddress(address);
                        order.setPaymentStatus(PaymentStatus.PENDING);
                        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
                        order.setTotalAmount(sellerTotalAmount);

                        order = orderRepository.save(order);

                        if (primaryOrder == null) {
                                primaryOrder = order;
                        }

                        OrderTracking initialTracking = new OrderTracking(
                                        order,
                                        "ORDER_PLACED",
                                        "Kharido Platform",
                                        address.getCity(),
                                        address.getState(),
                                        "Order placed by customer",
                                        user.getUsername());
                        orderTrackingRepository.save(initialTracking);

                        for (CartItem cartItem : sellerItems) {
                                Product product = cartItem.getProduct();
                                BigDecimal subtotal = cartItem.getPrice()
                                                .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

                                OrderItem orderItem = new OrderItem();
                                orderItem.setOrder(order);
                                orderItem.setProduct(product);
                                orderItem.setSeller(seller != null ? seller : product.getSeller());
                                orderItem.setQuantity(cartItem.getQuantity());
                                orderItem.setPrice(cartItem.getPrice());
                                orderItem.setSubtotal(subtotal);

                                orderItemRepository.save(orderItem);

                                OrderItemResponse dto = new OrderItemResponse();
                                dto.setOrderItemId(orderItem.getOrderItemId());
                                dto.setProductId(product.getProductId());
                                dto.setProductName(product.getProductName());
                                dto.setQuantity(orderItem.getQuantity());
                                dto.setPrice(orderItem.getPrice());
                                dto.setSubtotal(orderItem.getSubtotal());

                                allItemResponses.add(dto);
                        }
                }

                OrderAddressResponse addressResponse = new OrderAddressResponse();
                addressResponse.setAddressId(address.getAddressId());
                addressResponse.setAddressName(address.getAddressName());
                addressResponse.setStreet(address.getStreet());
                addressResponse.setCity(address.getCity());
                addressResponse.setState(address.getState());
                addressResponse.setCountry(address.getCountry());
                addressResponse.setPincode(address.getPincode());

                OrderResponse response = new OrderResponse();
                response.setOrderId(primaryOrder.getOrderId());
                response.setUserId(user.getUserId());
                response.setAddress(addressResponse);
                response.setOrderDate(primaryOrder.getOrderDate());
                response.setTotalAmount(grandTotalAmount);
                response.setPaymentStatus(primaryOrder.getPaymentStatus());
                response.setOrderStatus(primaryOrder.getOrderStatus());
                response.setItems(allItemResponses);

                return response;
        }

        @Override
        public List<OrderResponse> getMyOrders(
                        String username) {

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<Order> orders = orderRepository.findByUserOrderByOrderDateDescOrderIdDesc(user);

                List<OrderResponse> responseList = new ArrayList<>();

                for (Order order : orders) {

                        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

                        List<OrderItemResponse> itemResponses = new ArrayList<>();

                        for (OrderItem item : orderItems) {

                                OrderItemResponse dto = new OrderItemResponse();

                                dto.setOrderItemId(item.getOrderItemId());
                                dto.setProductId(item.getProduct().getProductId());
                                dto.setProductName(item.getProduct().getProductName());
                                dto.setQuantity(item.getQuantity());
                                dto.setPrice(item.getPrice());
                                dto.setSubtotal(item.getSubtotal());

                                itemResponses.add(dto);
                        }

                        OrderAddressResponse addressResponse = new OrderAddressResponse();

                        addressResponse.setAddressId(order.getAddress().getAddressId());
                        addressResponse.setAddressName(order.getAddress().getAddressName());
                        addressResponse.setStreet(order.getAddress().getStreet());
                        addressResponse.setCity(order.getAddress().getCity());
                        addressResponse.setState(order.getAddress().getState());
                        addressResponse.setCountry(order.getAddress().getCountry());
                        addressResponse.setPincode(order.getAddress().getPincode());

                        OrderResponse response = new OrderResponse();

                        response.setOrderId(order.getOrderId());
                        response.setUserId(user.getUserId());
                        response.setAddress(addressResponse);
                        response.setOrderDate(order.getOrderDate());
                        response.setTotalAmount(order.getTotalAmount());
                        response.setPaymentStatus(order.getPaymentStatus());
                        response.setOrderStatus(order.getOrderStatus());
                        response.setItems(itemResponses);

                        responseList.add(response);
                }

                return responseList;
        }

        @Override
        public OrderResponse getOrderById(
                        String username,
                        Integer orderId) {

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (!order.getUser().getUserId().equals(user.getUserId())) {
                        throw new RuntimeException("Order does not belong to this user.");
                }

                List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

                List<OrderItemResponse> itemResponses = new ArrayList<>();

                for (OrderItem item : orderItems) {

                        OrderItemResponse dto = new OrderItemResponse();

                        dto.setOrderItemId(item.getOrderItemId());
                        dto.setProductId(item.getProduct().getProductId());
                        dto.setProductName(item.getProduct().getProductName());
                        dto.setQuantity(item.getQuantity());
                        dto.setPrice(item.getPrice());
                        dto.setSubtotal(item.getSubtotal());

                        itemResponses.add(dto);
                }

                OrderAddressResponse addressResponse = new OrderAddressResponse();

                addressResponse.setAddressId(order.getAddress().getAddressId());
                addressResponse.setAddressName(order.getAddress().getAddressName());
                addressResponse.setStreet(order.getAddress().getStreet());
                addressResponse.setCity(order.getAddress().getCity());
                addressResponse.setState(order.getAddress().getState());
                addressResponse.setCountry(order.getAddress().getCountry());
                addressResponse.setPincode(order.getAddress().getPincode());

                OrderResponse response = new OrderResponse();

                response.setOrderId(order.getOrderId());
                response.setUserId(user.getUserId());
                response.setAddress(addressResponse);
                response.setOrderDate(order.getOrderDate());
                response.setTotalAmount(order.getTotalAmount());
                response.setPaymentStatus(order.getPaymentStatus());
                response.setOrderStatus(order.getOrderStatus());
                response.setItems(itemResponses);

                return response;
        }

        @Override
        public String cancelOrder(
                        String username,
                        Integer orderId) {

                User user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (!order.getUser().getUserId().equals(user.getUserId())) {
                        throw new RuntimeException("Order does not belong to this user.");
                }

                OrderStatus currentStatus = order.getOrderStatus();
                if (currentStatus == OrderStatus.DELIVERED
                                || currentStatus == OrderStatus.SHIPPED
                                || currentStatus == OrderStatus.DISPATCHED
                                || currentStatus == OrderStatus.CANCELLED) {
                        throw new IllegalArgumentException("Order can no longer be cancelled.");
                }

                List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

                for (OrderItem item : orderItems) {

                        Product product = item.getProduct();

                        product.setStockQuantity(
                                        product.getStockQuantity() + item.getQuantity());

                        productRepository.save(product);
                }

                order.setOrderStatus(OrderStatus.CANCELLED);

                orderRepository.save(order);

                return "Order cancelled successfully.";
        }

        @Override
        public String paymentSuccess(Integer orderId) {

                Order primaryOrder = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (primaryOrder.getPaymentStatus() == PaymentStatus.PAID) {
                        return "Payment already completed.";
                }

                User user = primaryOrder.getUser();

                // Find all PENDING_PAYMENT orders for this user
                List<Order> pendingOrders = orderRepository.findByUser(user).stream()
                                .filter(o -> o.getPaymentStatus() == PaymentStatus.PENDING)
                                .toList();

                if (pendingOrders.isEmpty()) {
                        pendingOrders = List.of(primaryOrder);
                }

                for (Order order : pendingOrders) {
                        List<OrderItem> orderItems = orderItemRepository.findByOrder(order);

                        // Deduct stock for each ordered item in this seller order
                        for (OrderItem item : orderItems) {
                                Product product = item.getProduct();
                                product.setStockQuantity(Math.max(0, product.getStockQuantity() - item.getQuantity()));
                                productRepository.save(product);
                        }

                        order.setPaymentStatus(PaymentStatus.PAID);
                        order.setOrderStatus(OrderStatus.PLACED);
                        orderRepository.save(order);

                        OrderTracking paidTracking = new OrderTracking(
                                        order,
                                        "PAYMENT_SUCCESSFUL",
                                        "Payment Gateway",
                                        order.getAddress() != null ? order.getAddress().getCity() : "Online",
                                        order.getAddress() != null ? order.getAddress().getState() : "India",
                                        "Payment completed successfully",
                                        "SYSTEM");
                        orderTrackingRepository.save(paidTracking);
                }

                // Clear the cart now that payment is confirmed
                Cart cart = cartRepository.findByUser(user).orElse(null);
                if (cart != null) {
                        List<CartItem> cartItems = cartItemRepository.findByCart(cart);
                        cartItemRepository.deleteAll(cartItems);
                }

                return "Payment Successful";
        }

        @Override
        public String paymentFailed(Integer orderId) {

                Order primaryOrder = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (primaryOrder.getPaymentStatus() == PaymentStatus.PAID) {
                        return "Payment already completed, cannot mark as failed.";
                }

                User user = primaryOrder.getUser();
                List<Order> pendingOrders = orderRepository.findByUser(user).stream()
                                .filter(o -> o.getPaymentStatus() == PaymentStatus.PENDING)
                                .toList();

                if (pendingOrders.isEmpty()) {
                        pendingOrders = List.of(primaryOrder);
                }

                for (Order order : pendingOrders) {
                        order.setPaymentStatus(PaymentStatus.FAILED);
                        order.setOrderStatus(OrderStatus.CANCELLED);
                        orderRepository.save(order);

                        OrderTracking failedTracking = new OrderTracking(
                                        order,
                                        "PAYMENT_FAILED",
                                        "Payment Gateway",
                                        order.getAddress() != null ? order.getAddress().getCity() : "Online",
                                        order.getAddress() != null ? order.getAddress().getState() : "India",
                                        "Payment failed. Order cancelled. Cart items restored.",
                                        "SYSTEM");
                        orderTrackingRepository.save(failedTracking);
                }

                // NOTE: Cart is NOT touched here — it was never cleared on placeOrder,
                // so the customer's items are still intact and they can retry.

                return "Payment Failed";
        }

        public void syncTrackingEventsForOrder(Order order) {
                if (order == null || order.getOrderId() == null)
                        return;

                List<OrderTracking> existing = orderTrackingRepository
                                .findByOrderOrderIdOrderByUpdatedAtAsc(order.getOrderId());
                java.util.Set<String> existingStatuses = existing.stream()
                                .map(t -> t.getTrackingStatus() != null ? t.getTrackingStatus().toUpperCase() : "")
                                .collect(java.util.stream.Collectors.toSet());

                String city = order.getAddress() != null ? order.getAddress().getCity() : "Hub";
                String state = order.getAddress() != null ? order.getAddress().getState() : "State";

                // 1. ORDER_PLACED
                if (!existingStatuses.contains("ORDER_PLACED")) {
                        OrderTracking placed = new OrderTracking(
                                        order, "ORDER_PLACED", "Kharido Platform", city, state,
                                        "Order placed by customer", "CUSTOMER");
                        orderTrackingRepository.save(placed);
                        existingStatuses.add("ORDER_PLACED");
                }

                // 2. PAYMENT_SUCCESSFUL
                if (order.getPaymentStatus() == PaymentStatus.PAID
                                && !existingStatuses.contains("PAYMENT_SUCCESSFUL")) {
                        OrderTracking paid = new OrderTracking(
                                        order, "PAYMENT_SUCCESSFUL", "Payment Gateway", city, state,
                                        "Payment confirmed", "SYSTEM");
                        orderTrackingRepository.save(paid);
                        existingStatuses.add("PAYMENT_SUCCESSFUL");
                }

                String currentStatusStr = order.getOrderStatus() != null ? order.getOrderStatus().name().toUpperCase()
                                : "";

                // Map status hierarchy
                List<String> targetStages = new java.util.ArrayList<>();
                if (currentStatusStr.equals("ACCEPTED") || currentStatusStr.equals("SELLER_ACCEPTED")
                                || currentStatusStr.equals("APPROVED") || currentStatusStr.equals("PROCESSING")) {
                        targetStages.add("SELLER_ACCEPTED");
                } else if (currentStatusStr.equals("PACKED")) {
                        targetStages.add("SELLER_ACCEPTED");
                        targetStages.add("PACKED");
                } else if (currentStatusStr.equals("DISPATCHED") || currentStatusStr.equals("SHIPPED")
                                || currentStatusStr.equals("IN_TRANSIT")) {
                        targetStages.add("SELLER_ACCEPTED");
                        targetStages.add("PACKED");
                        targetStages.add("DISPATCHED");
                } else if (currentStatusStr.equals("WAREHOUSE_RECEIVED") || currentStatusStr.equals("WAREHOUSE")
                                || currentStatusStr.equals("HUB_RECEIVED")) {
                        targetStages.add("SELLER_ACCEPTED");
                        targetStages.add("PACKED");
                        targetStages.add("DISPATCHED");
                        targetStages.add("WAREHOUSE_RECEIVED");
                } else if (currentStatusStr.equals("OUT_FOR_DELIVERY")) {
                        targetStages.add("SELLER_ACCEPTED");
                        targetStages.add("PACKED");
                        targetStages.add("DISPATCHED");
                        targetStages.add("WAREHOUSE_RECEIVED");
                        targetStages.add("OUT_FOR_DELIVERY");
                } else if (currentStatusStr.equals("DELIVERED") || currentStatusStr.equals("COMPLETED")) {
                        targetStages.add("SELLER_ACCEPTED");
                        targetStages.add("PACKED");
                        targetStages.add("DISPATCHED");
                        targetStages.add("WAREHOUSE_RECEIVED");
                        targetStages.add("OUT_FOR_DELIVERY");
                        targetStages.add("DELIVERED");
                } else if (currentStatusStr.equals("CANCELLED")) {
                        targetStages.add("CANCELLED");
                }

                for (String stage : targetStages) {
                        if (!existingStatuses.contains(stage)) {
                                String desc = "Order status updated to " + stage;
                                String updatedBy = "SELLER";
                                if (stage.equals("SELLER_ACCEPTED"))
                                        desc = "Seller accepted the order";
                                if (stage.equals("PACKED"))
                                        desc = "Order packed and ready for dispatch";
                                if (stage.equals("DISPATCHED"))
                                        desc = "Package dispatched from seller facility";
                                if (stage.equals("WAREHOUSE_RECEIVED"))
                                        desc = "Package received at logistics warehouse";
                                if (stage.equals("OUT_FOR_DELIVERY"))
                                        desc = "Package out for delivery with delivery partner";
                                if (stage.equals("DELIVERED"))
                                        desc = "Order delivered to customer";

                                OrderTracking tracking = new OrderTracking(
                                                order, stage, "Kharido Logistics", city, state, desc, updatedBy);
                                orderTrackingRepository.save(tracking);
                                existingStatuses.add(stage);
                        }
                }
        }

        @Override
        public List<OrderTrackingResponse> getTracking(Integer orderId) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                syncTrackingEventsForOrder(order);

                List<OrderTracking> list = orderTrackingRepository.findByOrderOrderIdOrderByUpdatedAtAsc(orderId);

                return list.stream().map(t -> new OrderTrackingResponse(
                                t.getTrackingId(),
                                t.getOrder().getOrderId(),
                                t.getTrackingStatus(),
                                t.getLocationName(),
                                t.getCity(),
                                t.getState(),
                                t.getDescription(),
                                t.getUpdatedBy(),
                                t.getUpdatedAt())).collect(java.util.stream.Collectors.toList());
        }

        @Override
        public OrderTrackingResponse addTrackingEvent(Integer orderId, UpdateTrackingRequest request) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                OrderTracking tracking = new OrderTracking(
                                order,
                                request.getStatus() != null ? request.getStatus().toUpperCase() : "UPDATED",
                                request.getLocationName(),
                                request.getCity() != null ? request.getCity()
                                                : (order.getAddress() != null ? order.getAddress().getCity() : "Hub"),
                                request.getState() != null ? request.getState()
                                                : (order.getAddress() != null ? order.getAddress().getState()
                                                                : "State"),
                                request.getDescription() != null ? request.getDescription()
                                                : "Status updated to " + request.getStatus(),
                                request.getUpdatedBy() != null ? request.getUpdatedBy() : "SYSTEM");

                tracking = orderTrackingRepository.save(tracking);

                return new OrderTrackingResponse(
                                tracking.getTrackingId(),
                                order.getOrderId(),
                                tracking.getTrackingStatus(),
                                tracking.getLocationName(),
                                tracking.getCity(),
                                tracking.getState(),
                                tracking.getDescription(),
                                tracking.getUpdatedBy(),
                                tracking.getUpdatedAt());
        }

        @Override
        public String updateOrderStatus(Integer orderId, String newStatus) {
                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

                if (newStatus != null && !newStatus.trim().isEmpty()) {
                        String upper = newStatus.trim().toUpperCase();
                        try {
                                order.setOrderStatus(OrderStatus.valueOf(upper));
                        } catch (Exception e) {
                                // If enum parsing fails
                        }
                        orderRepository.save(order);
                        syncTrackingEventsForOrder(order);
                }

                return "Order status updated to " + newStatus;
        }
}