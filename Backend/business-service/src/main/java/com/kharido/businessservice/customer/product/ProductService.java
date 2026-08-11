package com.kharido.businessservice.customer.product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    List<ProductResponseDTO> getProducts(
            Integer categoryId,
            Integer brandId,
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort);

    ProductDetailsDTO getProductById(Integer productId);

}