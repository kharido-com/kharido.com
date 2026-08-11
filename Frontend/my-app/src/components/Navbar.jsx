import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
      <Toolbar sx={{ px: { xs: 1.5, md: 2.5 }, minHeight: "80px !important", justifyContent: "space-between" }}>
        {/* Logo Image */}
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", ml: -0.5 }}>
          <Box
            component="img"
            src={logo}
            alt="Kharido.com Logo"
            sx={{
              height: { xs: 60, md: 74 },
              maxHeight: 80,
              objectFit: "contain"
            }}
          />
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            component={Link}
            to="/"
            sx={{ color: "#374151", fontWeight: 600, "&:hover": { color: "#00838F", bgcolor: "#E6F7F5" } }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/products"
            sx={{ color: "#374151", fontWeight: 600, "&:hover": { color: "#00838F", bgcolor: "#E6F7F5" } }}
          >
            Products
          </Button>

          <Button
            component={Link}
            to="/categories"
            sx={{ color: "#374151", fontWeight: 600, "&:hover": { color: "#00838F", bgcolor: "#E6F7F5" } }}
          >
            Categories
          </Button>

          <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
            {userName ? (
              <>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "#111827",
                    fontSize: "0.95rem"
                  }}
                >
                  Welcome, {userName}
                </Typography>

                <Button
                  variant="outlined"
                  onClick={handleLogout}
                  sx={{
                    borderColor: "#EF4444",
                    color: "#EF4444",
                    "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderColor: "#00838F",
                    color: "#00838F",
                    "&:hover": { bgcolor: "#E6F7F5" }
                  }}
                >
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    bgcolor: "#FF6B00",
                    color: "#FFFFFF",
                    "&:hover": { bgcolor: "#E65100" }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}