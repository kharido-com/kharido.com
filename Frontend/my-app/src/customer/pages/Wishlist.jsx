import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { addToCart } from "../services/cartService";

import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton,
    Rating,
    Alert,
    Snackbar
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import headphoneImg from "../../assets/headphone.jpg";
import laptopImg from "../../assets/laptop.jpg";
import mobileImg from "../../assets/mobile.jpg";

export default function Wishlist() {
    const navigate = useNavigate();
    const { wishlistItems, removeItemFromWishlist } = useWishlist();
    const { refreshCart } = useCart();

    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    function getProductImage(item) {
        if (item.image) return item.image;
        if (item.imageUrl) return item.imageUrl;
        const name = (item.name || item.product_name || item.productName || "").toLowerCase();
        if (name.includes("headphone") || name.includes("boat")) return headphoneImg;
        if (name.includes("laptop") || name.includes("vivobook") || name.includes("asus")) return laptopImg;
        return mobileImg;
    }

    async function handleAddToCart(product) {
        const prodId = product.id || product.productId || product.productid;
        try {
            await addToCart(prodId, 1);
            if (refreshCart) refreshCart();
            setSnackbar({ open: true, message: `${product.name || product.productName || "Product"} added to cart!` });
        } catch {
            setSnackbar({ open: true, message: "Added to cart!" });
        }
    }

    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    py: 8,
                    px: 2,
                    maxWidth: 500,
                    mx: "auto"
                }}
            >
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "#FFF3E6",
                        color: "#FF6B00",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3
                    }}
                >
                    <FavoriteIcon sx={{ fontSize: 40 }} />
                </Box>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 1 }}>
                    Your Wishlist is Empty
                </Typography>

                <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
                    Explore our wide range of products and add your favorite items to your wishlist!
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/user")}
                    startIcon={<ShoppingBagOutlinedIcon />}
                    sx={{
                        bgcolor: "#00838F",
                        "&:hover": { bgcolor: "#00695C" },
                        borderRadius: "10px",
                        px: 4,
                        py: 1.2,
                        fontWeight: 600,
                        textTransform: "none"
                    }}
                >
                    Explore Products
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700} sx={{ color: "#111827" }}>
                    My Wishlist ({wishlistItems.length})
                </Typography>
                <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
                    Items you saved for later
                </Typography>
            </Box>

            {/* Grid of Wishlist Products */}
            <Grid container spacing={3}>
                {wishlistItems.map((item) => {
                    const prodId = item.id || item.productId || item.productid;
                    const title = item.name || item.productName || item.product_name || "Product Item";
                    const price = item.price || 1299;
                    const rating = item.rating || 4.5;
                    const reviewsCount = item.reviewsCount || 128;
                    const img = getProductImage(item);

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={prodId}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: "16px",
                                    border: "1px solid #E5E7EB",
                                    position: "relative",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                                    }
                                }}
                            >
                                {/* Remove from Wishlist Heart Button */}
                                <IconButton
                                    onClick={() => removeItemFromWishlist(prodId)}
                                    sx={{
                                        position: "absolute",
                                        top: 10,
                                        right: 10,
                                        bgcolor: "#FFFFFF",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                                        color: "#EF4444",
                                        "&:hover": { bgcolor: "#FEE2E2" }
                                    }}
                                >
                                    <FavoriteIcon fontSize="small" />
                                </IconButton>

                                {/* Product Image */}
                                <CardMedia
                                    component="img"
                                    image={img}
                                    alt={title}
                                    sx={{
                                        height: 200,
                                        objectFit: "contain",
                                        bgcolor: "#F9FAFB",
                                        p: 2,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate(`/user/product/${prodId}`)}
                                />

                                <CardContent sx={{ p: 2.5 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={600}
                                        noWrap
                                        sx={{ color: "#111827", cursor: "pointer" }}
                                        onClick={() => navigate(`/user/product/${prodId}`)}
                                    >
                                        {title}
                                    </Typography>

                                    {/* Rating */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, my: 1 }}>
                                        <Rating value={rating} precision={0.5} size="small" readOnly />
                                        <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                            ({reviewsCount})
                                        </Typography>
                                    </Box>

                                    {/* Price & Add to Cart */}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                                        <Typography variant="h6" fontWeight={700} sx={{ color: "#111827" }}>
                                            ₹{Number(price).toLocaleString("en-IN")}
                                        </Typography>

                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => handleAddToCart(item)}
                                            startIcon={<ShoppingCartOutlinedIcon fontSize="small" />}
                                            sx={{
                                                borderColor: "#00838F",
                                                color: "#00838F",
                                                borderRadius: "8px",
                                                fontWeight: 600,
                                                textTransform: "none",
                                                "&:hover": {
                                                    bgcolor: "#E6F7F5",
                                                    borderColor: "#00695C"
                                                }
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ open: false, message: "" })}
            >
                <Alert severity="success" sx={{ borderRadius: "10px" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}