package com.kharido.businessservice.customer.product.category;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {

        this.categoryRepository = categoryRepository;

    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {

        return categoryRepository.findAll()

                .stream()

                .map(category -> {

                    CategoryResponseDTO dto =
                            new CategoryResponseDTO();

                    dto.setCategoryId(
                            category.getCategoryId());

                    dto.setCategoryName(
                            category.getCategoryName());

                    return dto;

                })

                .collect(Collectors.toList());

    }

}