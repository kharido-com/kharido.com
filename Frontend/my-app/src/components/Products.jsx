import { Box, Typography } from "@mui/material";
import ProductCard from "../customer/components/product/ProductCard";
import laptop from "../assets/laptop.jpg";
import mobile from "../assets/mobile.jpg";
import headphone from "../assets/headphone.jpg";

function Products() {
  const products = [
    {
      productId: 1,
      productName: "ASUS VivoBook 15 Laptop",
      category: "Electronics",
      brand: "ASUS",
      price: 70000,
      stockQuantity: 10,
      imageUrl: laptop
    },
    {
      productId: 2,
      productName: "iPhone 15 Smartphone",
      category: "Mobiles",
      brand: "Apple",
      price: 60000,
      stockQuantity: 8,
      imageUrl: mobile
    },
    {
      productId: 3,
      productName: "boAt Rockerz 450 Headphones",
      category: "Electronics",
      brand: "boAt",
      price: 2000,
      stockQuantity: 15,
      imageUrl: headphone
    }
  ];
import "../styles/Products.css";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";

const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: "₹1,19,999",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
  },
  {
    id: 2,
    name: "HP Pavilion Laptop",
    price: "₹69,999",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
  },
  {
    id: 3,
    name: "Nike Sneakers",
    price: "₹5,999",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
];

export default function Products() {
  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 4, mb: 4, width: "100%", boxSizing: "border-box" }}>
      <Typography variant="h5" fontWeight={700} sx={{ color: "#111827", mb: 3 }}>
        Featured Products
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          width: "100%"
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </Box>
    </Box>
    <section className="products-section">

      <div className="container">

        <h2 className="products-title">
          Featured Products
        </h2>

        <p className="products-subtitle">
          Explore our latest collection
        </p>

        <div className="row">

          {products.map((product) => (

            <div
              className="col-lg-3 col-md-6 mb-4"
              key={product.id}
            >

              <div className="product-card">

                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="discount">
                    New
                  </span>

                </div>

                <div className="product-body">

                  <h5>{product.name}</h5>

                  <div className="rating">

                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />

                  </div>

                  <h4>{product.price}</h4>

                  <div className="product-buttons">

                    <button className="wishlist-btn">

                      <FavoriteBorderIcon />

                    </button>

                    <button className="cart-btn">

                      <ShoppingCartIcon />

                      Add to Cart

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}