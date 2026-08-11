import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Popover,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Button,
    Chip
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import customerService from "../services/customerService";
import orderService from "../services/orderService";

export default function Header() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const urlKeyword = searchParams.get("keyword") || "";
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const [keyword, setKeyword] = useState(urlKeyword);
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: ""
    });

    const [notificationAnchor, setNotificationAnchor] = useState(null);
    const [notifications, setNotifications] = useState([]);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const isNotificationOpen = Boolean(notificationAnchor);

    useEffect(() => {
        setKeyword(urlKeyword);
    }, [urlKeyword]);

    useEffect(() => {
        loadProfile();
        loadNotifications();

        const handleProfileUpdate = (e) => {
            if (e.detail) {
                setCustomer(e.detail);
            } else {
                loadProfile();
            }
        };

        window.addEventListener("customerProfileUpdated", handleProfileUpdate);
        return () => {
            window.removeEventListener("customerProfileUpdated", handleProfileUpdate);
        };
    }, []);

    async function loadProfile() {
        try {
            const data = await customerService.getProfile();
            if (data && (data.firstName || data.username)) {
                setCustomer(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadNotifications() {
        try {
            const orders = await orderService.getOrders();
            if (Array.isArray(orders) && orders.length > 0) {
                const realOrderNotifications = orders.map((order) => {
                    const itemCount = order.items ? order.items.length : 1;
                    const itemsText = order.items && order.items.length > 0
                        ? order.items.map(i => i.productName).slice(0, 2).join(", ")
                        : "Products";
                    
                    return {
                        id: `order-${order.orderId}`,
                        orderId: order.orderId,
                        title: `Order #${order.orderId} ${order.orderStatus || "PLACED"}`,
                        desc: `${itemCount} item(s) (${itemsText}) • Total: ₹${order.totalAmount}`,
                        time: order.orderDate ? new Date(order.orderDate).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent",
                        read: false,
                        type: "order",
                        targetUrl: "/user/orders"
                    };
                });
                setNotifications(realOrderNotifications);
            } else {
                setNotifications([
                    {
                        id: "welcome-1",
                        title: "Welcome to Kharido!",
                        desc: "Discover thousands of products and enjoy smooth shopping.",
                        time: "Just now",
                        read: false,
                        type: "info",
                        targetUrl: "/user"
                    }
                ]);
            }
        } catch (err) {
            console.error("Unable to load real notifications:", err);
        }
    }

    function handleSearch() {
        if (keyword.trim()) {
            navigate(`/user?keyword=${encodeURIComponent(keyword.trim())}`);
        } else {
            navigate("/user");
        }
    }

    const handleOpenNotifications = (e) => {
        setNotificationAnchor(e.currentTarget);
    };

    const handleCloseNotifications = () => {
        setNotificationAnchor(null);
    };

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const handleNotificationClick = (item) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
        );
        handleCloseNotifications();
        if (item.targetUrl) {
            navigate(item.targetUrl);
        }
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const displayName = `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "Harsh Rajput";

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "#FFFFFF",
                color: "#111827",
                borderBottom: "1px solid #E5E7EB"
            }}
        >
            <Toolbar
                sx={{
                    px: 3,
                    minHeight: "75px !important",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2
                }}
            >
                {/* Left Side Hamburger Icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ color: "#374151" }}
                >
                    <MenuIcon fontSize="medium" />
                </IconButton>

                {/* Middle Search Input */}
                <Box sx={{ flex: 1, maxWidth: 600, mx: 2 }}>
                    <TextField
                        fullWidth
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        placeholder="Search for products, brands and more..."
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleSearch}
                                        sx={{
                                            bgcolor: "#00838F",
                                            color: "#FFFFFF",
                                            borderRadius: "8px",
                                            p: 0.8,
                                            "&:hover": { bgcolor: "#00695C" }
                                        }}
                                    >
                                        <SearchIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: "10px",
                                bgcolor: "#F9FAFB",
                                pr: 0.5,
                                fontSize: "0.9rem"
                            }
                        }}
                    />
                </Box>

                {/* Right Side Icons & Profile */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    {/* Cart Icon */}
                    <IconButton
                        onClick={() => navigate("/user/cart")}
                        sx={{ color: "#374151" }}
                    >
                        <Badge
                            badgeContent={cartCount}
                            sx={{
                                "& .MuiBadge-badge": {
                                    bgcolor: "#FF6B00",
                                    color: "#FFF",
                                    fontWeight: 700,
                                    fontSize: "0.725rem",
                                    minWidth: "18px",
                                    height: "18px"
                                }
                            }}
                        >
                            <ShoppingCartOutlinedIcon fontSize="medium" />
                        </Badge>
                    </IconButton>

                    {/* Wishlist Icon */}
                    <IconButton
                        onClick={() => navigate("/user/wishlist")}
                        sx={{ color: "#374151" }}
                    >
                        <Badge
                            badgeContent={wishlistCount}
                            sx={{
                                "& .MuiBadge-badge": {
                                    bgcolor: "#FF6B00",
                                    color: "#FFF",
                                    fontWeight: 700,
                                    fontSize: "0.725rem",
                                    minWidth: "18px",
                                    height: "18px"
                                }
                            }}
                        >
                            <FavoriteBorderIcon fontSize="medium" />
                        </Badge>
                    </IconButton>

                    {/* Notification Bell */}
                    <IconButton
                        onClick={handleOpenNotifications}
                        sx={{ color: "#374151" }}
                    >
                        <Badge
                            badgeContent={unreadCount}
                            sx={{
                                "& .MuiBadge-badge": {
                                    bgcolor: "#FF6B00",
                                    color: "#FFF",
                                    fontWeight: 700,
                                    fontSize: "0.725rem",
                                    minWidth: "18px",
                                    height: "18px"
                                }
                            }}
                        >
                            <NotificationsNoneOutlinedIcon fontSize="medium" />
                        </Badge>
                    </IconButton>

                    {/* Notification Popover Dropdown */}
                    <Popover
                        open={isNotificationOpen}
                        anchorEl={notificationAnchor}
                        onClose={handleCloseNotifications}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        PaperProps={{
                            sx: {
                                width: 360,
                                borderRadius: "16px",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
                                mt: 1.5,
                                overflow: "hidden"
                            }
                        }}
                    >
                        {/* Popover Header */}
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: "#FFFFFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottom: "1px solid #E5E7EB"
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.05rem" }}>
                                    Notifications
                                </Typography>
                                {unreadCount > 0 && (
                                    <Chip
                                        label={`${unreadCount} New`}
                                        size="small"
                                        sx={{
                                            bgcolor: "#E0F7F8",
                                            color: "#00838F",
                                            fontWeight: 700,
                                            height: 22,
                                            fontSize: "0.75rem"
                                        }}
                                    />
                                )}
                            </Box>

                            {unreadCount > 0 && (
                                <Button
                                    size="small"
                                    onClick={markAllAsRead}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "0.78rem",
                                        fontWeight: 600,
                                        color: "#00838F",
                                        p: 0
                                    }}
                                >
                                    Mark all read
                                </Button>
                            )}
                        </Box>

                        {/* Notification List */}
                        <List sx={{ p: 0, maxHeight: 340, overflowY: "auto" }}>
                            {notifications.length === 0 ? (
                                <Box sx={{ p: 4, textAlign: "center" }}>
                                    <NotificationsNoneOutlinedIcon sx={{ fontSize: 40, color: "#9CA3AF", mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        No notifications right now.
                                    </Typography>
                                </Box>
                            ) : (
                                notifications.map((item, index) => (
                                    <Box key={item.id}>
                                        <ListItem
                                            onClick={() => handleNotificationClick(item)}
                                            sx={{
                                                px: 2,
                                                py: 1.5,
                                                bgcolor: item.read ? "#FFFFFF" : "#F0FAFA",
                                                cursor: "pointer",
                                                transition: "background 0.2s",
                                                "&:hover": {
                                                    bgcolor: item.read ? "#F9FAFB" : "#E6F7F5"
                                                }
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                {item.type === "order" && (
                                                    <LocalShippingOutlinedIcon sx={{ color: "#00838F" }} />
                                                )}
                                                {item.type === "promo" && (
                                                    <LocalOfferOutlinedIcon sx={{ color: "#FF6B00" }} />
                                                )}
                                                {item.type === "info" && (
                                                    <InfoOutlinedIcon sx={{ color: "#3B82F6" }} />
                                                )}
                                            </ListItemIcon>

                                            <ListItemText
                                                primary={
                                                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
                                                        <Typography
                                                            variant="subtitle2"
                                                            fontWeight={item.read ? 600 : 700}
                                                            sx={{ color: "#111827", fontSize: "0.88rem" }}
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                                                            {item.time}
                                                        </Typography>
                                                    </Box>
                                                }
                                                secondary={
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ color: "#4B5563", fontSize: "0.8rem", lineHeight: 1.4 }}
                                                    >
                                                        {item.desc}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                        {index < notifications.length - 1 && <Divider component="li" />}
                                    </Box>
                                ))
                            )}
                        </List>

                        {/* Footer Actions */}
                        {notifications.length > 0 && (
                            <Box
                                sx={{
                                    p: 1.5,
                                    bgcolor: "#F9FAFB",
                                    textAlign: "center",
                                    borderTop: "1px solid #E5E7EB"
                                }}
                            >
                                <Button
                                    size="small"
                                    onClick={clearAllNotifications}
                                    sx={{
                                        textTransform: "none",
                                        fontSize: "0.8rem",
                                        fontWeight: 600,
                                        color: "#EF4444"
                                    }}
                                >
                                    Clear all notifications
                                </Button>
                            </Box>
                        )}
                    </Popover>

                    {/* Profile Dropdown Box */}
                    <Box
                        onClick={() => navigate("/user/profile")}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.2,
                            cursor: "pointer",
                            p: 0.5,
                            borderRadius: "20px",
                            "&:hover": {
                                bgcolor: "#F3F4F6"
                            }
                        }}
                    >
                        <Avatar
                            sx={{
                                bgcolor: "#00838F",
                                width: 36,
                                height: 36,
                                fontSize: "0.95rem",
                                fontWeight: 700
                            }}
                        >
                            {displayName ? displayName.charAt(0).toUpperCase() : "H"}
                        </Avatar>

                        <Typography
                            variant="body2"
                            fontWeight={600}
                            sx={{ color: "#374151" }}
                        >
                            {displayName}
                        </Typography>

                        <KeyboardArrowDownIcon sx={{ color: "#6B7280" }} />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}