import React from "react";
import { Box, Container, Typography, Card, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function TermsConditions() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#F5F7FA" }}>
      <Navbar />

      <Box sx={{ width: "100%", px: { xs: 2, md: 4 }, py: 5, flex: 1, boxSizing: "border-box" }}>
        <Container maxWidth="md">
          <Button
            component={Link}
            to="/register/user"
            startIcon={<ArrowBackIcon />}
            sx={{ color: "#00838F", fontWeight: 600, mb: 3, "&:hover": { bgcolor: "#E6F7F5" } }}
          >
            Back to Registration
          </Button>

          <Card
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: "24px",
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.04)"
            }}
          >
            <Typography variant="h4" fontWeight={800} sx={{ color: "#111827", mb: 1 }}>
              Terms & Conditions
            </Typography>

            <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
              Last Updated: August 2026 | Effective for all Kharido.com Users
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  1. Acceptance of Terms
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  By accessing or registering an account on Kharido.com, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  2. User Account & Security
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  You are responsible for maintaining the confidentiality of your account credentials and password. Any activities conducted under your account are your sole responsibility.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  3. Product Purchases & Payments
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  All prices listed on Kharido.com are inclusive of applicable taxes. Payments are processed securely via approved payment gateways. Orders are subject to availability and seller confirmation.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  4. Returns & Refunds
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  Products can be returned within the specified return window subject to our return policy guidelines. Refunds will be processed back to your original payment method within 5-7 business days after return verification.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  5. Limitation of Liability
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  Kharido.com acts as a marketplace platform connecting buyers and verified sellers. We strive for maximum uptime and reliability but shall not be liable for indirect or consequential damages resulting from platform usage.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
