package com.kharido.businessservice.seller;

import com.kharido.businessservice.seller.dto.SellerResponse;
import com.kharido.businessservice.seller.dto.request.UpdateSellerRequest;
import com.kharido.businessservice.seller.entity.Seller;

public interface SellerService {

    Seller getLoggedInSeller();

    SellerResponse getMyProfile();

    SellerResponse updateMyProfile(UpdateSellerRequest request);

    void deleteMyProfile();
}