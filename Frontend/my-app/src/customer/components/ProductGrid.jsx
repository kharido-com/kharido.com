import {
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import { useEffect, useState } from "react";

import productService from "../services/productService";
import ProductCard from "./product/ProductCard";

export default function ProductGrid() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProducts();

  }, []);

  async function loadProducts() {

    try {

      const data = await productService.getProducts();

      setProducts(data);

    }

    catch (error) {

      console.error(error);

    }

    finally {

      setLoading(false);

    }

  }

  if (loading)

    return (

      <Box textAlign="center" mt={5}>

        <CircularProgress />

      </Box>

    );

  return (

    <>

      <Typography
        variant="h4"
        mb={3}
        fontWeight="bold"
      >
        Featured Products
      </Typography>

      <Grid container spacing={3}>

        {products.map(product => (

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={product.productId}
          >

            <ProductCard product={product} />

          </Grid>

        ))}

      </Grid>

    </>

  );

}