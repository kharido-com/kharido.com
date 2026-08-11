package com.kharido.businessservice.seller;

import java.util.List;

import com.kharido.businessservice.seller.dto.ProductResponse;
import com.kharido.businessservice.seller.dto.request.AddProductRequest;

public interface ProductService {

    ProductResponse addProduct(AddProductRequest request)
            throws Exception;

    List<ProductResponse> getProductsBySeller();

    ProductResponse getProductById(Integer productId);

    ProductResponse updateProduct(
            Integer productId,
            AddProductRequest request)
            throws Exception;

    void deleteProduct(Integer productId);

    // 👇 Add this method
    byte[] getProductImage(Integer productId);

}