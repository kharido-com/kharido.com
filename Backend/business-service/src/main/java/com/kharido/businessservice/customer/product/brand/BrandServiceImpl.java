package com.kharido.businessservice.customer.product.brand;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponseDTO> getAllBrands() {

        return brandRepository.findAll()
                .stream()
                .map(brand -> {
                    BrandResponseDTO dto = new BrandResponseDTO();
                    dto.setBrandId(brand.getBrandId());
                    dto.setBrandName(brand.getBrandName());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}