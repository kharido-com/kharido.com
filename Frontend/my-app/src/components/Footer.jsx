import { Box, Typography, Grid, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#005F66",
        color: "#FFFFFF",
        pt: 6,
        pb: 4,
        mt: "auto",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <Box sx={{ px: { xs: 2, md: 4 }, width: "100%", boxSizing: "border-box" }}>
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={800} sx={{ color: "#FFFFFF", mb: 1.5 }}>
              Kharido<Box component="span" sx={{ color: "#FF6B00" }}>.com</Box>
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6 }}>
              Your one-stop destination for premium electronics, smartphones, fashion, and daily essentials.
            </Typography>
          </Grid>

          <Grid item xs={6} sm={3} md={2.5}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>Home</Link>
              <Link href="/products" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>Products</Link>
              <Link href="/categories" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>Categories</Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2.5}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Customer Care
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/user/profile" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>My Account</Link>
              <Link href="/user/orders" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>Orders</Link>
              <Link href="/user/wishlist" color="inherit" underline="hover" sx={{ opacity: 0.85, fontSize: "0.9rem" }}>Wishlist</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mb: 0.5 }}>
              Email: support@kharido.com
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Phone: +91 1800 123 4567
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            pt: 3,
            textAlign: "center"
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            © 2026 Kharido.com. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;