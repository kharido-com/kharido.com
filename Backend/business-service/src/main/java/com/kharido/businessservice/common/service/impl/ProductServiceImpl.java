package com.kharido.businessservice.common.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.seller.SellerService;
import com.kharido.businessservice.seller.ProductService;
import com.kharido.businessservice.seller.dto.ProductResponse;
import com.kharido.businessservice.seller.dto.request.AddProductRequest;
import com.kharido.businessservice.seller.entity.Product;
import com.kharido.businessservice.seller.entity.ProductImage;
import com.kharido.businessservice.seller.entity.Seller;
import com.kharido.businessservice.seller.repository.ProductImageRepository;
import com.kharido.businessservice.seller.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

        @Autowired
        private ProductRepository productRepository;

        @Autowired
        private ProductImageRepository productImageRepository;

        @Autowired
        private SellerService sellerService;

        @Override
        @Transactional
        public ProductResponse addProduct(AddProductRequest request) throws Exception {

                if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                        throw new IllegalArgumentException("Price must be greater than 0");
                }

                // Logged-in seller from JWT
                Seller seller = sellerService.getLoggedInSeller();

                Integer categoryId = request.getCategoryId() != null ? request.getCategoryId() : 1;
                Integer subCategoryId = request.getSubCategoryId() != null ? request.getSubCategoryId() : 1;
                Integer brandId = request.getBrandId() != null ? request.getBrandId() : 1;
                Integer stockQuantity = request.getStockQuantity() != null ? request.getStockQuantity() : 10;

                Integer sellerUserId = seller.getSellerId();

                Product product = Product.builder()
                                .sellerId(sellerUserId)
                                .categoryId(categoryId)
                                .subCategoryId(subCategoryId)
                                .brandId(brandId)
                                .productName(request.getProductName())
                                .description(request.getDescription())
                                .price(request.getPrice())
                                .stockQuantity(stockQuantity)
                                .build();

                System.out.println("------------------------------------------------");
                System.out.println("seller.getSellerId()     : " + seller.getSellerId());
                System.out.println("seller.getUserId()       : " + seller.getUserId());
                System.out.println("product.getSellerId()    : " + product.getSellerId());
                System.out.println("product.getCategoryId()  : " + product.getCategoryId());
                System.out.println("product.getSubCategoryId(): " + product.getSubCategoryId());
                System.out.println("product.getBrandId()     : " + product.getBrandId());
                System.out.println("------------------------------------------------");

                Product savedProduct = productRepository.save(product);

                String imageUrl = null;

                // Save Image File to disk & store URL in database
                if (request.getImage() != null && !request.getImage().isEmpty()) {
                        String uploadDir = "uploads/";
                        java.io.File dir = new java.io.File(uploadDir);
                        if (!dir.exists()) {
                                dir.mkdirs();
                        }

                        String originalFilename = request.getImage().getOriginalFilename();
                        String cleanFilename = originalFilename != null
                                        ? originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_")
                                        : "image.jpg";
                        String fileName = "product_" + savedProduct.getProductId() + "_"
                                        + System.currentTimeMillis() + "_" + cleanFilename;
                        java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir, fileName);
                        java.nio.file.Files.write(filePath, request.getImage().getBytes());

                        imageUrl = "http://localhost:8082/api/products/" + savedProduct.getProductId()
                                        + "/image";
                        Boolean isPrimary = request.getIsPrimary() != null ? request.getIsPrimary() : true;

                        ProductImage productImage = ProductImage.builder()
                                        .product(savedProduct)
                                        .imageUrl(imageUrl)
                                        .isPrimary(isPrimary)
                                        .build();

                        productImageRepository.save(productImage);
                }

                return ProductResponse.builder()
                                .productId(savedProduct.getProductId())
                                .sellerId(savedProduct.getSellerId())
                                .categoryId(savedProduct.getCategoryId())
                                .subCategoryId(savedProduct.getSubCategoryId())
                                .brandId(savedProduct.getBrandId())
                                .productName(savedProduct.getProductName())
                                .description(savedProduct.getDescription())
                                .price(savedProduct.getPrice())
                                .stockQuantity(savedProduct.getStockQuantity())
                                .approvalStatus(savedProduct.getApprovalStatus())
                                .status(savedProduct.getStatus())
                                .imageUrl(imageUrl)
                                .createdAt(savedProduct.getCreatedAt())
                                .build();
        }

        @Override
        public List<ProductResponse> getProductsBySeller() {

                // Logged-in seller from JWT
                Seller seller = sellerService.getLoggedInSeller();

                Integer sellerId = seller.getSellerId();
                List<Product> products = productRepository.findBySellerId(sellerId);

                return products.stream()
                                .map(product -> {
                                        String imgUrl = null;
                                        Optional<ProductImage> imgOpt = productImageRepository
                                                        .findFirstByProduct(product);
                                        if (imgOpt.isPresent()) {
                                                imgUrl = imgOpt.get().getImageUrl();
                                        } else {
                                                imgUrl = "http://localhost:8082/api/products/" + product.getProductId()
                                                                + "/image";
                                        }

                                        return ProductResponse.builder()
                                                        .productId(product.getProductId())
                                                        .sellerId(product.getSellerId())
                                                        .categoryId(product.getCategoryId())
                                                        .subCategoryId(product.getSubCategoryId())
                                                        .brandId(product.getBrandId())
                                                        .productName(product.getProductName())
                                                        .description(product.getDescription())
                                                        .price(product.getPrice())
                                                        .stockQuantity(product.getStockQuantity())
                                                        .approvalStatus(product.getApprovalStatus())
                                                        .status(product.getStatus())
                                                        .imageUrl(imgUrl)
                                                        .createdAt(product.getCreatedAt())
                                                        .build();
                                })
                                .toList();
        }

        @Override
        public ProductResponse getProductById(Integer productId) {

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product Not Found"));

                String imgUrl = null;
                Optional<ProductImage> imgOpt = productImageRepository.findFirstByProduct(product);
                if (imgOpt.isPresent()) {
                        imgUrl = imgOpt.get().getImageUrl();
                }

                return ProductResponse.builder()
                                .productId(product.getProductId())
                                .sellerId(product.getSellerId())
                                .categoryId(product.getCategoryId())
                                .subCategoryId(product.getSubCategoryId())
                                .brandId(product.getBrandId())
                                .productName(product.getProductName())
                                .description(product.getDescription())
                                .price(product.getPrice())
                                .stockQuantity(product.getStockQuantity())
                                .approvalStatus(product.getApprovalStatus())
                                .status(product.getStatus())
                                .imageUrl(imgUrl)
                                .createdAt(product.getCreatedAt())
                                .build();
        }

        @Override
        @Transactional
        public ProductResponse updateProduct(Integer productId,
                        AddProductRequest request) throws Exception {

                if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
                        throw new IllegalArgumentException("Price must be greater than 0");
                }

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product Not Found"));
                Seller seller = sellerService.getLoggedInSeller();

                if (!product.getSellerId().equals(seller.getSellerId())) {
                        throw new RuntimeException("Access Denied");
                }
                product.setProductName(request.getProductName());
                product.setCategoryId(
                                request.getCategoryId() != null ? request.getCategoryId() : product.getCategoryId());
                product.setSubCategoryId(request.getSubCategoryId() != null ? request.getSubCategoryId()
                                : product.getSubCategoryId());
                product.setBrandId(request.getBrandId() != null ? request.getBrandId() : product.getBrandId());
                product.setDescription(request.getDescription());
                product.setPrice(request.getPrice());
                product.setStockQuantity(request.getStockQuantity() != null ? request.getStockQuantity()
                                : product.getStockQuantity());

                Product updatedProduct = productRepository.save(product);
                String imageUrl = null;

                if (request.getImage() != null && !request.getImage().isEmpty()) {
                        try {
                                String uploadDir = "uploads/";
                                java.io.File dir = new java.io.File(uploadDir);
                                if (!dir.exists()) {
                                        dir.mkdirs();
                                }

                                String originalFilename = request.getImage().getOriginalFilename();
                                String cleanFilename = originalFilename != null
                                                ? originalFilename.replaceAll("[^a-zA-Z0-9._-]", "_")
                                                : "image.jpg";
                                String fileName = "product_" + updatedProduct.getProductId() + "_"
                                                + System.currentTimeMillis() + "_" + cleanFilename;
                                java.nio.file.Path filePath = java.nio.file.Paths.get(uploadDir, fileName);
                                java.nio.file.Files.write(filePath, request.getImage().getBytes());

                                imageUrl = "http://localhost:8082/api/products/" + updatedProduct.getProductId()
                                                + "/image";
                                Boolean isPrimary = request.getIsPrimary() != null ? request.getIsPrimary() : true;

                                Optional<ProductImage> optionalImage = productImageRepository
                                                .findFirstByProduct(updatedProduct);
                                ProductImage productImage = optionalImage.orElseGet(
                                                () -> ProductImage.builder().product(updatedProduct).build());

                                productImage.setImageUrl(imageUrl);
                                productImage.setIsPrimary(isPrimary);

                                productImageRepository.save(productImage);
                        } catch (Exception e) {
                                System.err.println("Could not save product image: " + e.getMessage());
                        }
                }

                return ProductResponse.builder()
                                .productId(updatedProduct.getProductId())
                                .sellerId(updatedProduct.getSellerId())
                                .categoryId(updatedProduct.getCategoryId())
                                .subCategoryId(updatedProduct.getSubCategoryId())
                                .brandId(updatedProduct.getBrandId())
                                .productName(updatedProduct.getProductName())
                                .description(updatedProduct.getDescription())
                                .price(updatedProduct.getPrice())
                                .stockQuantity(updatedProduct.getStockQuantity())
                                .approvalStatus(updatedProduct.getApprovalStatus())
                                .status(updatedProduct.getStatus())
                                .imageUrl(imageUrl)
                                .createdAt(updatedProduct.getCreatedAt())
                                .build();
        }

        @Override
        @Transactional
        public void deleteProduct(Integer productId) {

                Product product = productRepository.findById(productId)
                                .orElseThrow(() -> new RuntimeException("Product Not Found"));

                Seller seller = sellerService.getLoggedInSeller();

                if (!product.getSellerId().equals(seller.getSellerId())) {
                        throw new RuntimeException("Access Denied");
                }

                productRepository.delete(product);
        }

        @Override
        public byte[] getProductImage(Integer productId) {

                try {
                        java.io.File uploadsFolder = new java.io.File("uploads");
                        if (uploadsFolder.exists() && uploadsFolder.isDirectory()) {
                                java.io.File[] files = uploadsFolder.listFiles(
                                                (dir, name) -> name.startsWith("product_" + productId + "_"));
                                if (files != null && files.length > 0) {
                                        return java.nio.file.Files.readAllBytes(files[0].toPath());
                                }
                        }
                } catch (Exception e) {
                        System.err.println("Failed to read image file from disk: " + e.getMessage());
                }

                return new byte[0];
        }
}