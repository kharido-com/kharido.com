package com.kharido.businessservice.seller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kharido.businessservice.seller.ProductService;
import com.kharido.businessservice.seller.dto.ProductResponse;
import com.kharido.businessservice.seller.dto.request.AddProductRequest;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> addProduct(
            @ModelAttribute AddProductRequest request)
            throws Exception {

        return ResponseEntity.ok(
                productService.addProduct(request));
    }

    @GetMapping("/my-products")
    public ResponseEntity<List<ProductResponse>> getMyProducts() {

        return ResponseEntity.ok(
                productService.getProductsBySeller());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProduct(
            @PathVariable Integer productId) {

        return ResponseEntity.ok(
                productService.getProductById(productId));
    }

    // ===========================
    // GET PRODUCT IMAGE
    // ===========================
    @GetMapping("/{productId}/image")
    public ResponseEntity<byte[]> getProductImage(
            @PathVariable Integer productId) {

        byte[] image = productService.getProductImage(productId);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @PutMapping(
            value = "/{productId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Integer productId,
            @ModelAttribute AddProductRequest request)
            throws Exception {

        return ResponseEntity.ok(
                productService.updateProduct(productId, request));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Integer productId) {

        productService.deleteProduct(productId);

        return ResponseEntity.ok("Deleted Successfully");
    }
}