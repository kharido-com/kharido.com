package com.kharido.businessservice.seller.product.subcatogories;

import java.util.List;

public interface SubCategoryService {

    List<SubCategoryResponseDTO> getSubCategoriesByCategory(Integer categoryId);

}