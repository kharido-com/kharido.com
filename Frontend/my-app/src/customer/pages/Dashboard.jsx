import { useState } from "react";
import { Box } from "@mui/material";

import HeroBanner from "../components/dashboard/HeroBanner";
import CategorySection from "../components/dashboard/CategorySection";
import FeaturedProducts from "../components/dashboard/FeaturedProducts";

export default function Dashboard() {

    const [categoryId, setCategoryId] = useState(null);

    return (
        <Box>

            <HeroBanner />

            <CategorySection
                onCategorySelect={setCategoryId}
            />

            <FeaturedProducts
                categoryId={categoryId}
            />

        </Box>
    );

}