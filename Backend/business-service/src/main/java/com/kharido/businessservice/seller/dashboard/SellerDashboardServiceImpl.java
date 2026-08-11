package com.kharido.businessservice.seller.dashboard;

import java.math.BigDecimal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.SellerRepository;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.security.CustomUserDetails;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.OrderItemRepository;
import com.kharido.businessservice.seller.repository.ProductRepository;

@Service
public class SellerDashboardServiceImpl
        implements SellerDashboardService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    public SellerDashboardServiceImpl(
            UserRepository userRepository,
            SellerRepository sellerRepository,
            ProductRepository productRepository,
            OrderItemRepository orderItemRepository) {

        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    public SellerDashboardDTO getDashboard() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        CustomUserDetails customUser =
                (CustomUserDetails) authentication.getPrincipal();

        Integer userId =
                customUser.getUser().getUserId();

        User user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException("User not found"));

        Seller seller =
                sellerRepository.findByUserId(user.getUserId())
                        .orElseThrow(() ->
                                new RuntimeException("Seller not found"));
        Integer sellerId = seller.getSellerId();

        long totalProducts =
                productRepository.findBySellerId(sellerId).size();

        long totalOrders =
                orderItemRepository.getTotalOrders(sellerId);

        long pendingOrders =
                orderItemRepository.getPendingOrders(sellerId);

        BigDecimal revenue =
                orderItemRepository.getTotalRevenue(sellerId);

        return SellerDashboardDTO.builder()
                .username(user.getUsername())
                .shopName(seller.getShopName())
                .totalProducts((int) totalProducts)
                .totalOrders((int) totalOrders)
                .pendingOrders((int) pendingOrders)
                .totalRevenue(revenue)
                .build();

    }

}