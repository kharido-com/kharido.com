package com.kharido.businessservice.seller.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Builder
public class ProductImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "imageid")
	private Integer imageId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "productid", nullable = false)
	private Product product;
	@Lob
	@Column(name = "image_data", nullable = false, columnDefinition = "LONGBLOB")
	private byte[] imageData;
	
	@Column(name = "is_primary")
	private Boolean isPrimary;
}