package com.kharido.businessservice.common.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.SellerRepository;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.dto.SellerResponse;
import com.kharido.businessservice.seller.dto.request.UpdateSellerRequest;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;
    @Override
    public Seller getLoggedInSeller() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User is not authenticated");
        }

        String username = authentication.getName();

        System.out.println("\n========== GET LOGGED IN SELLER ==========");
        System.out.println("Authentication Username : " + username);
        System.out.println("Authentication          : " + authentication);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        System.out.println("User Id                 : " + user.getUserId());

        Seller seller = sellerRepository.findByUserId(user.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("Seller profile not found"));

        System.out.println("Seller Id               : " + seller.getSellerId());
        System.out.println("Seller User Id          : " + seller.getUserId());
        System.out.println("=========================================\n");

        return seller;
    }

    @Override
    public SellerResponse getMyProfile() {

        Seller seller = getLoggedInSeller();

        User user = userRepository.findById(seller.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        System.out.println("\n========== GET MY PROFILE ==========");
        System.out.println("User Name      : " + user.getUsername());
        System.out.println("Seller Id      : " + seller.getSellerId());
        System.out.println("Shop Name      : " + seller.getShopName());
        System.out.println("GST Number     : " + seller.getGstNumber());
        System.out.println("Phone          : " + seller.getPhone());
        System.out.println("Approval       : " + seller.getApprovalStatus());
        System.out.println("===================================\n");

        return SellerResponse.builder()
                .sellerId(seller.getSellerId())
                .username(user.getUsername())
                .shopName(seller.getShopName())
                .gstNumber(seller.getGstNumber())
                .phone(seller.getPhone())
                .approvalStatus(seller.getApprovalStatus())
                .build();
    }

    @Override
    public SellerResponse updateMyProfile(UpdateSellerRequest request) {

        Seller seller = getLoggedInSeller();

        seller.setShopName(request.getShopName());
        seller.setGstNumber(request.getGstNumber());
        seller.setPhone(request.getPhone());

        sellerRepository.save(seller);

        User user = userRepository.findById(seller.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        System.out.println("\n========== PROFILE UPDATED ==========");
        System.out.println("User Name      : " + user.getUsername());
        System.out.println("Shop Name      : " + seller.getShopName());
        System.out.println("GST Number     : " + seller.getGstNumber());
        System.out.println("Phone          : " + seller.getPhone());
        System.out.println("=====================================\n");

        return SellerResponse.builder()
                .sellerId(seller.getSellerId())
                .username(user.getUsername())
                .shopName(seller.getShopName())
                .gstNumber(seller.getGstNumber())
                .phone(seller.getPhone())
                .approvalStatus(seller.getApprovalStatus())
                .build();
    }

    @Override
    @Transactional
    public void deleteMyProfile() {

        Seller seller = getLoggedInSeller();

        User user = userRepository.findById(seller.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Delete seller profile
        sellerRepository.delete(seller);

        // Delete user account
        userRepository.delete(user);

        System.out.println("Seller Account Deleted Successfully");
    }
}