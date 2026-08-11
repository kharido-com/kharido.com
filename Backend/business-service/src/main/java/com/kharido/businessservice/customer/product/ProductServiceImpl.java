package com.kharido.businessservice.customer.product;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.customer.product.brand.Brand;
import com.kharido.businessservice.customer.product.brand.BrandRepository;
import com.kharido.businessservice.customer.product.category.Category;
import com.kharido.businessservice.customer.product.category.CategoryRepository;
import com.kharido.businessservice.customer.product.image.ProductImage;
import com.kharido.businessservice.customer.product.image.ProductImageRepository;
import com.kharido.businessservice.customer.product.subcategory.SubCategory;
import com.kharido.businessservice.customer.product.subcategory.SubCategoryRepository;
import com.kharido.businessservice.exception.ResourceNotFoundException;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductImageRepository productImageRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            BrandRepository brandRepository,
            SubCategoryRepository subCategoryRepository,
            ProductImageRepository productImageRepository) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
    }

    @Override
    public List<ProductResponseDTO> getProducts(
            Integer categoryId,
            Integer brandId,
            String keyword,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            String sort) {

        List<Product> products = productRepository.findAll();
        

        products = products.stream()

                .filter(product ->
                        product.getStatus() == null ||
                        "ACTIVE".equalsIgnoreCase(product.getStatus()))

                .filter(product ->
                        product.getApprovalStatus() == null ||
                        "APPROVED".equalsIgnoreCase(product.getApprovalStatus()))

                .filter(product ->
                        categoryId == null ||
                        (product.getCategoryId() != null && product.getCategoryId().equals(categoryId)))

                .filter(product ->
                        brandId == null ||
                        (product.getBrandId() != null && product.getBrandId().equals(brandId)))

                .filter(product ->
                        keyword == null ||
                        keyword.isBlank() ||
                        (product.getProductName() != null &&
                         product.getProductName().toLowerCase().contains(keyword.toLowerCase())))

                .filter(product ->
                        minPrice == null ||
                        (product.getPrice() != null && product.getPrice().compareTo(minPrice) >= 0))

                .filter(product ->
                        maxPrice == null ||
                        (product.getPrice() != null && product.getPrice().compareTo(maxPrice) <= 0))

                .collect(Collectors.toList());

        if (sort != null) {

            switch (sort.toLowerCase()) {

                case "priceasc":
                    products.sort(Comparator.comparing(p -> p.getPrice() != null ? p.getPrice() : BigDecimal.ZERO));
                    break;

                case "pricedesc":
                    products.sort(Comparator.comparing((Product p) -> p.getPrice() != null ? p.getPrice() : BigDecimal.ZERO).reversed());
                    break;

                case "name":
                    products.sort(Comparator.comparing(p -> p.getProductName() != null ? p.getProductName() : ""));
                    break;

                case "newest":
                    products.sort(Comparator.comparing((Product p) -> p.getCreatedAt() != null ? p.getCreatedAt() : java.time.LocalDateTime.MIN).reversed());
                    break;
            }

        }

        return products.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDetailsDTO getProductById(Integer productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return mapToDetails(product);
    }

    private ProductResponseDTO mapToResponse(Product product) {

        Category category = (product.getCategoryId() != null)
                ? categoryRepository.findById(product.getCategoryId()).orElse(null)
                : null;

        Brand brand = (product.getBrandId() != null)
                ? brandRepository.findById(product.getBrandId()).orElse(null)
                : null;

        SubCategory subCategory = (product.getSubcategoryId() != null)
                ? subCategoryRepository.findById(product.getSubcategoryId()).orElse(null)
                : null;

        ProductImage image = productImageRepository
                .findFirstByProductProductIdAndIsPrimaryTrue(product.getProductId())
                .orElseGet(() -> productImageRepository
                        .findFirstByProductProductId(product.getProductId())
                        .orElse(null));

        ProductResponseDTO dto = new ProductResponseDTO();

        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());

        dto.setCategory(category != null ? category.getCategoryName() : "");
        dto.setBrand(brand != null ? brand.getBrandName() : "");
        dto.setSubCategory(subCategory != null ? subCategory.getSubCategoryName() : "");
        dto.setImageUrl(image != null ? image.getImageUrl() : null);

        return dto;
    }

    private ProductDetailsDTO mapToDetails(Product product) {

        Category category = (product.getCategoryId() != null)
                ? categoryRepository.findById(product.getCategoryId()).orElse(null)
                : null;

        Brand brand = (product.getBrandId() != null)
                ? brandRepository.findById(product.getBrandId()).orElse(null)
                : null;

        SubCategory subCategory = (product.getSubcategoryId() != null)
                ? subCategoryRepository.findById(product.getSubcategoryId()).orElse(null)
                : null;

        ProductImage image = productImageRepository
                .findFirstByProductProductIdAndIsPrimaryTrue(product.getProductId())
                .orElseGet(() -> productImageRepository
                        .findFirstByProductProductId(product.getProductId())
                        .orElse(null));

        ProductDetailsDTO dto = new ProductDetailsDTO();

        dto.setProductId(product.getProductId());
        dto.setProductName(product.getProductName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());

        dto.setCategory(category != null ? category.getCategoryName() : "");
        dto.setBrand(brand != null ? brand.getBrandName() : "");
        dto.setSubCategory(subCategory != null ? subCategory.getSubCategoryName() : "");
        dto.setImageUrl(image != null ? image.getImageUrl() : null);

        return dto;
    }
}