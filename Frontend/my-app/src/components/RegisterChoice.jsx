import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import logo from "../assets/logo.png";

export default function RegisterChoice() {
  const customerBenefits = [
    "Fast & Reliable Delivery",
    "100% Secure Payments",
    "Wishlist & Easy Cart",
    "Hassle-Free Returns"
  ];

  const sellerBenefits = [
    "Reach Thousands of Buyers",
    "Easy Product Management",
    "Real-time Order Tracking",
    "Fast & Secure Payouts"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F7FA 0%, #E6F7F5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="lg">
        {/* Main Card Container */}
        <Card
          elevation={0}
          sx={{
            width: "100%",
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: "24px",
            border: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)"
          }}
        >
          {/* Logo & Header */}
          <Box textAlign="center" mb={5}>
            <Box
              component={Link}
              to="/"
              sx={{ display: "inline-block", textDecoration: "none", mb: 2 }}
            >
              <Box
                component="img"
                src={logo}
                alt="Kharido.com Logo"
                sx={{
                  height: { xs: 54, md: 68 },
                  objectFit: "contain"
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#111827", fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1 }}
            >
              Join Kharido<Box component="span" sx={{ color: "#FF6B00" }}>.com</Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.95rem", md: "1.05rem" }, maxWidth: 520, mx: "auto" }}
            >
              Create your account and start your shopping or selling journey today.
            </Typography>
          </Box>

          {/* Cards Grid - Side by Side CSS Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              gap: 4,
              width: "100%",
              maxWidth: 960,
              mx: "auto",
              alignItems: "stretch"
            }}
          >
            {/* Customer Card */}
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "20px",
                border: "1.5px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "#00838F",
                  boxShadow: "0 16px 36px rgba(0, 131, 143, 0.15)",
                  "& .customer-icon-box": {
                    bgcolor: "#00838F",
                    color: "#FFFFFF"
                  }
                }
              }}
            >
              <Box>
                {/* Icon Header */}
                <Box
                  className="customer-icon-box"
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    bgcolor: "#E6F7F5",
                    color: "#00838F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    transition: "all 0.3s ease"
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Box>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 0.5 }}>
                  Customer
                </Typography>

                <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
                  Shop from thousands of products across electronics, fashion & daily essentials.
                </Typography>

                {/* Benefits List */}
                <List disablePadding sx={{ mb: 3 }}>
                  {customerBenefits.map((benefit, i) => (
                    <ListItem key={i} disableGutters sx={{ py: 0.6 }}>
                      <ListItemIcon sx={{ minWidth: 28, color: "#00838F" }}>
                        <CheckCircleOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={benefit}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#374151"
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Action Button */}
              <Button
                component={Link}
                to="/register/user"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: "#00838F",
                  color: "#FFFFFF",
                  py: 1.5,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(0, 131, 143, 0.25)",
                  "&:hover": {
                    bgcolor: "#00695C",
                    boxShadow: "0 6px 18px rgba(0, 105, 92, 0.35)"
                  }
                }}
              >
                Create Customer Account
              </Button>
            </Card>

            {/* Seller Card */}
            <Card
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "20px",
                border: "1.5px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "#FF6B00",
                  boxShadow: "0 16px 36px rgba(255, 107, 0, 0.15)",
                  "& .seller-icon-box": {
                    bgcolor: "#FF6B00",
                    color: "#FFFFFF"
                  }
                }
              }}
            >
              <Box>
                {/* Icon Header */}
                <Box
                  className="seller-icon-box"
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: "20px",
                    bgcolor: "#FFF3E6",
                    color: "#FF6B00",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    transition: "all 0.3s ease"
                  }}
                >
                  <StoreIcon sx={{ fontSize: 40 }} />
                </Box>

                <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 0.5 }}>
                  Seller / Vendor
                </Typography>

                <Typography variant="body2" sx={{ color: "#6B7280", mb: 3 }}>
                  Start selling on Kharido and grow your business with seamless tools.
                </Typography>

                {/* Benefits List */}
                <List disablePadding sx={{ mb: 3 }}>
                  {sellerBenefits.map((benefit, i) => (
                    <ListItem key={i} disableGutters sx={{ py: 0.6 }}>
                      <ListItemIcon sx={{ minWidth: 28, color: "#FF6B00" }}>
                        <CheckCircleOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={benefit}
                        primaryTypographyProps={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          color: "#374151"
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Action Button */}
              <Button
                component={Link}
                to="/register/seller"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  bgcolor: "#FF6B00",
                  color: "#FFFFFF",
                  py: 1.5,
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  borderRadius: "12px",
                  boxShadow: "0 4px 14px rgba(255, 107, 0, 0.25)",
                  "&:hover": {
                    bgcolor: "#E65100",
                    boxShadow: "0 6px 18px rgba(230, 81, 0, 0.35)"
                  }
                }}
              >
                Become a Seller
              </Button>
            </Card>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}