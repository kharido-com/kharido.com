package com.kharido.businessservice.seller.product.subcatogories;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subcategories")
@CrossOrigin(origins = "http://localhost:5173")
public class SubCategoryController {

    private final SubCategoryService service;

    public SubCategoryController(SubCategoryService service) {
        this.service = service;
    }

    @GetMapping("/{categoryId}")
    public List<SubCategoryResponseDTO> getSubCategories(
            @PathVariable Integer categoryId) {

        return service.getSubCategoriesByCategory(categoryId);

    }
}