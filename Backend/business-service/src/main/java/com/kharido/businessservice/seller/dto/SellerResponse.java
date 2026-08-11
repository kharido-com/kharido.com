package com.kharido.businessservice.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerResponse {

    private Integer sellerId;

    private String username;

    private String shopName;

    private String gstNumber;

    private String phone;

    private String approvalStatus;
}