package com.kharido.businessservice.customer.product.subcategory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "CustomerSubCategory")
@Table(name = "subcategories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategory {

    @Id
    @Column(name = "subcategoryid")
    private Integer subCategoryId;

    @Column(name = "categoryid")
    private Integer categoryId;

    @Column(name = "subcategory_name")
    private String subCategoryName;

}