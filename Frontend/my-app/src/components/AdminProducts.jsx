import { useEffect, useState } from "react";


function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);



    const loadProducts = async () => {

        try {

            setLoading(true);
            setError("");


            const response = await fetch(
                "http://localhost:8082/api/admin/products",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to fetch products"
                );

            }


            const data = await response.json();


            console.log(
                "PRODUCT DATA = ",
                data
            );


            setProducts(data);



        } catch(error) {


            console.error(error);

            setError(
                "Unable to load products"
            );


        } finally {


            setLoading(false);

        }

    };



    useEffect(()=>{

        loadProducts();

    },[]);




    const approveProduct = async(id)=>{


        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}/approve`,

                {
                    method:"PUT",
                    credentials:"include"
                }

            );


            if(!response.ok){

                throw new Error(
                    "Approve failed"
                );

            }


            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to approve product"
            );


        }


    };




    const rejectProduct = async(id)=>{


        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}/reject`,

                {
                    method:"PUT",
                    credentials:"include"
                }

            );


            if(!response.ok){

                throw new Error(
                    "Reject failed"
                );

            }


            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to reject product"
            );


        }


    };





    const deleteProduct = async(id)=>{


        if(!window.confirm("Delete this product?")){

            return;

        }



        try{


            const response = await fetch(

                `http://localhost:8082/api/admin/products/${id}`,

                {
                    method:"DELETE",
                    credentials:"include"
                }

            );



            if(!response.ok){

                throw new Error(
                    "Delete failed"
                );

            }



            loadProducts();



        }catch(error){


            console.error(error);

            setError(
                "Unable to delete product"
            );


        }


    };





    return (

        <div className="container mt-4">


            <h2>
                Product Management
            </h2>


            <h5>
                Total Products : {products.length}
            </h5>



            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>

            }



            {
                loading ?

                <h5>
                    Loading products...
                </h5>


                :



                <table className="table table-bordered table-hover">


                    <thead className="table-dark">

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Seller</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Approval</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>


                    </thead>




                    <tbody>


                    {
                        products.length===0 &&

                        <tr>

                            <td colSpan="8"
                            className="text-center">

                                No Products Found

                            </td>

                        </tr>

                    }





                    {
                        products.map(product=>(


                            <tr key={product.productId}>


                                <td>
                                    {product.productId}
                                </td>


                                <td>
                                    {product.productName}
                                </td>


                                <td>
                                    {product.sellerName}
                                </td>


                                <td>
                                    ₹{product.price}
                                </td>


                                <td>
                                    {product.stockQuantity}
                                </td>



                                <td>


                                    <span
                                    className={
                                        product.approvalStatus==="APPROVED"

                                        ?

                                        "badge bg-success"

                                        :

                                        product.approvalStatus==="REJECTED"

                                        ?

                                        "badge bg-danger"

                                        :

                                        "badge bg-warning text-dark"
                                    }>


                                    {product.approvalStatus}


                                    </span>


                                </td>




                                <td>


                                    <span
                                    className="badge bg-success">

                                    {product.status}

                                    </span>


                                </td>





                                <td>


                                    <button

                                    className="btn btn-success btn-sm me-2"

                                    disabled={
                                        product.approvalStatus==="APPROVED"
                                    }

                                    onClick={()=>
                                        approveProduct(
                                            product.productId
                                        )
                                    }>

                                    Approve

                                    </button>





                                    <button

                                    className="btn btn-warning btn-sm me-2"

                                    disabled={
                                        product.approvalStatus==="REJECTED"
                                    }

                                    onClick={()=>
                                        rejectProduct(
                                            product.productId
                                        )
                                    }>

                                    Reject

                                    </button>





                                    <button

                                    className="btn btn-danger btn-sm"

                                    onClick={()=>
                                        deleteProduct(
                                            product.productId
                                        )
                                    }>

                                    Delete

                                    </button>



                                </td>


                            </tr>


                        ))
                    }


                    </tbody>



                </table>


            }



        </div>

    );


}


export default AdminProducts;
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  Alert,
  Skeleton,
  FormControl,
  Select,
  MenuItem,
  Stack
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [approvalFilter, setApprovalFilter] = useState("ALL");
  const [orderSort, setOrderSort] = useState("Default");
  const [priceSort, setPriceSort] = useState("Default");

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/products`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch products");
      }

      const data = await response.json();
      console.log("PRODUCT DATA = ", data);
      setProducts(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const approveProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/products/${id}/approve`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Approve failed");
      }

      loadProducts();
    } catch (error) {
      console.error(error);
      setError("Unable to approve product");
    }
  };

  const rejectProduct = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/products/${id}/reject`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Reject failed");
      }

      loadProducts();
    } catch (error) {
      console.error(error);
      setError("Unable to reject product");
    }
  };

  const getApprovalChip = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "APPROVED") {
      return <Chip label="APPROVED" size="small" sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    if (s === "REJECTED") {
      return <Chip label="REJECTED" size="small" sx={{ bgcolor: "#FEE2E2", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    return <Chip label="PENDING" size="small" sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 700, fontSize: "0.75rem" }} />;
  };

  const filteredProducts = products
    .filter((product) => {
      if (approvalFilter === "ALL") return true;
      return (product.approvalStatus || "").toUpperCase() === approvalFilter;
    })
    .sort((a, b) => {
      if (priceSort !== "Default") {
        const priceA = Number(a.price || 0);
        const priceB = Number(b.price || 0);
        const diff = priceSort === "High to Low" ? priceB - priceA : priceA - priceB;
        if (diff !== 0) return diff;
      }

      if (orderSort !== "Default") {
        const countA = Number(a.ordersCount != null ? a.ordersCount : a.orders != null ? a.orders : 0);
        const countB = Number(b.ordersCount != null ? b.ordersCount : b.orders != null ? b.orders : 0);
        const diff = orderSort === "Highest Orders" ? countB - countA : countA - countB;
        if (diff !== 0) return diff;
      }

      return 0;
    });

  const getCountByStatus = (status) => {
    if (status === "ALL") return products.length;
    return products.filter((p) => (p.approvalStatus || "").toUpperCase() === status).length;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
            Product Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
            Review vendor product submissions, approve catalog items, and maintain inventory standards
          </Typography>
        </Box>

        <Chip
          label={`Total Products: ${products.length}`}
          sx={{ bgcolor: "#E6F7F5", color: "#00838F", fontWeight: 700, py: 2, px: 1, borderRadius: "10px" }}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Filter Quick Chips Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon sx={{ color: "#00838F" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#374151" }}>
            Filter by Approval Status:
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((st) => (
            <Chip
              key={st}
              label={`${st} (${getCountByStatus(st)})`}
              onClick={() => setApprovalFilter(st)}
              sx={{
                fontWeight: 700,
                fontSize: "0.775rem",
                cursor: "pointer",
                bgcolor: approvalFilter === st ? "#00838F" : "#F1F5F9",
                color: approvalFilter === st ? "#FFFFFF" : "#475569",
                "&:hover": {
                  bgcolor: approvalFilter === st ? "#006064" : "#E2E8F0"
                }
              }}
            />
          ))}
        </Stack>
      </Paper>

      {/* Product Table */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          overflow: "hidden"
        }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#FAFAFA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Seller / Vendor</TableCell>
              {/* Interactive Price Column Header Dropdown */}
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Price</span>
                  <FormControl size="small">
                    <Select
                      value={priceSort}
                      onChange={(e) => setPriceSort(e.target.value)}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        height: 28,
                        bgcolor: "#FFFFFF",
                        borderRadius: "6px",
                        border: "1px solid #CBD5E1",
                        "& .MuiSelect-select": { py: 0.2, px: 1 }
                      }}
                    >
                      <MenuItem value="Default">Default</MenuItem>
                      <MenuItem value="High to Low">High to Low</MenuItem>
                      <MenuItem value="Low to High">Low to High</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              {/* Interactive Orders Column Header Dropdown */}
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Orders</span>
                  <FormControl size="small">
                    <Select
                      value={orderSort}
                      onChange={(e) => setOrderSort(e.target.value)}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        height: 28,
                        bgcolor: "#FFFFFF",
                        borderRadius: "6px",
                        border: "1px solid #CBD5E1",
                        "& .MuiSelect-select": { py: 0.2, px: 1 }
                      }}
                    >
                      <MenuItem value="Default">Default</MenuItem>
                      <MenuItem value="Highest Orders">Highest Orders</MenuItem>
                      <MenuItem value="Lowest Orders">Lowest Orders</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>

              {/* Interactive Approval Column Header Dropdown */}
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Approval</span>
                  <FormControl size="small">
                    <Select
                      value={approvalFilter}
                      onChange={(e) => setApprovalFilter(e.target.value)}
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        height: 28,
                        bgcolor: "#FFFFFF",
                        borderRadius: "6px",
                        border: "1px solid #CBD5E1",
                        "& .MuiSelect-select": { py: 0.2, px: 1 }
                      }}
                    >
                      <MenuItem value="ALL">ALL</MenuItem>
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="APPROVED">APPROVED</MenuItem>
                      <MenuItem value="REJECTED">REJECTED</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>

              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: "#374151" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Skeleton height={40} />
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#9CA3AF" }}>
                    <Inventory2Icon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#4B5563" }}>
                      No Products Found for Filter "{approvalFilter}"
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setApprovalFilter("ALL")}
                      sx={{ mt: 1, textTransform: "none", color: "#00838F", fontWeight: 700 }}
                    >
                      Reset Filter to ALL
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.productId} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                  <TableCell sx={{ fontWeight: 600, color: "#6B7280" }}>
                    #{product.productId}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                    {product.productName}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    {product.sellerName || "Vendor"}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 800, color: "#00838F" }}>
                    ₹ {Number(product.price || 0).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                    {product.ordersCount != null ? product.ordersCount : product.orders != null ? product.orders : 0}
                  </TableCell>

                  <TableCell>
                    {getApprovalChip(product.approvalStatus)}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={product.status || "ACTIVE"}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: "#00838F", color: "#00838F", fontWeight: 600, fontSize: "0.725rem" }}
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={product.approvalStatus === "APPROVED"}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => approveProduct(product.productId)}
                        sx={{
                          bgcolor: "#10B981",
                          color: "#FFF",
                          fontWeight: 700,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#059669" }
                        }}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        disabled={product.approvalStatus === "REJECTED"}
                        startIcon={<CancelIcon />}
                        onClick={() => rejectProduct(product.productId)}
                        sx={{
                          bgcolor: "#F59E0B",
                          color: "#FFF",
                          fontWeight: 700,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#D97706" }
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
