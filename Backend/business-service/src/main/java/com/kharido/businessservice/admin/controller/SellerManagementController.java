package com.kharido.businessservice.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.admin.dto.SellerResponse;
import com.kharido.businessservice.admin.service.SellerManagementService;


@RestController
@RequestMapping("/api/admin/sellers")
public class SellerManagementController {


    private final SellerManagementService sellerManagementService;


    public SellerManagementController(
            SellerManagementService sellerManagementService) {

        this.sellerManagementService = sellerManagementService;
    }



    // GET ALL SELLERS
    @GetMapping
    public ResponseEntity<List<SellerResponse>> getAllSellers() {

        return ResponseEntity.ok(
                sellerManagementService.getAllSellers()
        );
    }



    // GET PENDING SELLERS
    @GetMapping("/pending")
    public ResponseEntity<List<SellerResponse>> getPendingSellers() {

        return ResponseEntity.ok(
                sellerManagementService.getPendingSellers()
        );
    }



    // APPROVE SELLER
    @PutMapping("/{sellerId}/approve")
    public ResponseEntity<String> approveSeller(
            @PathVariable Integer sellerId) {


        return ResponseEntity.ok(
                sellerManagementService.approveSeller(sellerId)
        );
    }




    // REJECT SELLER
    @PutMapping("/{sellerId}/reject")
    public ResponseEntity<String> rejectSeller(
            @PathVariable Integer sellerId) {


        return ResponseEntity.ok(
                sellerManagementService.rejectSeller(sellerId)
        );
    }




    // BLOCK SELLER
    @PutMapping("/{sellerId}/block")
    public ResponseEntity<String> blockSeller(
            @PathVariable Integer sellerId) {


        return ResponseEntity.ok(
                sellerManagementService.blockSeller(sellerId)
        );
    }





    // ACTIVATE SELLER
    @PutMapping("/{sellerId}/activate")
    public ResponseEntity<String> activateSeller(
            @PathVariable Integer sellerId) {


        return ResponseEntity.ok(
                sellerManagementService.activateSeller(sellerId)
        );
    }

}