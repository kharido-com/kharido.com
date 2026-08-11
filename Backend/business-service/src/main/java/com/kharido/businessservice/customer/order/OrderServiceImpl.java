package com.kharido.businessservice.customer.order;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final OrderTrackingRepository orderTrackingRepository;

    public OrderServiceImpl(
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
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository
                .findByAddressIdAndUser(request.getAddressId(), user)
                .orElseThrow(() ->
                        new RuntimeException("Address not found"));

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() ->
                        new RuntimeException("Cart not found"));

        List<CartItem> cartItems =
                cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new RuntimeException(
                        product.getProductName() + " is out of stock.");
            }

            BigDecimal subtotal =
                    cartItem.getPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            totalAmount = totalAmount.add(subtotal);
        }

        Order order = new Order();

        order.setUser(user);
        order.setAddress(address);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
        order.setTotalAmount(totalAmount);

        order = orderRepository.save(order);

        OrderTracking initialTracking = new OrderTracking(
                order,
                "ORDER_PLACED",
                "Kharido Platform",
                address.getCity(),
                address.getState(),
                "Order placed by customer",
                user.getUsername()
        );
        orderTrackingRepository.save(initialTracking);

        List<OrderItemResponse> responseItems =
                new ArrayList<>();

        for (CartItem cartItem : cartItems) {

            Product product = cartItem.getProduct();

            BigDecimal subtotal =
                    cartItem.getPrice()
                            .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setSeller(product.getSeller());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getPrice());
            orderItem.setSubtotal(subtotal);

            orderItemRepository.save(orderItem);

            // NOTE: Stock is NOT deducted here.
            // Stock deduction and cart clearing happen only on paymentSuccess.

            OrderItemResponse dto =
                    new OrderItemResponse();

            dto.setOrderItemId(orderItem.getOrderItemId());
            dto.setProductId(product.getProductId());
            dto.setProductName(product.getProductName());
            dto.setQuantity(orderItem.getQuantity());
            dto.setPrice(orderItem.getPrice());
            dto.setSubtotal(orderItem.getSubtotal());

            responseItems.add(dto);
        }

        // NOTE: Cart is NOT cleared here.
        // Cart is cleared only on paymentSuccess.

        OrderAddressResponse addressResponse =
                new OrderAddressResponse();

        addressResponse.setAddressId(address.getAddressId());
        addressResponse.setAddressName(address.getAddressName());
        addressResponse.setStreet(address.getStreet());
        addressResponse.setCity(address.getCity());
        addressResponse.setState(address.getState());
        addressResponse.setCountry(address.getCountry());
        addressResponse.setPincode(address.getPincode());

        OrderResponse response =
                new OrderResponse();

        response.setOrderId(order.getOrderId());
        response.setUserId(user.getUserId());
        response.setAddress(addressResponse);
        response.setOrderDate(order.getOrderDate());
        response.setTotalAmount(order.getTotalAmount());
        response.setPaymentStatus(order.getPaymentStatus());
        response.setOrderStatus(order.getOrderStatus());
        response.setItems(responseItems);

        return response;
    }
    
    
    @Override
    public List<OrderResponse> getMyOrders(
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Order> orders =
                orderRepository.findByUser(user);

        List<OrderResponse> responseList =
                new ArrayList<>();

        for (Order order : orders) {

            List<OrderItem> orderItems =
                    orderItemRepository.findByOrder(order);

            List<OrderItemResponse> itemResponses =
                    new ArrayList<>();

            for (OrderItem item : orderItems) {

                OrderItemResponse dto =
                        new OrderItemResponse();

                dto.setOrderItemId(item.getOrderItemId());
                dto.setProductId(item.getProduct().getProductId());
                dto.setProductName(item.getProduct().getProductName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getPrice());
                dto.setSubtotal(item.getSubtotal());

                itemResponses.add(dto);
            }

            OrderAddressResponse addressResponse =
                    new OrderAddressResponse();

            addressResponse.setAddressId(order.getAddress().getAddressId());
            addressResponse.setAddressName(order.getAddress().getAddressName());
            addressResponse.setStreet(order.getAddress().getStreet());
            addressResponse.setCity(order.getAddress().getCity());
            addressResponse.setState(order.getAddress().getState());
            addressResponse.setCountry(order.getAddress().getCountry());
            addressResponse.setPincode(order.getAddress().getPincode());

            OrderResponse response =
                    new OrderResponse();

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
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Order does not belong to this user.");
        }

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder(order);

        List<OrderItemResponse> itemResponses =
                new ArrayList<>();

        for (OrderItem item : orderItems) {

            OrderItemResponse dto =
                    new OrderItemResponse();

            dto.setOrderItemId(item.getOrderItemId());
            dto.setProductId(item.getProduct().getProductId());
            dto.setProductName(item.getProduct().getProductName());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());
            dto.setSubtotal(item.getSubtotal());

            itemResponses.add(dto);
        }

        OrderAddressResponse addressResponse =
                new OrderAddressResponse();

        addressResponse.setAddressId(order.getAddress().getAddressId());
        addressResponse.setAddressName(order.getAddress().getAddressName());
        addressResponse.setStreet(order.getAddress().getStreet());
        addressResponse.setCity(order.getAddress().getCity());
        addressResponse.setState(order.getAddress().getState());
        addressResponse.setCountry(order.getAddress().getCountry());
        addressResponse.setPincode(order.getAddress().getPincode());

        OrderResponse response =
                new OrderResponse();

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
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!order.getUser().getUserId().equals(user.getUserId())) {
            throw new RuntimeException("Order does not belong to this user.");
        }

        if (order.getOrderStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Order is already cancelled.");
        }

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder(order);

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

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            return "Payment already completed.";
        }

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder(order);

        User user = order.getUser();

        // Deduct stock for each ordered item
        for (OrderItem item : orderItems) {

            Product product = item.getProduct();

            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException(
                        product.getProductName() + " is out of stock.");
            }

            product.setStockQuantity(
                    product.getStockQuantity() - item.getQuantity());

            productRepository.save(product);
        }

        // Clear the cart now that payment is confirmed
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart != null) {
            List<CartItem> cartItems = cartItemRepository.findByCart(cart);
            cartItemRepository.deleteAll(cartItems);
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
                "SYSTEM"
        );
        orderTrackingRepository.save(paidTracking);

        return "Payment Successful";
    }
    
    @Override
    public String paymentFailed(Integer orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (order.getPaymentStatus() == PaymentStatus.PAID) {
            return "Payment already completed, cannot mark as failed.";
        }

        // Cancel the order and mark payment as failed
        order.setPaymentStatus(PaymentStatus.FAILED);
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        // Add a tracking event for the failure
        OrderTracking failedTracking = new OrderTracking(
                order,
                "PAYMENT_FAILED",
                "Payment Gateway",
                order.getAddress() != null ? order.getAddress().getCity() : "Online",
                order.getAddress() != null ? order.getAddress().getState() : "India",
                "Payment failed. Order cancelled. Cart items restored.",
                "SYSTEM"
        );
        orderTrackingRepository.save(failedTracking);

        // NOTE: Cart is NOT touched here — it was never cleared on placeOrder,
        // so the customer's items are still intact and they can retry.

        return "Payment Failed";
    }

    @Override
    public List<OrderTrackingResponse> getTracking(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<OrderTracking> list = orderTrackingRepository.findByOrderOrderIdOrderByUpdatedAtAsc(orderId);

        if (list.isEmpty()) {
            OrderTracking fallbackPlaced = new OrderTracking(
                    order,
                    "ORDER_PLACED",
                    "Kharido Platform",
                    order.getAddress() != null ? order.getAddress().getCity() : "Mumbai",
                    order.getAddress() != null ? order.getAddress().getState() : "Maharashtra",
                    "Order placed by customer",
                    "CUSTOMER"
            );
            orderTrackingRepository.save(fallbackPlaced);

            if (order.getPaymentStatus() == PaymentStatus.PAID) {
                OrderTracking fallbackPaid = new OrderTracking(
                        order,
                        "PAYMENT_SUCCESSFUL",
                        "Payment Gateway",
                        order.getAddress() != null ? order.getAddress().getCity() : "Mumbai",
                        order.getAddress() != null ? order.getAddress().getState() : "Maharashtra",
                        "Payment confirmed",
                        "SYSTEM"
                );
                orderTrackingRepository.save(fallbackPaid);
            }

            list = orderTrackingRepository.findByOrderOrderIdOrderByUpdatedAtAsc(orderId);
        }

        return list.stream().map(t -> new OrderTrackingResponse(
                t.getTrackingId(),
                t.getOrder().getOrderId(),
                t.getTrackingStatus(),
                t.getLocationName(),
                t.getCity(),
                t.getState(),
                t.getDescription(),
                t.getUpdatedBy(),
                t.getUpdatedAt()
        )).collect(java.util.stream.Collectors.toList());
    }

    @Override
    public OrderTrackingResponse addTrackingEvent(Integer orderId, UpdateTrackingRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderTracking tracking = new OrderTracking(
                order,
                request.getStatus() != null ? request.getStatus().toUpperCase() : "UPDATED",
                request.getLocationName(),
                request.getCity() != null ? request.getCity() : (order.getAddress() != null ? order.getAddress().getCity() : "Hub"),
                request.getState() != null ? request.getState() : (order.getAddress() != null ? order.getAddress().getState() : "State"),
                request.getDescription() != null ? request.getDescription() : "Status updated to " + request.getStatus(),
                request.getUpdatedBy() != null ? request.getUpdatedBy() : "SYSTEM"
        );

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
                tracking.getUpdatedAt()
        );
    }
}