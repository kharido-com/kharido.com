package com.kharido.businessservice.admin.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Map<Integer, Long> countMap = getProductCountMap();

        return sellerRepository.findAll()
                .stream()
                .map(s -> {
                    Long count = countMap.get(s.getSellerId());
                    if (count == null && s.getUser() != null) {
                        count = countMap.get(s.getUser().getUserId());
                    }
                    return convertToResponse(s, count != null ? count : 0L);
                })
                .toList();
    }

    @Override
    public List<SellerResponse> getPendingSellers() {
        Map<Integer, Long> countMap = getProductCountMap();

        return sellerRepository
                .findByApprovalStatus("PENDING")
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

                .map(s -> {
                    Long count = countMap.get(s.getSellerId());
                    if (count == null && s.getUser() != null) {
                        count = countMap.get(s.getUser().getUserId());
                    }
                    return convertToResponse(s, count != null ? count : 0L);
                })
                .toList();
    }

    private Map<Integer, Long> getProductCountMap() {
        Map<Integer, Long> map = new HashMap<>();
        try {
            List<Object[]> rows = sellerRepository.getSellerProductCounts();
            if (rows != null) {
                for (Object[] row : rows) {
                    if (row != null && row.length >= 2 && row[0] != null && row[1] != null) {
                        Integer sId = ((Number) row[0]).intValue();
                        Long count = ((Number) row[1]).longValue();
                        map.put(sId, count);
                    }
                }
            }
        } catch (Exception e) {
            // Fallback gracefully
        }
        return map;
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

            SellerProfile seller,
            Long productCount) {

        if (productCount == null) {
            productCount = 0L;
        }

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
                seller.getApprovedDate(),

                productCount

        );
    }

}