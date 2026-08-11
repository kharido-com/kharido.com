import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function CustomerLayout() {
    return (
        <CartProvider>
            <WishlistProvider>
                <Box
                    sx={{
                        display: "flex",
                        minHeight: "100vh",
                        width: "100%",
                        bgcolor: "#F5F7FA"
                    }}
                >
                    <Sidebar />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            overflow: "hidden"
                        }}
                    >
                        <Header />

                        <Box
                            sx={{
                                flex: 1,
                                flexGrow: 1,
                                width: "100%",
                                maxWidth: "none",
                                p: { xs: 2, sm: 3, md: "32px" },
                                bgcolor: "#F5F7FA",
                                overflowX: "hidden"
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            </WishlistProvider>
        </CartProvider>
    );
}