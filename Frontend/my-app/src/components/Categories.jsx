import { Box, Typography, Card } from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: "Electronics", icon: <DevicesIcon fontSize="large" /> },
    { id: 2, title: "Fashion", icon: <CheckroomIcon fontSize="large" /> },
    { id: 3, title: "Books", icon: <MenuBookIcon fontSize="large" /> },
    { id: 4, title: "Gaming", icon: <SportsEsportsIcon fontSize="large" /> },
    { id: 5, title: "Sports", icon: <SportsSoccerIcon fontSize="large" /> },
    { id: 6, title: "Home Appliances", icon: <KitchenIcon fontSize="large" /> }
  ];
import "../styles/Categories.css";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ChairIcon from "@mui/icons-material/Chair";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import WatchIcon from "@mui/icons-material/Watch";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const categories = [
  { name: "Mobiles", icon: <PhoneIphoneIcon fontSize="large" /> },
  { name: "Electronics", icon: <LaptopMacIcon fontSize="large" /> },
  { name: "Fashion", icon: <CheckroomIcon fontSize="large" /> },
  { name: "Furniture", icon: <ChairIcon fontSize="large" /> },
  { name: "Groceries", icon: <LocalGroceryStoreIcon fontSize="large" /> },
  { name: "Gaming", icon: <SportsEsportsIcon fontSize="large" /> },
  { name: "Watches", icon: <WatchIcon fontSize="large" /> },
  { name: "Books", icon: <MenuBookIcon fontSize="large" /> },
];

export default function Categories() {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4, width: "100%", boxSizing: "border-box" }}>
      <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 3 }}>
        Popular Categories
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "24px",
          width: "100%"
        }}
      >
        {categories.map((item) => (
          <Card
            key={item.id}
            elevation={0}
            onClick={() => navigate(`/products?categoryId=${item.id}&category=${item.title}`)}
            sx={{
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              width: "100%",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                borderColor: "#00838F",
                boxShadow: "0 10px 25px rgba(0, 131, 143, 0.12)",
                "& .icon-wrapper": {
                  bgcolor: "#00838F",
                  color: "#FFFFFF"
                }
              }
            }}
          >
            <Box
              className="icon-wrapper"
              sx={{
                width: 56,
                height: 56,
                borderRadius: "16px",
                bgcolor: "#E6F7F5",
                color: "#00838F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                transition: "all 0.3s ease"
              }}
            >
              {item.icon}
            </Box>

            <Typography variant="subtitle2" fontWeight={600} sx={{ color: "#111827" }}>
              {item.title}
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
    <section className="category-section">

      <div className="container">

        <div className="text-center mb-5">

          <h2 className="category-title">
            Shop By Category
          </h2>

          <p className="category-subtitle">
            Discover products from every category
          </p>

        </div>

        <div className="row g-4">

          {categories.map((item, index) => (

            <div
              className="col-lg-3 col-md-4 col-sm-6"
              key={index}
            >

              <div className="category-card">

                <div className="category-icon">

                  {item.icon}

                </div>

                <h5>{item.name}</h5>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}