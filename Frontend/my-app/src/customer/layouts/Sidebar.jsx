import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Badge
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LogoutIcon from "@mui/icons-material/Logout";

import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useCart } from "../context/CartContext";

export default function Sidebar() {
    const { cartCount } = useCart();

    const menus = [
        {
            title: "Dashboard",
            icon: <DashboardIcon />,
            path: "/user",
            exact: true
        },
        {
            title: "Profile",
            icon: <PersonIcon />,
            path: "/user/profile"
        },
        {
            title: "Addresses",
            icon: <LocationOnIcon />,
            path: "/user/address"
        },
        {
            title: "Wishlist",
            icon: <FavoriteIcon />,
            path: "/user/wishlist"
        },
        {
            title: "Cart",
            icon: <ShoppingCartIcon />,
            path: "/user/cart",
            badge: cartCount
        },
        {
            title: "Orders",
            icon: <InventoryIcon />,
            path: "/user/orders"
        },
        {
            title: "Logout",
            icon: <LogoutIcon />,
            path: "/user/logout"
        }
    ];

    return (
        <Box
            sx={{
                width: 260,
                minHeight: "100vh",
                background: "linear-gradient(180deg, #007A82 0%, #005F66 100%)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Top Logo Container */}
            <Box
                sx={{
                    pt: 3,
                    pb: 2,
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Box
                    sx={{
                        bgcolor: "#FFFFFF",
                        borderRadius: "16px",
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                        width: "100%",
                        maxWidth: 220
                    }}
                >
                    <img
                        src={logo}
                        alt="Kharido Logo"
                        style={{
                            height: 68,
                            maxWidth: "100%",
                            objectFit: "contain"
                        }}
                    />
                </Box>
            </Box>

            {/* Navigation List */}
            <List sx={{ px: 2, pt: 1, flexGrow: 1, zIndex: 2 }}>
                {menus.map((menu) => (
                    <ListItemButton
                        key={menu.title}
                        component={NavLink}
                        to={menu.path}
                        end={menu.exact}
                        sx={{
                            color: "white",
                            mb: 1.5,
                            py: 1.2,
                            px: 2.5,
                            borderRadius: "12px",
                            transition: "all 0.2s ease-in-out",
                            "&.active": {
                                bgcolor: "#FF6B00",
                                color: "#FFFFFF",
                                boxShadow: "0 4px 12px rgba(255, 107, 0, 0.3)",
                                "& .MuiListItemIcon-root": {
                                    color: "#FFFFFF"
                                }
                            },
                            "&:hover:not(.active)": {
                                bgcolor: "rgba(255, 255, 255, 0.1)"
                            }
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "rgba(255, 255, 255, 0.85)",
                                minWidth: 40
                            }}
                        >
                            {menu.icon}
                        </ListItemIcon>

                        <ListItemText
                            primary={menu.title}
                            primaryTypographyProps={{
                                fontWeight: 500,
                                fontSize: "0.95rem"
                            }}
                        />

                        {menu.badge > 0 && (
                            <Badge
                                badgeContent={menu.badge}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        bgcolor: "#FF6B00",
                                        color: "#FFFFFF",
                                        fontWeight: 700,
                                        fontSize: "0.75rem",
                                        border: "2px solid #007A82"
                                    }
                                }}
                            />
                        )}
                    </ListItemButton>
                ))}
            </List>

            {/* Subtle background graphic at bottom left */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: -30,
                    left: -30,
                    width: 220,
                    height: 220,
                    borderRadius: "50%",
                    border: "25px solid rgba(255, 255, 255, 0.04)",
                    pointerEvents: "none"
                }}
            />
        </Box>
    );
}