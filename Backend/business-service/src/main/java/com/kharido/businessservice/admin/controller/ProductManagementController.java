package com.kharido.businessservice.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.admin.dto.ProductResponse;
import com.kharido.businessservice.admin.service.ProductManagementService;


@RestController
@RequestMapping("/api/admin/products")
public class ProductManagementController {


    private final ProductManagementService productManagementService;


    public ProductManagementController(
            ProductManagementService productManagementService) {

        this.productManagementService = productManagementService;
    }



    // Get all products
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        return ResponseEntity.ok(
                productManagementService.getAllProducts()
        );
    }



    // Get pending products
    @GetMapping("/pending")
    public ResponseEntity<List<ProductResponse>> getPendingProducts() {

        return ResponseEntity.ok(
                productManagementService.getPendingProducts()
        );
    }



    // Approve product
    @PutMapping("/{productId}/approve")
    public ResponseEntity<String> approveProduct(
            @PathVariable Integer productId) {

        return ResponseEntity.ok(
                productManagementService.approveProduct(productId)
        );
    }



    // Reject product
    @PutMapping("/{productId}/reject")
    public ResponseEntity<String> rejectProduct(
            @PathVariable Integer productId) {

        return ResponseEntity.ok(
                productManagementService.rejectProduct(productId)
        );
    }



    // Delete product
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Integer productId) {

        return ResponseEntity.ok(
                productManagementService.deleteProduct(productId)
        );
    }

}