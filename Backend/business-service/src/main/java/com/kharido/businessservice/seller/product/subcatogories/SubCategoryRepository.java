package com.kharido.businessservice.seller.product.subcatogories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubCategoryRepository
        extends JpaRepository<SubCategory, Integer> {

    List<SubCategory> findByCategoryId(Integer categoryId);

}