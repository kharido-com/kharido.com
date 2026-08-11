package com.kharido.businessservice.seller.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.dto.SellerResponse;
import com.kharido.businessservice.seller.dto.request.UpdateSellerRequest;

@RestController
@RequestMapping("/api/seller")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    @GetMapping("/my-profile")
    public ResponseEntity<SellerResponse> getMyProfile() {

        return ResponseEntity.ok(
                sellerService.getMyProfile());
    }

    @PutMapping("/my-profile")
    public ResponseEntity<SellerResponse> updateMyProfile(
            @RequestBody UpdateSellerRequest request) {

        return ResponseEntity.ok(
                sellerService.updateMyProfile(request));
    }

    @DeleteMapping("/my-profile")
    public ResponseEntity<String> deleteMyProfile() {

        sellerService.deleteMyProfile();

        return ResponseEntity.ok("Profile Deleted Successfully");
    }
}