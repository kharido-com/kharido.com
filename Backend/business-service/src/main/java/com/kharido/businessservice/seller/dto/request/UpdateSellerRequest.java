package com.kharido.businessservice.seller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateSellerRequest {

    private String shopName;

    private String gstNumber;

    private String phone;
}