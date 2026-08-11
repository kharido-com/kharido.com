import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import KitchenIcon from "@mui/icons-material/Kitchen";

import { getCategories } from "../../services/productService";

export default function CategorySection({ onCategorySelect }) {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleCategoryClick(categoryId) {
        if (selectedCategory === categoryId) {
            setSelectedCategory(null);
            onCategorySelect(null);
            return;
        }

        setSelectedCategory(categoryId);
        onCategorySelect(categoryId);
    }

    function getCategoryIcon(categoryName) {

        switch (categoryName.toLowerCase()) {

            case "electronics":
                return <DevicesIcon sx={{ fontSize: 42 }} />;

            case "fashion":
                return <CheckroomIcon sx={{ fontSize: 42 }} />;

            case "books":
                return <MenuBookIcon sx={{ fontSize: 42 }} />;

            case "gaming":
                return <SportsEsportsIcon sx={{ fontSize: 42 }} />;

            case "sports":
                return <SportsSoccerIcon sx={{ fontSize: 42 }} />;

            case "home appliances":
                return <KitchenIcon sx={{ fontSize: 42 }} />;

            default:
                return <DevicesIcon sx={{ fontSize: 42 }} />;
        }

    }

    return (
        <Box sx={{ mb: 5 }}>

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                Shop by Category
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                    gap: 3
                }}
            >
                {
                    categories.map(category => (

                        <Paper
                            key={category.categoryId}
                            elevation={0}
                            onClick={() => handleCategoryClick(category.categoryId)}
                            sx={{
                                height: 150,
                                borderRadius: 4,
                                border: selectedCategory === category.categoryId
                                    ? "2px solid #FF7A00"
                                    : "1px solid #ECECEC",
                                bgcolor: selectedCategory === category.categoryId
                                    ? "#008C95"
                                    : "#fff",
                                color: selectedCategory === category.categoryId
                                    ? "#fff"
                                    : "#000",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                transition: ".3s",
                                "&:hover": {
                                    bgcolor: "#008C95",
                                    color: "#fff",
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 12px 25px rgba(0,0,0,.15)"
                                }
                            }}
                        >

                            <Box mb={2}>
                                {getCategoryIcon(category.categoryName)}
                            </Box>

                            <Typography
                                align="center"
                                fontWeight={600}
                            >
                                {category.categoryName}
                            </Typography>

                        </Paper>

                    ))
                }

            </Box>

        </Box>
    );

}