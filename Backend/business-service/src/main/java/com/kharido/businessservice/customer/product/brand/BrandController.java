package com.kharido.businessservice.customer.product.brand;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/brands")
@CrossOrigin(origins = "http://localhost:5173")
public class BrandController {

    private final BrandService brandService;

    public BrandController(BrandService brandService) {

        this.brandService = brandService;

    }

    @GetMapping
    public List<BrandResponseDTO> getAllBrands() {

        return brandService.getAllBrands();

    }

}