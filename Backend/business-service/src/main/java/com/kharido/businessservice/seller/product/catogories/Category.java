package com.kharido.businessservice.seller.product.catogories;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @Column(name = "categoryid")
    private Integer categoryId;

    @Column(name = "category_name")
    private String categoryName;

    private String description;

}