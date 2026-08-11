package com.kharido.businessservice.customer.product.category;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "CustomerCategory")
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