import { Box, Typography, Button, Container } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #007A82 0%, #005F66 100%)",
        color: "#FFFFFF",
        py: { xs: 8, md: 10 },
        px: 3,
        borderRadius: "24px",
        mx: { xs: 2, md: 4 },
        my: 4,
        boxShadow: "0 12px 30px rgba(0, 122, 130, 0.15)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <Typography
          variant="h2"
          fontWeight={800}
          sx={{
            color: "#FFFFFF",
            fontSize: { xs: "2.2rem", md: "3.2rem" },
            mb: 2,
            letterSpacing: "-0.5px"
          }}
        >
          Welcome to Kharido<Box component="span" sx={{ color: "#FF6B00" }}>.com</Box>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            fontWeight: 400,
            mb: 4,
            maxWidth: 650,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.2rem" }
          }}
        >
          Discover Electronics, Fashion, Mobiles and More with exclusive daily deals and fast delivery.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/products")}
          startIcon={<ShoppingBagOutlinedIcon />}
          sx={{
            bgcolor: "#FF6B00",
            color: "#FFFFFF",
            px: 4,
            py: 1.5,
            fontSize: "1.05rem",
            borderRadius: "12px",
            boxShadow: "0 6px 20px rgba(255, 107, 0, 0.4)",
            "&:hover": {
              bgcolor: "#E65100"
            }
          }}
        >
          Explore Products
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;