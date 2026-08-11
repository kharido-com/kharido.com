package com.kharido.businessservice.admin.service.impl;


import java.util.List;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.ProductResponse;
import com.kharido.businessservice.admin.entity.Product;
import com.kharido.businessservice.admin.repository.ProductRepository;
import com.kharido.businessservice.admin.service.ProductManagementService;


@Service
public class ProductManagementServiceImpl 
        implements ProductManagementService {


    private final ProductRepository productRepository;


    private final ProductRepository productRepository;

    public ProductManagementServiceImpl(
            ProductRepository productRepository) {

        this.productRepository = productRepository;
    }



    @Override
    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }



    @Override
    public List<ProductResponse> getPendingProducts() {

        return productRepository.findByApprovalStatus("PENDING")
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    @Override
    public List<ProductResponse> getAllProducts() {
        Map<Integer, Long> orderCountMap = getOrderCountMap();

        return productRepository.findAll()
                .stream()
                .map(p -> convertToResponse(p, orderCountMap.getOrDefault(p.getProductId(), 0L)))
                .toList();
    }

    @Override
    public List<ProductResponse> getPendingProducts() {
        Map<Integer, Long> orderCountMap = getOrderCountMap();

        return productRepository.findByApprovalStatus("PENDING")
                .stream()
                .map(p -> convertToResponse(p, orderCountMap.getOrDefault(p.getProductId(), 0L)))
                .toList();
    }

    private Map<Integer, Long> getOrderCountMap() {
        Map<Integer, Long> orderCountMap = new HashMap<>();
        try {
            List<Object[]> rows = productRepository.getProductOrdersAggregates();
            if (rows != null) {
                for (Object[] row : rows) {
                    if (row != null && row.length >= 2 && row[0] != null && row[1] != null) {
                        Integer pId = ((Number) row[0]).intValue();
                        Long qty = ((Number) row[1]).longValue();
                        orderCountMap.put(pId, qty);
                    }
                }
            }
        } catch (Exception e) {
            // Fallback gracefully
        }
        return orderCountMap;
    }

    @Override
    public String approveProduct(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                    new RuntimeException("Product not found")
                );


        product.setApprovalStatus("APPROVED");

        productRepository.save(product);


        return "Product approved successfully";
    }



        return "Product approved successfully";
    }

    @Override
    public String rejectProduct(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                    new RuntimeException("Product not found")
                );


        product.setApprovalStatus("REJECTED");

        productRepository.save(product);


        return "Product rejected successfully";
    }



    }

    @Override
    public String deleteProduct(Integer productId) {

        productRepository.deleteById(productId);

        return "Product deleted successfully";
    }



    private ProductResponse convertToResponse(Product product) {
    private ProductResponse convertToResponse(Product product, Long ordersCount) {
        if (ordersCount == null) {
            ordersCount = 0L;
        }

        return new ProductResponse(
                product.getProductId(),

                product.getSeller().getSellerId(),

                product.getSeller()
                       .getUser()
                       .getUsername(),
                product.getSeller() != null ? product.getSeller().getSellerId() : null,

                product.getSeller() != null && product.getSeller().getUser() != null
                        ? product.getSeller().getUser().getUsername()
                        : "Vendor",

                product.getCategoryId(),

                product.getSubCategoryId(),

                product.getBrandId(),

                product.getProductName(),

                product.getDescription(),

                product.getPrice(),

                product.getStockQuantity(),

                ordersCount,

                product.getApprovalStatus(),

                product.getStatus(),

                product.getCreatedAt()
        );
    }

}