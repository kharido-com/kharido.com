package com.kharido.businessservice.seller.product.brand;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "brands")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Brand {

    @Id
    @Column(name = "brandid")
    private Integer brandId;

    @Column(name = "brand_name")
    private String brandName;

}