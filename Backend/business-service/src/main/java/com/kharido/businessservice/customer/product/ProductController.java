package com.kharido.businessservice.customer.product;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductResponseDTO> getProducts(

            @RequestParam(required = false) Integer categoryId,

            @RequestParam(required = false) Integer brandId,

            @RequestParam(required = false) String keyword,

            @RequestParam(required = false) BigDecimal minPrice,

            @RequestParam(required = false) BigDecimal maxPrice,

            @RequestParam(required = false) String sort

    ) {

        return productService.getProducts(
                categoryId,
                brandId,
                keyword,
                minPrice,
                maxPrice,
                sort);

    }

    @GetMapping("/{productId}")
    public ProductDetailsDTO getProductById(
            @PathVariable Integer productId) {

        return productService.getProductById(productId);

    }

}