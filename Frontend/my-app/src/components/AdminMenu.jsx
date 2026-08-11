import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Popover,
  Divider,
  Button
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShieldIcon from "@mui/icons-material/Shield";

import logo from "../assets/logo.png";

export default function AdminMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const adminName = user.username || "Admin";

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("auth");
      navigate("/login");
      window.location.reload();
    }
  };


<h2>Kharido</h2>
  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin", exact: true },
    { text: "Orders", icon: <ShoppingBagIcon />, path: "/admin/orders" },
    { text: "Products", icon: <Inventory2Icon />, path: "/admin/products" },
    { text: "Customers", icon: <PeopleIcon />, path: "/admin/customers" },
    { text: "Vendors", icon: <StoreIcon />, path: "/admin/vendors" },
    { text: "Reports", icon: <AssessmentIcon />, path: "/admin/reports" },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" }
  ];

  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
    );
    return current ? current.text : "Admin Dashboard";
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%", bgcolor: "#F5F7FA" }}>
      {/* Admin Sidebar Navigation */}
      <Box
        sx={{
          width: 260,
          flexShrink: 0,
          background: "linear-gradient(180deg, #0A2540 0%, #004D40 100%)",
          color: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          boxShadow: "4px 0 20px rgba(0,0,0,0.06)",
          zIndex: 1200
        }}
      >
        {/* Logo Card */}
        <Box sx={{ p: "24px 20px", pb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: "16px",
              bgcolor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
          >
            <Box component={NavLink} to="/admin" sx={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", width: "100%" }}>
              <Box
                component="img"
                src={logo}
                alt="Kharido Logo"
                sx={{
                  height: 44,
                  maxHeight: 48,
                  objectFit: "contain"
                }}
              />
            </Box>
          </Paper>
        </Box>


<NavLink to="/admin">
Dashboard
</NavLink>
        {/* Sidebar Menu Items */}
        <Box sx={{ flex: 1, px: 2, py: 1, overflowY: "auto" }}>
          <List disablePadding>
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    component={NavLink}
                    to={item.path}
                    end={item.exact}
                    sx={{
                      borderRadius: "12px",
                      py: 1.2,
                      px: 2,
                      bgcolor: isActive ? "#FF6B00" : "transparent",
                      color: "#FFFFFF",
                      boxShadow: isActive ? "0 4px 12px rgba(255, 107, 0, 0.3)" : "none",
                      "&:hover": {
                        bgcolor: isActive ? "#FF6B00" : "rgba(255, 255, 255, 0.08)"
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#FFFFFF",
                        minWidth: 38,
                        "& svg": { fontSize: 22 }
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "0.95rem"
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>


<NavLink to="/admin/orders">
Orders
</NavLink>
        {/* Logout Button */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              bgcolor: "rgba(239, 68, 68, 0.15)",
              color: "#EF4444",
              fontWeight: 700,
              py: 1.2,
              borderRadius: "12px",
              textTransform: "none",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              "&:hover": {
                bgcolor: "#EF4444",
                color: "#FFFFFF"
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Right Main Layout Content Area */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header Navbar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: "#FFFFFF",
            color: "#111827",
            borderBottom: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <ShieldIcon sx={{ color: "#00838F", fontSize: 26 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#111827" }}>
                {getPageTitle()}
              </Typography>
            </Box>


<NavLink to="/admin/products">
Products
</NavLink>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Notification Bell */}
              <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ color: "#4B5563" }}>
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
>>>>>>> Stashed changes

              <Popover
                open={Boolean(notifAnchor)}
                anchorEl={notifAnchor}
                onClose={() => setNotifAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: { p: 2, width: 300, borderRadius: "16px", mt: 1 }
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Admin Notifications
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Typography variant="body2" sx={{ color: "#4B5563", mb: 1 }}>
                  • 2 new seller registrations pending review.
                </Typography>
                <Typography variant="body2" sx={{ color: "#4B5563" }}>
                  • 5 product approval requests queued.
                </Typography>
              </Popover>


<NavLink to="/admin/customers">
Customers
</NavLink>



<NavLink to="/admin/vendors">
Vendors
</NavLink>



<NavLink to="/admin/reports">
Reports
</NavLink>



<NavLink to="/admin/settings">
Settings
</NavLink>



{/* Logout */}

<NavLink to="/admin/logout">
Logout
</NavLink>



</div>




<div className="admin-content">

<Outlet />

</div>



</div>

)

}


export default AdminMenu;
              {/* Admin Profile Dropdown */}
              <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  cursor: "pointer",
                  p: 0.5,
                  pr: 1.5,
                  borderRadius: "30px",
                  bgcolor: "#F3F4F6",
                  "&:hover": { bgcolor: "#E5E7EB" }
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#0A2540",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    width: 36,
                    height: 36,
                    fontSize: "0.95rem"
                  }}
                >
                  {adminName.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {adminName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>
                    Administrator
                  </Typography>
                </Box>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: { mt: 1, minWidth: 180, borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }
                }}
              >
                <MenuItem onClick={() => { setAnchorEl(null); navigate("/admin/settings"); }}>
                  Admin Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "#EF4444", fontWeight: 600 }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: "32px" },
            bgcolor: "#F5F7FA",
            overflowX: "hidden"
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
