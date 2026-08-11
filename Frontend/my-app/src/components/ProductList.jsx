import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FeaturedProducts from "../customer/components/dashboard/FeaturedProducts";

export default function ProductList() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#F5F7FA", width: "100%" }}>
      <Navbar />

      <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 4, flex: 1, boxSizing: "border-box" }}>
        <FeaturedProducts />
      </Box>

      <Footer />
    </Box>
  );
}