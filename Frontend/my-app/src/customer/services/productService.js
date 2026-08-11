import axios from "axios";
import laptopImg from "../../assets/laptop.jpg";
import mobileImg from "../../assets/mobile.jpg";
import headphoneImg from "../../assets/headphone.jpg";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const PRODUCT_API = `${BASE_URL}/api/products`;
const CATEGORY_API = `${BASE_URL}/api/categories`;
const BRAND_API = `${BASE_URL}/api/brands`;

export const DEFAULT_CATEGORIES = [
    { categoryId: 1, categoryName: "Electronics" },
    { categoryId: 2, categoryName: "Fashion" },
    { categoryId: 3, categoryName: "Books" },
    { categoryId: 4, categoryName: "Gaming" },
    { categoryId: 5, categoryName: "Sports" },
    { categoryId: 6, categoryName: "Home Appliances" }
];

export const DEFAULT_BRANDS = [
    { brandId: 1, brandName: "Apple" },
    { brandId: 2, brandName: "ASUS" },
    { brandId: 3, brandName: "boAt" },
    { brandId: 4, brandName: "Nike" },
    { brandId: 5, brandName: "Sony" },
    { brandId: 6, brandName: "LG" }
];

export const DEFAULT_PRODUCTS = [
    {
        productId: 1,
        productName: "ASUS VivoBook 15 Laptop",
        category: "Electronics",
        categoryId: 1,
        brand: "ASUS",
        brandId: 2,
        price: 70000,
        stockQuantity: 10,
        imageUrl: laptopImg,
        description: "High performance laptop with Intel Core i5 and 16GB RAM."
    },
    {
        productId: 2,
        productName: "iPhone 15 Pro",
        category: "Electronics",
        categoryId: 1,
        brand: "Apple",
        brandId: 1,
        price: 120000,
        stockQuantity: 8,
        imageUrl: mobileImg,
        description: "Latest Apple flagship with Titanium body and A17 Pro chip."
    },
    {
        productId: 3,
        productName: "boAt Rockerz 450 Headphones",
        category: "Electronics",
        categoryId: 1,
        brand: "boAt",
        brandId: 3,
        price: 2000,
        stockQuantity: 15,
        imageUrl: headphoneImg,
        description: "Immersive wireless bluetooth headphones with HD sound."
    },
    {
        productId: 4,
        productName: "Nike Air Zoom Running Shoes",
        category: "Fashion",
        categoryId: 2,
        brand: "Nike",
        brandId: 4,
        price: 8500,
        stockQuantity: 12,
        imageUrl: mobileImg,
        description: "Lightweight, responsive running shoes for ultimate comfort."
    },
    {
        productId: 5,
        productName: "Clean Code Handbook",
        category: "Books",
        categoryId: 3,
        brand: "Apple",
        brandId: 1,
        price: 1800,
        stockQuantity: 20,
        imageUrl: headphoneImg,
        description: "A handbook of agile software craftsmanship."
    },
    {
        productId: 6,
        productName: "PlayStation 5 Console",
        category: "Gaming",
        categoryId: 4,
        brand: "Sony",
        brandId: 5,
        price: 54990,
        stockQuantity: 5,
        imageUrl: laptopImg,
        description: "Next-gen gaming console with 4K 120Hz support and DualSense controller."
    },
    {
        productId: 7,
        productName: "Nike Professional Football",
        category: "Sports",
        categoryId: 5,
        brand: "Nike",
        brandId: 4,
        price: 2499,
        stockQuantity: 25,
        imageUrl: mobileImg,
        description: "FIFA approved match-grade training football."
    },
    {
        productId: 8,
        productName: "LG Smart Inverter Microwave",
        category: "Home Appliances",
        categoryId: 6,
        brand: "LG",
        brandId: 6,
        price: 14500,
        stockQuantity: 7,
        imageUrl: laptopImg,
        description: "Even heating and defrosting solo microwave oven."
    }
];

export const getProducts = async (params = {}) => {
    try {
        const response = await axios.get(
            PRODUCT_API,
            {
                params,
                withCredentials: true,
                timeout: 3000
            }
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        }
    } catch (error) {
        console.warn("Backend products API unavailable, using fallback data:", error.message);
    }

    // Fallback Client Filtering Logic
    let filtered = [...DEFAULT_PRODUCTS];

    if (params.categoryId) {
        filtered = filtered.filter(
            p => String(p.categoryId) === String(params.categoryId) ||
                String(p.category).toLowerCase() === String(params.categoryName || "").toLowerCase()
        );
    }

    if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        filtered = filtered.filter(
            p => p.productName.toLowerCase().includes(kw) ||
                (p.category && p.category.toLowerCase().includes(kw)) ||
                (p.brand && p.brand.toLowerCase().includes(kw))
        );
    }

    if (params.brandId) {
        filtered = filtered.filter(p => String(p.brandId) === String(params.brandId));
    }

    if (params.sort === "priceAsc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (params.sort === "priceDesc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (params.sort === "name") {
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    return filtered;
};

export const getProductById = async (id) => {
    try {
        const response = await axios.get(
            `${PRODUCT_API}/${id}`,
            {
                withCredentials: true,
                timeout: 3000
            }
        );
        return response.data;
    } catch (error) {
        const found = DEFAULT_PRODUCTS.find(p => String(p.productId) === String(id));
        return found || DEFAULT_PRODUCTS[0];
    }
};

export const getCategories = async () => {
    try {
        const response = await axios.get(
            CATEGORY_API,
            {
                withCredentials: true,
                timeout: 3000
            }
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        }
    } catch (error) {
        console.warn("Backend categories API unavailable, using 6 default categories:", error.message);
    }
    return DEFAULT_CATEGORIES;
};

export const getBrands = async () => {
    try {
        const response = await axios.get(
            BRAND_API,
            {
                withCredentials: true,
                timeout: 3000
            }
        );
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data;
        }
    } catch (error) {
        console.warn("Backend brands API unavailable, using default brands:", error.message);
    }
    return DEFAULT_BRANDS;
};