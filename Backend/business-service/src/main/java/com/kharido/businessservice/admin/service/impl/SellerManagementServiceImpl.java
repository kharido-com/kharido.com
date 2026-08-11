package com.kharido.businessservice.admin.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.SellerResponse;
import com.kharido.businessservice.admin.entity.SellerProfile;
import com.kharido.businessservice.admin.repository.SellerRepository;
import com.kharido.businessservice.admin.service.SellerManagementService;


@Service
public class SellerManagementServiceImpl 
        implements SellerManagementService {



    private final SellerRepository sellerRepository;



    public SellerManagementServiceImpl(
            SellerRepository sellerRepository) {

        this.sellerRepository = sellerRepository;
    }





    @Override
    public List<SellerResponse> getAllSellers() {

        return sellerRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }





    @Override
    public List<SellerResponse> getPendingSellers() {

        return sellerRepository
                .findByApprovalStatus("PENDING")
                .stream()
                .map(this::convertToResponse)
                .toList();
    }





    @Override
    public String approveSeller(Integer sellerId) {


        SellerProfile seller =
                sellerRepository.findById(sellerId)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Seller not found"
                    )
                );


        seller.setApprovalStatus("APPROVED");

        seller.setApprovedDate(
                LocalDateTime.now()
        );


        sellerRepository.save(seller);



        return "Seller approved successfully";
    }






    @Override
    public String rejectSeller(Integer sellerId) {


        SellerProfile seller =
                sellerRepository.findById(sellerId)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Seller not found"
                    )
                );


        seller.setApprovalStatus("REJECTED");


        sellerRepository.save(seller);



        return "Seller rejected successfully";
    }







    @Override
    public String blockSeller(Integer sellerId) {


        SellerProfile seller =
                sellerRepository.findById(sellerId)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Seller not found"
                    )
                );


        seller.setApprovalStatus("BLOCKED");


        sellerRepository.save(seller);



        return "Seller blocked successfully";
    }








    @Override
    public String activateSeller(Integer sellerId) {


        SellerProfile seller =
                sellerRepository.findById(sellerId)
                .orElseThrow(() ->
                    new RuntimeException(
                        "Seller not found"
                    )
                );


        seller.setApprovalStatus("APPROVED");


        sellerRepository.save(seller);



        return "Seller activated successfully";
    }








    private SellerResponse convertToResponse(
            SellerProfile seller) {


        return new SellerResponse(

                seller.getSellerId(),

                seller.getUser().getUserId(),

                seller.getUser().getUsername(),

                seller.getUser().getEmail(),

                seller.getShopName(),

                seller.getGstNumber(),

                seller.getPhone(),

                seller.getApprovalStatus(),

                seller.getApprovedDate()

        );
    }

}