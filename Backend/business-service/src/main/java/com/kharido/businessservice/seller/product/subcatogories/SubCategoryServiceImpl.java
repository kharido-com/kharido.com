package com.kharido.businessservice.seller.product.subcatogories;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {

    private final SubCategoryRepository repository;

    public SubCategoryServiceImpl(SubCategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<SubCategoryResponseDTO> getSubCategoriesByCategory(Integer categoryId) {

        return repository.findByCategoryId(categoryId)
                .stream()
                .map(sub -> {

                    SubCategoryResponseDTO dto = new SubCategoryResponseDTO();

                    dto.setSubCategoryId(sub.getSubCategoryId());
                    dto.setCategoryId(sub.getCategoryId());
                    dto.setSubCategoryName(sub.getSubCategoryName());

                    return dto;

                })
                .collect(Collectors.toList());
    }
}