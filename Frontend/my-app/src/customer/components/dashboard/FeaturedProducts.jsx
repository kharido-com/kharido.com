import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
    Box,
    Typography,
    CircularProgress,
    Alert
} from "@mui/material";

import ProductCard from "../product/ProductCard";
import ProductFilters from "../product/ProductFilters";
import { getProducts } from "../../services/productService";

export default function FeaturedProducts({ categoryId }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({
        keyword: "",
        categoryId: "",
        brandId: "",
        sort: ""
    });

    useEffect(() => {
        setFilters(prev => {
            const updated = {
                ...prev,
                keyword,
                categoryId:
                    categoryId !== undefined && categoryId !== null
                        ? categoryId
                        : prev.categoryId
            };
            loadProducts(updated);
            return updated;
        });
    }, [categoryId, keyword]);

    async function loadProducts(filterValues = filters) {
        try {
            setLoading(true);
            setError("");
            const data = await getProducts(filterValues);
            setProducts(data);
        }
        catch (error) {
            console.error(error);
            setError("Unable to load products.");
        }

        finally {
            setLoading(false);
        }
    }

    function handleFilter(filterValues) {
        setFilters(filterValues);
        const params = new URLSearchParams();
        if (filterValues.keyword) params.set("keyword", filterValues.keyword);
        if (filterValues.categoryId) params.set("categoryId", filterValues.categoryId);
        if (filterValues.brandId) params.set("brandId", filterValues.brandId);
        if (filterValues.sort) params.set("sort", filterValues.sort);
        setSearchParams(params);
        loadProducts(filterValues);
    }

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                py={6}
            >
                <CircularProgress
                    sx={{
                        color: "#008C95"
                    }}
                />
            </Box>
        );
    }
    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                >
                    {
                        keyword
                            ? `Search Results for "${keyword}"`
                            : "All Products"
                    }
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    {products.length} Products
                </Typography>
            </Box>

            <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onFilter={handleFilter}
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                    gap: 3
                }}
            >
                {
                    products.map(product => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                        />
                    ))
                }
            </Box>
        </>
    );
}