import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Paper,
    Snackbar,
    Collapse,
    Rating
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {

    const { id } = useParams();
    const { refreshCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [cartLoading, setCartLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [seoExpanded, setSeoExpanded] = useState(false);

    const prodId = product?.productId || product?.id || product?.productid;
    const isFav = prodId ? isInWishlist(prodId) : false;

    useEffect(() => {
        loadProduct();
    }, [id]);

    async function loadProduct() {
        try {
            setLoading(true);
            setError("");
            const data = await getProductById(id);
            setProduct(data);
            setActiveImageIndex(0);
        }
        catch (error) {
            console.error(error);
            setError("Unable to load product.");
        }
        finally {
            setLoading(false);
        }
    }

    async function handleAddToCart() {
        if (!prodId) return;

        try {
            setCartLoading(true);
            await addToCart(prodId, 1);
            await refreshCart();
            setSnackbarSeverity("success");
            setSnackbarMessage("Product added to cart successfully.");
            setSnackbarOpen(true);
        }
        catch (err) {
            console.error(err);
            setSnackbarSeverity("error");
            setSnackbarMessage(
                err.response?.data?.message || "Unable to add product to cart."
            );
            setSnackbarOpen(true);
        }
        finally {
            setCartLoading(false);
        }
    }

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={12}
            >
                <CircularProgress sx={{ color: "#008C95" }} size={48} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ maxWidth: 1400, mx: "auto", mt: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>
            </Box>
        );
    }

    const defaultImg = product?.imageUrl || "https://placehold.co/700x700?text=No+Image";
    const galleryImages = [
        defaultImg,
        defaultImg,
        defaultImg
    ];
    const currentDisplayImage = galleryImages[activeImageIndex] || defaultImg;

    return (
        <Box sx={{ width: "100%", pb: 6 }}>
            {/* Top Product Section: 2-Column Desktop Grid Layout */}
            <Box
                sx={{
                    maxWidth: "1400px",
                    margin: "auto",
                    padding: { xs: "20px", sm: "24px", md: "32px" },
                    background: "white",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                    border: "1px solid #ECECEC",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "40% 60%",
                        md: "480px 1fr"
                    },
                    gap: { xs: "24px", sm: "32px", md: "48px" },
                    alignItems: "start"
                }}
            >
                {/* LEFT COLUMN: Product Gallery (Max 480px width) */}
                <Box
                    sx={{
                        maxWidth: "480px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px"
                    }}
                >
                    {/* Main Image in White Rounded Card */}
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "460px",
                            bgcolor: "#FFFFFF",
                            borderRadius: "20px",
                            border: "1px solid #ECECEC",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                            p: { xs: 2, sm: 2.5, md: 3 },
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "auto",
                            boxSizing: "border-box"
                        }}
                    >
                        <Box
                            component="img"
                            src={currentDisplayImage}
                            alt={product?.productName || "Product"}
                            sx={{
                                maxWidth: "460px",
                                width: "100%",
                                aspectRatio: "1/1",
                                objectFit: "contain",
                                margin: "auto",
                                display: "block",
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.03)"
                                }
                            }}
                        />
                    </Box>

                    {/* Thumbnail Gallery Below Main Image */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            width: "100%"
                        }}
                    >
                        {galleryImages.map((imgSrc, idx) => {
                            const isActive = activeImageIndex === idx;
                            return (
                                <Box
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    sx={{
                                        width: { xs: "54px", sm: "64px" },
                                        height: { xs: "54px", sm: "64px" },
                                        borderRadius: "14px",
                                        border: isActive ? "2.5px solid #008C95" : "1.5px solid #ECECEC",
                                        p: "4px",
                                        cursor: "pointer",
                                        bgcolor: "#FFFFFF",
                                        boxShadow: isActive ? "0 4px 12px rgba(0, 140, 149, 0.25)" : "0 2px 6px rgba(0,0,0,0.03)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "#008C95",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 6px 14px rgba(0, 140, 149, 0.2)"
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={imgSrc}
                                        alt={`Thumbnail ${idx + 1}`}
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </Box>
                            );
                        })}
                    </Box>
                </Box>

                {/* RIGHT COLUMN: Product Information (Starts from top, perfectly aligned) */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%"
                    }}
                >
                    {/* 1. Category Badge */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, flexWrap: "wrap" }}>
                        <Chip
                            label={product?.category || "General"}
                            sx={{
                                bgcolor: "#E0F7F8",
                                color: "#008C95",
                                fontWeight: 700,
                                fontSize: "13px",
                                borderRadius: "8px",
                                height: "28px",
                                px: 0.5
                            }}
                        />
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "#FFFBEB", px: 1, py: 0.2, borderRadius: "6px", border: "1px solid #FDE68A" }}>
                            <StarRoundedIcon sx={{ color: "#F59E0B", fontSize: 18 }} />
                            <Typography sx={{ fontSize: "13px", fontWeight: 700, color: "#92400E" }}>
                                4.8
                            </Typography>
                            <Typography sx={{ fontSize: "12px", color: "#B45309" }}>
                                (1.2k+ reviews)
                            </Typography>
                        </Box>
                    </Box>

                    {/* 2. Product Name */}
                    <Typography
                        sx={{
                            fontSize: { xs: "28px", sm: "36px", md: "46px" },
                            fontWeight: "bold",
                            color: "#0F172A",
                            lineHeight: 1.15,
                            letterSpacing: "-0.5px",
                            mb: 1
                        }}
                    >
                        {product?.productName}
                    </Typography>

                    {/* 3. Brand */}
                    <Typography
                        sx={{
                            fontSize: "18px",
                            color: "#64748B",
                            fontWeight: 500,
                            mb: 2
                        }}
                    >
                        Brand :{" "}
                        <Box component="span" sx={{ color: "#008C95", fontWeight: 700 }}>
                            {product?.brand || "Brand Store"}
                        </Box>
                    </Typography>

                    {/* 4. Large Price */}
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, flexWrap: "wrap", mb: 1.5 }}>
                        <Typography
                            sx={{
                                fontSize: { xs: "32px", sm: "38px", md: "42px" },
                                fontWeight: "bold",
                                color: "#0F172A",
                                lineHeight: 1
                            }}
                        >
                            ₹{Number(product?.price || 0).toLocaleString("en-IN")}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#64748B",
                                fontWeight: 500
                            }}
                        >
                            Inclusive of all taxes
                        </Typography>
                    </Box>

                    {/* 5. Stock Status */}
                    <Box sx={{ mb: 2 }}>
                        {product?.stockQuantity > 0 ? (
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    bgcolor: "#ECFDF5",
                                    color: "#059669",
                                    border: "1px solid #A7F3D0",
                                    borderRadius: "8px",
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "14px",
                                    fontWeight: 600
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#10B981"
                                    }}
                                />
                                In Stock ({product.stockQuantity} available)
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    bgcolor: "#FEF2F2",
                                    color: "#DC2626",
                                    border: "1px solid #FECACA",
                                    borderRadius: "8px",
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "14px",
                                    fontWeight: 600
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#EF4444"
                                    }}
                                />
                                Out of Stock
                            </Box>
                        )}
                    </Box>

                    {/* 6. Short Description */}
                    <Typography
                        sx={{
                            fontSize: "16px",
                            lineHeight: 1.7,
                            color: "#475569",
                            mb: 2.5
                        }}
                    >
                        {product?.description}
                    </Typography>

                    {/* 7. Key Features */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                            gap: 1.5,
                            bgcolor: "#F8FAFC",
                            p: 2,
                            borderRadius: "16px",
                            border: "1px solid #E2E8F0",
                            width: "100%",
                            boxSizing: "border-box",
                            mb: 2
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <VerifiedUserOutlinedIcon sx={{ color: "#008C95", fontSize: 20 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>
                                100% Genuine Product
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocalShippingOutlinedIcon sx={{ color: "#008C95", fontSize: 20 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>
                                Free Express Delivery
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AssignmentReturnOutlinedIcon sx={{ color: "#008C95", fontSize: 20 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>
                                7-Day Easy Return
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CheckCircleOutlineRoundedIcon sx={{ color: "#008C95", fontSize: 20 }} />
                            <Typography sx={{ fontSize: "14px", fontWeight: 600, color: "#334155" }}>
                                1 Year Official Warranty
                            </Typography>
                        </Box>
                    </Box>

                    {/* 8. SEO text (collapsed if long) */}
                    <Box sx={{ width: "100%", mb: 1 }}>
                        <Button
                            onClick={() => setSeoExpanded(!seoExpanded)}
                            endIcon={seoExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            sx={{
                                color: "#008C95",
                                fontWeight: 600,
                                fontSize: "14px",
                                p: 0,
                                textTransform: "none",
                                "&:hover": { bgcolor: "transparent", textDecoration: "underline" }
                            }}
                        >
                            {seoExpanded ? "Hide Overview & SEO Details" : "View Overview & SEO Specifications"}
                        </Button>
                        <Collapse in={seoExpanded}>
                            <Box
                                sx={{
                                    mt: 1.5,
                                    p: 2,
                                    bgcolor: "#F8FAFC",
                                    borderRadius: "12px",
                                    border: "1px solid #ECECEC"
                                }}
                            >
                                <Typography sx={{ fontSize: "13px", color: "#64748B", lineHeight: 1.6 }}>
                                    Discover superior quality and exceptional durability with the {product?.productName}. Designed for {product?.category} enthusiasts, featuring authentic components from {product?.brand}. Order now on Kharido.com to enjoy verified seller authenticity, instant checkout, and direct doorstep shipment across India.
                                </Typography>
                            </Box>
                        </Collapse>
                    </Box>

                    {/* 9. BUTTONS: Immediately after description/features */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: "16px",
                            mt: "24px",
                            width: "100%",
                            maxWidth: "520px"
                        }}
                    >
                        {/* Add To Cart: Full teal button, height 52px, hover animation */}
                        <Button
                            variant="contained"
                            startIcon={<ShoppingCartOutlinedIcon />}
                            disabled={product?.stockQuantity === 0 || cartLoading}
                            onClick={handleAddToCart}
                            sx={{
                                flex: 1,
                                height: "52px",
                                bgcolor: "#008C95",
                                color: "#FFFFFF",
                                borderRadius: "14px",
                                fontSize: "16px",
                                fontWeight: 700,
                                textTransform: "none",
                                boxShadow: "0 4px 14px rgba(0, 140, 149, 0.25)",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    bgcolor: "#00757D",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 8px 22px rgba(0, 140, 149, 0.35)"
                                },
                                "&:active": {
                                    transform: "translateY(0)"
                                },
                                "&.Mui-disabled": {
                                    bgcolor: "#E2E8F0",
                                    color: "#94A3B8"
                                }
                            }}
                        >
                            {cartLoading ? "Adding..." : "Add To Cart"}
                        </Button>

                        {/* Wishlist: Outlined teal, same height (52px), hover animation */}
                        <Button
                            variant={isFav ? "contained" : "outlined"}
                            onClick={() => product && toggleWishlist(product)}
                            startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            sx={{
                                height: "52px",
                                px: { xs: 2.5, sm: 3.5 },
                                borderRadius: "14px",
                                fontSize: "16px",
                                fontWeight: 700,
                                textTransform: "none",
                                borderColor: isFav ? "#EF4444" : "#008C95",
                                borderWidth: isFav ? 0 : "2px",
                                bgcolor: isFav ? "#EF4444" : "transparent",
                                color: isFav ? "#FFFFFF" : "#008C95",
                                transition: "all 0.25s ease",
                                "&:hover": {
                                    borderWidth: isFav ? 0 : "2px",
                                    bgcolor: isFav ? "#DC2626" : "#E0F7F8",
                                    borderColor: isFav ? "#DC2626" : "#00757D",
                                    color: isFav ? "#FFFFFF" : "#00757D",
                                    transform: "translateY(-2px)",
                                    boxShadow: isFav
                                        ? "0 8px 20px rgba(239, 68, 68, 0.3)"
                                        : "0 6px 18px rgba(0, 140, 149, 0.2)"
                                },
                                "&:active": {
                                    transform: "translateY(0)"
                                }
                            }}
                        >
                            {isFav ? "In Wishlist" : "Wishlist"}
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Preserved Reviews & Ratings Section Below Product Details */}
            <Box
                sx={{
                    maxWidth: "1400px",
                    margin: "32px auto 0 auto",
                    padding: { xs: "20px", sm: "24px", md: "32px" },
                    background: "white",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                    border: "1px solid #ECECEC"
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="#0F172A" mb={3}>
                    Customer Reviews & Ratings
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
                        gap: 3
                    }}
                >
                    <Box sx={{ p: 3, bgcolor: "#F8FAFC", borderRadius: "18px", textAlign: "center", border: "1px solid #E2E8F0" }}>
                        <Typography sx={{ fontSize: "48px", fontWeight: 800, color: "#008C95", lineHeight: 1 }}>
                            4.8
                        </Typography>
                        <Rating value={4.8} precision={0.1} readOnly sx={{ my: 1, color: "#F59E0B" }} />
                        <Typography sx={{ fontSize: "14px", color: "#64748B" }}>
                            Based on 1,248 verified customer reviews
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Box sx={{ p: 2.5, bgcolor: "#FFFFFF", borderRadius: "14px", border: "1px solid #ECECEC" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Typography fontWeight="bold" color="#0F172A" fontSize="15px">
                                    Rahul Sharma <Chip label="Verified Purchase" size="small" sx={{ ml: 1, height: 20, fontSize: "11px", bgcolor: "#ECFDF5", color: "#059669" }} />
                                </Typography>
                                <Rating value={5} readOnly size="small" sx={{ color: "#F59E0B" }} />
                            </Box>
                            <Typography sx={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>
                                Exceptional build quality and lightning fast performance! Matches the description completely and delivery was on time. Highly recommended!
                            </Typography>
                        </Box>
                        <Box sx={{ p: 2.5, bgcolor: "#FFFFFF", borderRadius: "14px", border: "1px solid #ECECEC" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                <Typography fontWeight="bold" color="#0F172A" fontSize="15px">
                                    Priya Patel <Chip label="Verified Purchase" size="small" sx={{ ml: 1, height: 20, fontSize: "11px", bgcolor: "#ECFDF5", color: "#059669" }} />
                                </Typography>
                                <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ color: "#F59E0B" }} />
                            </Box>
                            <Typography sx={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>
                                Great value for money. Packaging was very secure and product arrived without a scratch. Satisfied with Kharido!
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Notification Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    severity={snackbarSeverity}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    sx={{ borderRadius: "12px", fontWeight: 600 }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}