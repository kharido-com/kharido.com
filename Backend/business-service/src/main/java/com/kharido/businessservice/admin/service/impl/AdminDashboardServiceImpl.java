package com.kharido.businessservice.admin.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.AdminProfileResponse;
import com.kharido.businessservice.admin.dto.DashboardResponse;
import com.kharido.businessservice.admin.dto.ReportResponse;
import com.kharido.businessservice.admin.entity.User;
import com.kharido.businessservice.admin.repository.OrderRepository;
import com.kharido.businessservice.admin.repository.ProductRepository;
import com.kharido.businessservice.admin.repository.SellerRepository;
import com.kharido.businessservice.admin.repository.UserRepository;
import com.kharido.businessservice.admin.service.AdminService;

@Service
public class AdminDashboardServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminDashboardServiceImpl(
            UserRepository userRepository,
            SellerRepository sellerRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository) {

        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public DashboardResponse getDashboard() {

        return new DashboardResponse(
                userRepository.count(),
                sellerRepository.count(),
                productRepository.count(),
                orderRepository.count()
        );
    }

    @Override
    public ReportResponse getReports() {

        return new ReportResponse(
                userRepository.count(),
                sellerRepository.count(),
                productRepository.count(),
                orderRepository.count()
        );
    }

    @Override
    public AdminProfileResponse getProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User admin = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        return new AdminProfileResponse(
                admin.getUserId(),
                admin.getUsername(),
                admin.getEmail(),
                admin.getRole().getRoleName(),
                admin.getStatus(),
                admin.getCreatedAt()
        );
    }
}