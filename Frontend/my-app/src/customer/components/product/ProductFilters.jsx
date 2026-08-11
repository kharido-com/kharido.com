import {
    Paper,
    TextField,
    MenuItem,
    Button,
    Box
} from "@mui/material";

import { useEffect, useState } from "react";

import {
    getCategories,
    getBrands
} from "../../services/productService";

export default function ProductFilters({
    filters,
    setFilters,
    onFilter
}) {

    const [categories, setCategories] = useState([]);

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {

        try {

            const categoryData = await getCategories();

            const brandData = await getBrands();

            setCategories(categoryData);

            setBrands(brandData);

        }

        catch (error) {

            console.error(error);

        }

    }

    function handleChange(event) {

        const { name, value } = event.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleApply() {

        onFilter(filters);

    }

    function handleClear() {

        const empty = {
            keyword: "",
            categoryId: "",
            brandId: "",
            sort: ""
        };

        setFilters(empty);

        onFilter(empty);

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                mb: 4,
                borderRadius: 4,
                border: "1px solid #ECECEC"
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    flexWrap: "wrap",
                    alignItems: "center"
                }}
            >

                <TextField
                    label="Search Products"
                    name="keyword"
                    value={filters.keyword}
                    onChange={handleChange}
                    sx={{
                        flex: 2,
                        minWidth: 260
                    }}
                />

                <TextField
                    select
                    label="Category"
                    name="categoryId"
                    value={filters.categoryId}
                    onChange={handleChange}
                    sx={{
                        flex: 1,
                        minWidth: 180
                    }}
                >

                    <MenuItem value="">
                        All Categories
                    </MenuItem>

                    {
                        categories.map(category => (

                            <MenuItem
                                key={category.categoryId}
                                value={category.categoryId}
                            >

                                {category.categoryName}

                            </MenuItem>

                        ))
                    }

                </TextField>

                <TextField
                    select
                    label="Brand"
                    name="brandId"
                    value={filters.brandId}
                    onChange={handleChange}
                    sx={{
                        flex: 1,
                        minWidth: 180
                    }}
                >

                    <MenuItem value="">
                        All Brands
                    </MenuItem>

                    {
                        brands.map(brand => (

                            <MenuItem
                                key={brand.brandId}
                                value={brand.brandId}
                            >

                                {brand.brandName}

                            </MenuItem>

                        ))
                    }

                </TextField>

                <TextField
                    select
                    label="Sort"
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                    sx={{
                        flex: 1,
                        minWidth: 180
                    }}
                >

                    <MenuItem value="">
                        Default
                    </MenuItem>

                    <MenuItem value="priceAsc">
                        Price Low → High
                    </MenuItem>

                    <MenuItem value="priceDesc">
                        Price High → Low
                    </MenuItem>

                    <MenuItem value="name">
                        Name A-Z
                    </MenuItem>

                    <MenuItem value="newest">
                        Newest
                    </MenuItem>

                </TextField>

                <Button
                    variant="contained"
                    onClick={handleApply}
                    sx={{
                        bgcolor: "#008C95",
                        minWidth: 140,
                        height: 56,
                        "&:hover": {
                            bgcolor: "#00757d"
                        }
                    }}
                >

                    Apply

                </Button>

                <Button
                    variant="outlined"
                    onClick={handleClear}
                    sx={{
                        minWidth: 120,
                        height: 56
                    }}
                >

                    Clear

                </Button>

            </Box>

        </Paper>

    );

}