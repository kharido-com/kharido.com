import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    Chip,
    IconButton,
    Snackbar,
    Alert
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { addToCart } from "../../services/cartService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductCard({ product }) {

    const navigate = useNavigate();

    const { refreshCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const prodId = product?.productId || product?.id || product?.productid;
    const isFav = prodId ? isInWishlist(prodId) : false;

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("success");
    const [open, setOpen] = useState(false);

    function openProduct() {
        navigate(`/user/product/${product.productId}`);
    }

    const handleToggleWishlist = (e) => {
        e.stopPropagation();
        if (product) {
            toggleWishlist(product);
        }
    };

    async function handleAddToCart() {

        try {

            setLoading(true);

            await addToCart(product.productId, 1);

            await refreshCart();

            setSeverity("success");
            setMessage("Product added to cart.");
            setOpen(true);

        }

        catch (error) {

            console.error(error);

            setSeverity("error");
            setMessage(
                error.response?.data?.message ||
                "Unable to add product to cart."
            );
            setOpen(true);

        }

        finally {

            setLoading(false);

        }

    }

    return (
        <>
            <Card
                elevation={0}
                sx={{
                    border: "1px solid #ECECEC",
                    borderRadius: 4,
                    overflow: "hidden",
                    transition: ".3s",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 12px 25px rgba(0,0,0,.12)"
                    }
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={
                            product.imageUrl ||
                            "https://placehold.co/600x500?text=No+Image"
                        }
                        alt={product.productName}
                        sx={{
                            height: 220,
                            objectFit: "cover",
                            cursor: "pointer"
                        }}
                        onClick={openProduct}
                    />

                    <IconButton
                        onClick={handleToggleWishlist}
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "#fff",
                            color: isFav ? "#EF4444" : "#6B7280",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            "&:hover": {
                                bgcolor: isFav ? "#FEE2E2" : "#F3F4F6"
                            }
                        }}
                    >
                        {isFav ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                </Box>

                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1
                    }}
                >
                    <Chip
                        label={product.category}
                        size="small"
                        sx={{
                            width: "fit-content",
                            bgcolor: "#E0F7F8",
                            color: "#008C95",
                            mb: 2
                        }}
                    />

                    <Typography
                        fontWeight={600}
                        sx={{
                            minHeight: 48,
                            cursor: "pointer",
                            transition: ".2s",
                            "&:hover": {
                                color: "#008C95"
                            }
                        }}
                        onClick={openProduct}
                    >
                        {product.productName}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                    >
                        {product.brand}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#FF7A00"
                    >
                        ₹{product.price}
                    </Typography>

                    <Typography
                        variant="body2"
                        color={
                            product.stockQuantity > 0
                                ? "success.main"
                                : "error.main"
                        }
                        mb={2}
                    >
                        {product.stockQuantity > 0
                            ? "In Stock"
                            : "Out of Stock"}
                    </Typography>

                    <Box sx={{ mt: "auto" }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCartOutlinedIcon />}
                            disabled={
                                product.stockQuantity === 0 || loading
                            }
                            onClick={handleAddToCart}
                            sx={{
                                bgcolor: "#008C95",
                                borderRadius: 2,
                                "&:hover": {
                                    bgcolor: "#00757D"
                                }
                            }}
                        >
                            {loading ? "Adding..." : "Add To Cart"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    severity={severity}
                    variant="filled"
                    onClose={() => setOpen(false)}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );

}