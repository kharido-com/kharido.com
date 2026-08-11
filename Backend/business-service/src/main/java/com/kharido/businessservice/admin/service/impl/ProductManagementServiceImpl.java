package com.kharido.businessservice.admin.service.impl;


import java.util.List;

import org.springframework.stereotype.Service;

import com.kharido.businessservice.admin.dto.ProductResponse;
import com.kharido.businessservice.admin.entity.Product;
import com.kharido.businessservice.admin.repository.ProductRepository;
import com.kharido.businessservice.admin.service.ProductManagementService;


@Service
public class ProductManagementServiceImpl 
        implements ProductManagementService {


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
    public String approveProduct(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                    new RuntimeException("Product not found")
                );


        product.setApprovalStatus("APPROVED");

        productRepository.save(product);


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



    @Override
    public String deleteProduct(Integer productId) {

        productRepository.deleteById(productId);

        return "Product deleted successfully";
    }



    private ProductResponse convertToResponse(Product product) {

        return new ProductResponse(
                product.getProductId(),

                product.getSeller().getSellerId(),

                product.getSeller()
                       .getUser()
                       .getUsername(),

                product.getCategoryId(),

                product.getSubCategoryId(),

                product.getBrandId(),

                product.getProductName(),

                product.getDescription(),

                product.getPrice(),

                product.getStockQuantity(),

                product.getApprovalStatus(),

                product.getStatus(),

                product.getCreatedAt()
        );
    }

}