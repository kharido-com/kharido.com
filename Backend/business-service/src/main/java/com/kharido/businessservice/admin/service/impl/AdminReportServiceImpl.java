package com.kharido.businessservice.admin.service.impl;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.ReportResponse;
import com.kharido.businessservice.admin.repository.OrderRepository;
import com.kharido.businessservice.admin.repository.ProductRepository;
import com.kharido.businessservice.admin.repository.SellerRepository;
import com.kharido.businessservice.admin.repository.UserRepository;
import com.kharido.businessservice.admin.service.AdminReportService;

@Service
public class AdminReportServiceImpl implements AdminReportService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public AdminReportServiceImpl(
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
    public ReportResponse getReports() {

        return new ReportResponse(
                userRepository.count(),
                sellerRepository.count(),
                productRepository.count(),
                orderRepository.count()
        );
    }
}