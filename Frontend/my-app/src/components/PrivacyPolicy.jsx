import React from "react";
import { Box, Container, Typography, Card, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </Typography>

            <Typography variant="body2" sx={{ color: "#6B7280", mb: 4 }}>
              Last Updated: August 2026 | Protection & Confidentiality of Customer Data
            </Typography>

            <Divider sx={{ mb: 4 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  1. Information We Collect
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  We collect personal information provided directly by you during account creation, such as your name, email address, phone number, shipping address, and payment preferences.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  2. How We Use Your Data
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  Your information is utilized solely to process transactions, deliver orders, communicate order updates, personalize product recommendations, and enhance marketplace security.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  3. Data Sharing & Third Parties
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  We do not sell your personal information. Data is shared strictly with authorized logistics partners and payment gateways to fulfill your orders securely.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  4. Security & Encrypted Payments
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  All sensitive payment data is encrypted using industry-standard SSL protocols. We maintain administrative and electronic safeguards to prevent unauthorized access.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: "#00838F", mb: 1 }}>
                  5. Your Data Rights
                </Typography>
                <Typography variant="body1" sx={{ color: "#374151", lineHeight: 1.7 }}>
                  You retain full access to view, update, or request deletion of your account profile data at any time through your Kharido Customer Profile settings or by contacting customer support.
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
