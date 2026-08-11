import { useEffect, useState } from "react";

function AdminVendors() {

    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    const loadVendors = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/sellers",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {

                throw new Error(
                    "Unable to fetch vendors"
                );

            }


            const data = await response.json();


            console.log(
                "VENDOR DATA =",
                data
            );


            setVendors(data);


        } catch (error) {


            console.error(error);

            setError(
                "Unable to load vendors"
            );


        } finally {

            setLoading(false);

        }

    };




    useEffect(() => {

        loadVendors();

    }, []);







    const approveVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/approve`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Approve failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to approve vendor"
            );


        }

    };









    const rejectVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/reject`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Reject failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to reject vendor"
            );


        }

    };









    const blockVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/block`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Block failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to block vendor"
            );


        }

    };









    const activateVendor = async (id) => {

        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/sellers/${id}/activate`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Activate failed"
                );

            }


            loadVendors();



        } catch (error) {


            console.error(error);

            setError(
                "Unable to activate vendor"
            );


        }

    };








    return (

        <div className="admin-page">


            <h1>
                Vendor Management
            </h1>


            <hr />



            {
                error &&

                <div className="alert alert-danger">

                    {error}

                </div>
            }






            <div className="customer-box">


                <h2>
                    Vendor List
                </h2>





                {
                    loading ?


                    <h4>
                        Loading vendors...
                    </h4>


                    :



                    <table className="admin-table">


                        <thead>


                            <tr>

                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Shop</th>
                                <th>GST</th>
                                <th>Phone</th>
                                <th>Approval</th>
                                <th>Approved Date</th>
                                <th>Action</th>

                            </tr>


                        </thead>





                        <tbody>


                        {
                            vendors.length === 0 ?


                            <tr>

                                <td colSpan="9">

                                    No Vendors Found

                                </td>

                            </tr>


                            :



                            vendors.map(vendor => (


                                <tr key={vendor.sellerId}>


                                    <td>
                                        {vendor.sellerId}
                                    </td>


                                    <td>
                                        {vendor.username}
                                    </td>


                                    <td>
                                        {vendor.email}
                                    </td>


                                    <td>
                                        {vendor.shopName}
                                    </td>


                                    <td>
                                        {vendor.gstNumber}
                                    </td>


                                    <td>
                                        {vendor.phone}
                                    </td>



                                    <td>


                                        <span
                                        className={
                                            vendor.approvalStatus === "APPROVED"

                                            ?

                                            "status completed"

                                            :

                                            vendor.approvalStatus === "BLOCKED"

                                            ?

                                            "status rejected"

                                            :

                                            "status pending"
                                        }
                                        >

                                            {vendor.approvalStatus}

                                        </span>


                                    </td>




                                    <td>

                                        {
                                            vendor.approvedDate

                                            ?

                                            vendor.approvedDate.replace("T"," ")

                                            :

                                            "-"
                                        }

                                    </td>






                                    <td>


                                        <button
                                        className="btn btn-success btn-sm me-2"

                                        disabled={
                                            vendor.approvalStatus === "APPROVED"
                                        }

                                        onClick={() =>
                                            approveVendor(
                                                vendor.sellerId
                                            )
                                        }
                                        >

                                            Approve

                                        </button>






                                        <button
                                        className="btn btn-warning btn-sm me-2"

                                        onClick={() =>
                                            rejectVendor(
                                                vendor.sellerId
                                            )
                                        }
                                        >

                                            Reject

                                        </button>







                                        {
                                            vendor.approvalStatus === "BLOCKED"

                                            ?


                                            <button
                                            className="btn btn-primary btn-sm"

                                            onClick={() =>
                                                activateVendor(
                                                    vendor.sellerId
                                                )
                                            }
                                            >

                                                Activate

                                            </button>


                                            :


                                            <button
                                            className="btn btn-danger btn-sm"

                                            onClick={() =>
                                                blockVendor(
                                                    vendor.sellerId
                                                )
                                            }
                                            >

                                                Block

                                            </button>

                                        }



                                    </td>


                                </tr>


                            ))

                        }


                        </tbody>


                    </table>


                }



            </div>



        </div>

    );

}


export default AdminVendors;
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

import StoreIcon from "@mui/icons-material/Store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BlockIcon from "@mui/icons-material/Block";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("ALL");
  const [productSort, setProductSort] = useState("Default");

  const loadVendors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/sellers`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch vendors");
      }

      const data = await response.json();
      console.log("VENDOR DATA =", data);
      setVendors(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const approveVendor = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/sellers/${id}/approve`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Approve failed");
      }

      loadVendors();
    } catch (error) {
      console.error(error);
      setError("Unable to approve vendor");
    }
  };

  const rejectVendor = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/sellers/${id}/reject`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Reject failed");
      }

      loadVendors();
    } catch (error) {
      console.error(error);
      setError("Unable to reject vendor");
    }
  };

  const blockVendor = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/sellers/${id}/block`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Block failed");
      }

      loadVendors();
    } catch (error) {
      console.error(error);
      setError("Unable to block vendor");
    }
  };

  const activateVendor = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/sellers/${id}/activate`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Activate failed");
      }

      loadVendors();
    } catch (error) {
      console.error(error);
      setError("Unable to activate vendor");
    }
  };

  const getApprovalChip = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "APPROVED") {
      return <Chip label="APPROVED" size="small" sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    if (s === "BLOCKED" || s === "REJECTED") {
      return <Chip label={s} size="small" sx={{ bgcolor: "#FEE2E2", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    return <Chip label="PENDING" size="small" sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 700, fontSize: "0.75rem" }} />;
  };

  const filteredVendors = vendors
    .filter((vendor) => {
      if (approvalFilter === "ALL") return true;
      return (vendor.approvalStatus || "").toUpperCase() === approvalFilter;
    })
    .sort((a, b) => {
      if (productSort === "Count ↓") {
        const countA = Number(a.productCount != null ? a.productCount : a.products != null ? a.products : 0);
        const countB = Number(b.productCount != null ? b.productCount : b.products != null ? b.products : 0);
        return countB - countA;
      }
      if (productSort === "Count ↑") {
        const countA = Number(a.productCount != null ? a.productCount : a.products != null ? a.products : 0);
        const countB = Number(b.productCount != null ? b.productCount : b.products != null ? b.products : 0);
        return countA - countB;
      }
      return 0;
    });

  const getCountByStatus = (status) => {
    if (status === "ALL") return vendors.length;
    return vendors.filter((v) => (v.approvalStatus || "").toUpperCase() === status).length;
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
            Vendor Management
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
            Approve vendor applications, review shop credentials, and manage seller permissions
          </Typography>
        </Box>
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
          {["ALL", "PENDING", "APPROVED", "REJECTED", "BLOCKED"].map((st) => (
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

      {/* Vendor Table */}
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
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Shop Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>GST Number</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Phone</TableCell>

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
                      <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>

              {/* Interactive Products Column Header Dropdown */}
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Products</span>
                  <FormControl size="small">
                    <Select
                      value={productSort}
                      onChange={(e) => setProductSort(e.target.value)}
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
                      <MenuItem value="Count ↓">Count ↓</MenuItem>
                      <MenuItem value="Count ↑">Count ↑</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
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
            ) : filteredVendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#9CA3AF" }}>
                    <StoreIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#4B5563" }}>
                      No Vendors Found for Filter "{approvalFilter}"
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
              filteredVendors.map((vendor) => (
                <TableRow key={vendor.sellerId} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                  <TableCell sx={{ fontWeight: 600, color: "#6B7280" }}>
                    #{vendor.sellerId}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                    {vendor.username}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700, color: "#00838F" }}>
                    {vendor.shopName || "Vendor Store"}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    {vendor.gstNumber || "-"}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 500, color: "#4B5563" }}>
                    {vendor.phone || "-"}
                  </TableCell>

                  <TableCell>
                    {getApprovalChip(vendor.approvalStatus)}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>
                    {vendor.productCount != null ? vendor.productCount : vendor.products != null ? vendor.products : 0}
                  </TableCell>

                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={vendor.approvalStatus === "APPROVED"}
                        startIcon={<CheckCircleIcon />}
                        onClick={() => approveVendor(vendor.sellerId)}
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
                        startIcon={<CancelIcon />}
                        onClick={() => rejectVendor(vendor.sellerId)}
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

                      {vendor.approvalStatus === "BLOCKED" ? (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => activateVendor(vendor.sellerId)}
                          sx={{
                            bgcolor: "#00838F",
                            color: "#FFF",
                            fontWeight: 700,
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#006064" }
                          }}
                        >
                          Activate
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          startIcon={<BlockIcon />}
                          onClick={() => blockVendor(vendor.sellerId)}
                          sx={{
                            borderColor: "#EF4444",
                            color: "#EF4444",
                            fontWeight: 600,
                            borderRadius: "8px",
                            textTransform: "none",
                            "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" }
                          }}
                        >
                          Block
                        </Button>
                      )}
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
