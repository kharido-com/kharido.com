import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import customerService from "../services/customerService";
import orderService from "../services/orderService";
import { getCart } from "../services/cartService";
import { useWishlist } from "../context/WishlistContext";

import {
    Box,
    Grid,
    Card,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

import headphoneImg from "../../assets/headphone.jpg";
import laptopImg from "../../assets/laptop.jpg";
import mobileImg from "../../assets/mobile.jpg";

export default function Profile() {
    const navigate = useNavigate();
    const { wishlistCount } = useWishlist();

    // Data States
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(true);

    // Edit Modal States
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        gender: ""
    });
    const [saving, setSaving] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        loadAllData();
    }, []);

    async function loadAllData() {
        setLoading(true);

        // Fetch Customer Profile
        try {
            const profileData = await customerService.getProfile();
            if (profileData) {
                setProfile(profileData);
                setEditForm({
                    firstName: profileData.firstName || "",
                    lastName: profileData.lastName || "",
                    phone: profileData.phone || "",
                    dob: profileData.dob || "",
                    gender: profileData.gender || "MALE"
                });
            }
        } catch (err) {
            console.error("Failed to load profile:", err);
            // Fallback default user if offline/unauthenticated
            setAlertMessage({
                type: "error",
                text: "Unable to load profile."
            });
        }

        // Fetch Orders
        try {
            const ordersData = await orderService.getOrders();
            if (ordersData && Array.isArray(ordersData) && ordersData.length > 0) {
                setOrders(ordersData);
            } else {
                setOrders(getFallbackOrders());
            }
        } catch (err) {
            console.error("Failed to load orders:", err);
            setOrders(getFallbackOrders());
        }

        // Fetch Cart
        try {
            const cartData = await getCart();
            if (cartData && cartData.items) {
                const totalQty = cartData.items.reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(totalQty);
            }
        } catch (err) {
            console.error("Failed to load cart:", err);
        }

        setLoading(false);
    }

    function getFallbackOrders() {
        return [
            {
                orderId: 10245,
                productName: "boAt Rockerz 450",
                orderDate: "24 May 2025",
                orderStatus: "Delivered",
                totalAmount: 1299,
                image: headphoneImg
            },
            {
                orderId: 10244,
                productName: "ASUS VivoBook 15",
                orderDate: "20 May 2025",
                orderStatus: "Shipped",
                totalAmount: 32990,
                image: laptopImg
            },
            {
                orderId: 10243,
                productName: "Noise ColorFit Pro 4",
                orderDate: "18 May 2025",
                orderStatus: "Processing",
                totalAmount: 2499,
                image: mobileImg
            }
        ];
    }

    // Calculations for Stats
    const totalOrdersCount = orders.length;
    const totalSpentAmount = orders.reduce((sum, order) => {
        const status = (order.orderStatus || "").toUpperCase();
        const payment = (order.paymentStatus || "").toUpperCase();
        if (status === "CANCELLED" || payment === "FAILED" || payment === "REFUNDED") {
            return sum;
        }
        return sum + Number(order.totalAmount || 0);
    }, 0);

    const formattedSpent = `₹${totalSpentAmount.toLocaleString("en-IN")}`;

    // Display Name
    const firstName = profile?.firstName || "";
    const lastName = profile?.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();
    const email = profile?.email || "";
    const phone = profile?.phone || "";

    // Format Member Since
    const memberSince = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
        : "-";

    // Status Badge Stylings
    function getStatusBadgeStyle(status) {
        const s = (status || "").toLowerCase();
        if (s.includes("deliver")) {
            return { bgcolor: "#E6F6ED", color: "#168A4A" };
        }
        if (s.includes("ship") || s.includes("transit")) {
            return { bgcolor: "#FFF5E5", color: "#D97706" };
        }
        if (s.includes("process") || s.includes("place") || s.includes("pend")) {
            return { bgcolor: "#E0F2FE", color: "#0284C7" };
        }
        return { bgcolor: "#FEE2E2", color: "#DC2626" };
    }

    // Edit Profile Handlers
    function handleOpenEdit() {
        const initialPhone = profile?.phone || "";
        setEditForm({
            firstName: profile?.firstName || "",
            lastName: profile?.lastName || "",
            phone: initialPhone,
            dob: profile?.dob || "",
            gender: profile?.gender || "MALE"
        });
        if (initialPhone && (!/^\d+$/.test(initialPhone) || initialPhone.length !== 10)) {
            setPhoneError("Phone number must contain exactly 10 digits");
        } else {
            setPhoneError("");
        }
        setAlertMessage({ type: "", text: "" });
        setOpenEditModal(true);
    }

    function handleEditChange(e) {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));

        if (name === "phone") {
            const cleanVal = value.trim();
            if (!cleanVal) {
                setPhoneError("Phone number is required");
            } else if (!/^\d+$/.test(cleanVal)) {
                setPhoneError("Phone number must contain only digits");
            } else if (cleanVal.length !== 10) {
                setPhoneError("Phone number must contain exactly 10 digits");
            } else {
                setPhoneError("");
            }
        }
    }

    async function handleSaveProfile() {
        const phoneVal = (editForm.phone || "").trim();
        if (!phoneVal) {
            setPhoneError("Phone number is required");
            return;
        }
        if (!/^\d+$/.test(phoneVal)) {
            setPhoneError("Phone number must contain only digits");
            return;
        }
        if (phoneVal.length !== 10) {
            setPhoneError("Phone number must contain exactly 10 digits");
            return;
        }

        setSaving(true);
        setAlertMessage({ type: "", text: "" });
        try {
            const updated = await customerService.updateProfile({
                ...profile,
                ...editForm,
                phone: phoneVal
            });
            const newProfile = updated || { ...profile, ...editForm, phone: phoneVal };
            setProfile(newProfile);
            window.dispatchEvent(new CustomEvent("customerProfileUpdated", { detail: newProfile }));
            setPhoneError("");
            setAlertMessage({ type: "success", text: "Profile updated successfully!" });
            setTimeout(() => setOpenEditModal(false), 800);
        } catch (error) {
            console.error("Save profile error:", error);
            setAlertMessage({ type: "error", text: error.message || "Failed to update profile in database" });
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress sx={{ color: "#00838F" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", pb: 4 }}>
            {/* Top Greeting Header */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                    sx={{
                        color: "#111827",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        fontSize: { xs: "1.5rem", md: "1.85rem" }
                    }}
                >
                    Welcome back,{" "}
                    <Box component="span" sx={{ color: "#00838F", fontWeight: 700 }}>
                        {fullName}
                    </Box>{" "}
                    👋
                </Typography>
                <Typography variant="body1" sx={{ color: "#6B7280", mt: 0.5, fontSize: "0.95rem" }}>
                    Manage your account details and track your orders
                </Typography>
            </Box>

            {/* Alert Message if any */}
            {alertMessage.text && (
                <Alert severity={alertMessage.type} sx={{ mb: 3, borderRadius: "12px" }}>
                    {alertMessage.text}
                </Alert>
            )}

            {/* Stat Cards Grid (4 Column Layout) */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, minmax(0, 1fr))"
                    },
                    gap: "24px",
                    width: "100%",
                    mb: "24px"
                }}
            >
                {/* Card 1: Total Orders */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "12px",
                                bgcolor: "#E6F7F5",
                                color: "#00838F",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <ShoppingBagOutlinedIcon fontSize="medium" />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.85rem" }}>
                                Total Orders
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mt: 0.2 }}>
                                {totalOrdersCount}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        onClick={() => navigate("/user/orders")}
                        sx={{
                            color: "#00838F",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": { textDecoration: "underline" }
                        }}
                    >
                        View all orders →
                    </Typography>
                </Card>

                {/* Card 2: Total Spent */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "12px",
                                bgcolor: "#FFF3E6",
                                color: "#F57C00",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <AccountBalanceWalletOutlinedIcon fontSize="medium" />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.85rem" }}>
                                Total Spent
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mt: 0.2 }}>
                                {formattedSpent}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        onClick={() => navigate("/user/orders")}
                        sx={{
                            color: "#F57C00",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": { textDecoration: "underline" }
                        }}
                    >
                        View details →
                    </Typography>
                </Card>

                {/* Card 3: Wishlist Items */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "12px",
                                bgcolor: "#E6F7F5",
                                color: "#00838F",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <FavoriteBorderOutlinedIcon fontSize="medium" />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.85rem" }}>
                                Wishlist Items
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mt: 0.2 }}>
                                {wishlistCount}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        onClick={() => navigate("/user/wishlist")}
                        sx={{
                            color: "#00838F",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": { textDecoration: "underline" }
                        }}
                    >
                        View wishlist →
                    </Typography>
                </Card>

                {/* Card 4: Cart Items */}
                <Card
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: "12px",
                                bgcolor: "#FFF3E6",
                                color: "#F57C00",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 500, fontSize: "0.85rem" }}>
                                Cart Items
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mt: 0.2 }}>
                                {cartCount}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        onClick={() => navigate("/user/cart")}
                        sx={{
                            color: "#F57C00",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.5,
                            "&:hover": { textDecoration: "underline" }
                        }}
                    >
                        View cart →
                    </Typography>
                </Card>
            </Box>

            {/* Two Column Layout: Recent Orders & Account Overview */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "2fr 1fr"
                    },
                    gap: "24px",
                    width: "100%"
                }}
            >
                {/* Left Column: Recent Orders */}
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {/* Title Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2.5
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} sx={{ color: "#111827" }}>
                            Recent Orders
                        </Typography>
                        <Typography
                            onClick={() => navigate("/user/orders")}
                            sx={{
                                color: "#00838F",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" }
                            }}
                        >
                            View All
                        </Typography>
                    </Box>

                    {/* Recent Orders List */}
                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                        {orders.slice(0, 3).map((item, index) => {
                            const prodTitle = item.productName || (item.items && item.items[0]?.productName) || `Order #${item.orderId}`;
                            const prodImage = item.image || headphoneImg;
                            const statusStyle = getStatusBadgeStyle(item.orderStatus);
                            const orderDateStr = item.orderDate || "24 May 2025";
                            const priceVal = item.totalAmount || 1299;

                            return (
                                <Box
                                    key={item.orderId || index}
                                    onClick={() => navigate("/user/orders")}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 1.5,
                                        borderRadius: "12px",
                                        border: "1px solid #F3F4F6",
                                        cursor: "pointer",
                                        transition: "background-color 0.2s ease",
                                        "&:hover": { bgcolor: "#F9FAFB" }
                                    }}
                                >
                                    {/* Product Image & Details */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Box
                                            component="img"
                                            src={prodImage}
                                            alt={prodTitle}
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: "10px",
                                                objectFit: "contain",
                                                bgcolor: "#F8FAFC",
                                                p: 0.5,
                                                border: "1px solid #E5E7EB"
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="body1" fontWeight={600} sx={{ color: "#111827", fontSize: "0.95rem" }}>
                                                {prodTitle}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#6B7280", fontSize: "0.825rem", mt: 0.3 }}>
                                                Order ID: #{item.orderId}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: "#9CA3AF", fontSize: "0.8rem", mt: 0.1 }}>
                                                {orderDateStr}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Status, Price & Chevron */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        <Box sx={{ textAlign: "right" }}>
                                            <Box
                                                sx={{
                                                    display: "inline-block",
                                                    px: 1.5,
                                                    py: 0.4,
                                                    borderRadius: "12px",
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
                                                    bgcolor: statusStyle.bgcolor,
                                                    color: statusStyle.color,
                                                    mb: 0.5
                                                }}
                                            >
                                                {item.orderStatus || "Delivered"}
                                            </Box>
                                            <Typography variant="body1" fontWeight={700} sx={{ color: "#111827", fontSize: "0.95rem" }}>
                                                ₹{priceVal.toLocaleString("en-IN")}
                                            </Typography>
                                        </Box>
                                        <ChevronRightIcon sx={{ color: "#9CA3AF" }} />
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    {/* View All Orders Button */}
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate("/user/orders")}
                        sx={{
                            mt: 3,
                            py: 1.2,
                            color: "#00838F",
                            borderColor: "#00838F",
                            borderRadius: "10px",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
                            "&:hover": {
                                borderColor: "#00695C",
                                bgcolor: "#E6F7F5"
                            }
                        }}
                    >
                        View All Orders
                    </Button>
                </Card>

                {/* Right Column: Account Overview */}
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: "16px",
                        border: "1px solid #E5E7EB",
                        bgcolor: "#FFFFFF",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="h6" fontWeight={700} sx={{ color: "#111827", mb: 2.5 }}>
                        Account Overview
                    </Typography>

                    {/* Details List */}
                    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2.5 }}>
                        {/* Name */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1.5,
                                borderBottom: "1px solid #F3F4F6"
                            }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                                    Name
                                </Typography>
                                <Typography variant="body1" fontWeight={600} sx={{ color: "#111827", mt: 0.2 }}>
                                    {fullName}
                                </Typography>
                            </Box>
                            <PersonOutlinedIcon sx={{ color: "#9CA3AF" }} />
                        </Box>

                        {/* Email */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1.5,
                                borderBottom: "1px solid #F3F4F6"
                            }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                                    Email
                                </Typography>
                                <Typography variant="body1" fontWeight={600} sx={{ color: "#111827", mt: 0.2 }}>
                                    {email}
                                </Typography>
                            </Box>
                            <EmailOutlinedIcon sx={{ color: "#9CA3AF" }} />
                        </Box>

                        {/* Phone */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1.5,
                                borderBottom: "1px solid #F3F4F6"
                            }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                                    Phone
                                </Typography>
                                <Typography variant="body1" fontWeight={600} sx={{ color: "#111827", mt: 0.2 }}>
                                    {phone}
                                </Typography>
                            </Box>
                            <PhoneOutlinedIcon sx={{ color: "#9CA3AF" }} />
                        </Box>

                        {/* Member Since */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                pb: 1.5,
                                borderBottom: "1px solid #F3F4F6"
                            }}
                        >
                            <Box>
                                <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.8rem", fontWeight: 500 }}>
                                    Member Since
                                </Typography>
                                <Typography variant="body1" fontWeight={600} sx={{ color: "#111827", mt: 0.2 }}>
                                    {memberSince}
                                </Typography>
                            </Box>
                            <CalendarTodayOutlinedIcon sx={{ color: "#9CA3AF" }} />
                        </Box>
                    </Box>

                    {/* Edit Profile Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        startIcon={<EditOutlinedIcon />}
                        onClick={handleOpenEdit}
                        sx={{
                            mt: 3,
                            py: 1.2,
                            bgcolor: "#00838F",
                            color: "#FFFFFF",
                            borderRadius: "10px",
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "0.95rem",
                            boxShadow: "none",
                            "&:hover": {
                                bgcolor: "#00695C",
                                boxShadow: "none"
                            }
                        }}
                    >
                        Edit Profile
                    </Button>
                </Card>
            </Box>

            {/* Footer Notice */}
            <Box sx={{ textAlign: "center", mt: 5, color: "#6B7280", fontSize: "0.85rem" }}>
                © 2025 Kharido.com. All rights reserved.
            </Box>

            {/* Edit Profile Dialog Modal */}
            <Dialog
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: "16px", p: 1 }
                }}
            >
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Edit Profile Details
                    </Typography>
                    <IconButton onClick={() => setOpenEditModal(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                    {alertMessage.text && (
                        <Alert severity={alertMessage.type || "error"}>
                            {alertMessage.text}
                        </Alert>
                    )}
                    <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={editForm.firstName}
                        onChange={handleEditChange}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={editForm.lastName}
                        onChange={handleEditChange}
                        variant="outlined"
                        size="small"
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        variant="outlined"
                        size="small"
                        error={Boolean(phoneError)}
                        helperText={phoneError}
                    />
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={editForm.dob}
                        onChange={handleEditChange}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        size="small"
                    />
                    <FormControl fullWidth size="small">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={editForm.gender}
                            label="Gender"
                            onChange={handleEditChange}
                        >
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="OTHER">Other</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={() => setOpenEditModal(false)}
                        sx={{ color: "#6B7280", fontWeight: 600 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSaveProfile}
                        disabled={saving}
                        sx={{
                            bgcolor: "#00838F",
                            "&:hover": { bgcolor: "#00695C" },
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: 3
                        }}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}