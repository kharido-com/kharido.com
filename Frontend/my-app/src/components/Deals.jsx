import { Box, Typography, Card, CardMedia, Chip } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import mobileImg from "../assets/mobile.jpg";
import laptopImg from "../assets/laptop.jpg";
import headphoneImg from "../assets/headphone.jpg";

function Deals() {
  const deals = [
    { title: "Smartphone Special", discount: "40% OFF", image: mobileImg, desc: "Latest flagship models" },
    { title: "Gaming & Student Laptops", discount: "25% OFF", image: laptopImg, desc: "High performance gear" },
    { title: "Wireless Headphones", discount: "50% OFF", image: headphoneImg, desc: "Noise cancelling audio" }
  ];

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4, width: "100%", boxSizing: "border-box" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
        <Typography variant="h5" fontWeight={700} sx={{ color: "#111827" }}>
          Today's Exclusive Deals
        </Typography>
        <Chip
          icon={<LocalOfferIcon style={{ color: "#FF6B00", fontSize: 18 }} />}
          label="Limited Time"
          sx={{ bgcolor: "#FFF3E6", color: "#FF6B00", fontWeight: 700, borderRadius: "8px" }}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          width: "100%"
        }}
      >
        {deals.map((item, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              position: "relative",
              width: "100%",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 25px rgba(0, 0, 0, 0.08)"
              }
            }}
          >
            <Chip
              label={item.discount}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                bgcolor: "#FF6B00",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "0.85rem",
                borderRadius: "8px"
              }}
            />

            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{
                height: 180,
                objectFit: "contain",
                borderRadius: "12px",
                bgcolor: "#F9FAFB",
                p: 2,
                mb: 2
              }}
            />

            <Typography variant="h6" fontWeight={700} sx={{ color: "#111827", mb: 0.5 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: "#6B7280" }}>
              {item.desc}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Deals;