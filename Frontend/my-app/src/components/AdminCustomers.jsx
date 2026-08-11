import { useEffect, useState } from "react";

function AdminCustomers() {

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadCustomers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/users/customers",
                {
                    credentials: "include"
                }
            );


            if (!response.ok) {
                throw new Error("Unable to fetch customers");
            }


            const data = await response.json();

            console.log("CUSTOMER DATA =", data);

            setCustomers(data);


        } catch (error) {

            console.error(error);

            setError("Unable to load customers");


        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        loadCustomers();

    }, []);




    const updateCustomerStatus = async (id, status) => {


        const message =
            status === "BLOCKED"
                ? "Block this customer?"
                : "Activate this customer?";


        if (!window.confirm(message)) {
            return;
        }



        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/users/${id}/status?status=${status}`,

                {
                    method: "PUT",
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Status update failed"
                );

            }



            loadCustomers();



        } catch(error) {


            console.error(error);

            setError(
                "Unable to update customer status"
            );


        }

    };





    return (

        <div className="admin-page">


            <h1>
                Customer Management
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
                    Customers List
                </h2>




                {
                    loading ?


                    (

                        <h4>
                            Loading customers...
                        </h4>

                    )


                    :


                    (


                    <table className="admin-table">


                        <thead>


                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Status</th>

                                <th>Created At</th>

                                <th>Action</th>


                            </tr>


                        </thead>





                        <tbody>



                        {
                            customers.length === 0 ?


                            (

                                <tr>

                                    <td 
                                    colSpan="7"
                                    className="text-center">

                                        No Customers Found

                                    </td>


                                </tr>

                            )


                            :



                            customers.map(customer => (



                                <tr key={customer.userId}>


                                    <td>
                                        {customer.userId}
                                    </td>



                                    <td>
                                        {customer.username}
                                    </td>



                                    <td>
                                        {customer.email}
                                    </td>



                                    <td>
                                        {customer.role}
                                    </td>




                                    <td>


                                        <span
                                        className={
                                            customer.status === "ACTIVE"
                                            ?
                                            "status completed"
                                            :
                                            "status pending"
                                        }>

                                            {customer.status}

                                        </span>


                                    </td>





                                    <td>

                                        {
                                            customer.createdAt
                                            ?
                                            customer.createdAt.replace("T"," ")
                                            :
                                            "-"
                                        }

                                    </td>





                                    <td>


                                    {
                                        customer.status === "ACTIVE"


                                        ?


                                        <button

                                        className="delete-btn"

                                        onClick={() =>
                                            updateCustomerStatus(
                                                customer.userId,
                                                "BLOCKED"
                                            )
                                        }>

                                            Block User

                                        </button>



                                        :



                                        <button

                                        className="view-btn"

                                        onClick={() =>
                                            updateCustomerStatus(
                                                customer.userId,
                                                "ACTIVE"
                                            )
                                        }>

                                            Activate User

                                        </button>


                                    }


                                    </td>




                                </tr>



                            ))


                        }




                        </tbody>



                    </table>


                    )

                }



            </div>



        </div>

    );

}


export default AdminCustomers;
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

import PeopleIcon from "@mui/icons-material/People";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/users/customers`,
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch customers");
      }

      const data = await response.json();
      console.log("CUSTOMER DATA =", data);
      setCustomers(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const updateCustomerStatus = async (id, status) => {
    const confirmMessage =
      status === "BLOCKED"
        ? "Block this customer?"
        : "Activate this customer?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/users/${id}/status?status=${status}`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Status update failed");
      }

      loadCustomers();
    } catch (error) {
      console.error(error);
      setError("Unable to update customer status");
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    if (statusFilter === "ALL") return true;
    const s = (customer.status || "ACTIVE").trim().toUpperCase();
    return s === statusFilter;
  });

  const getCountByStatus = (status) => {
    if (status === "ALL") return customers.length;
    return customers.filter((c) => {
      const s = (c.status || "ACTIVE").trim().toUpperCase();
      return s === status;
    }).length;
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
          Customer Management
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          View registered customer accounts, check profile details, and manage access status
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Quick Filter Chips Bar */}
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
            Filter by Customer Status:
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {["ALL", "ACTIVE", "BLOCKED"].map((st) => (
            <Chip
              key={st}
              label={`${st} (${getCountByStatus(st)})`}
              onClick={() => setStatusFilter(st)}
              sx={{
                fontWeight: 700,
                fontSize: "0.775rem",
                cursor: "pointer",
                bgcolor: statusFilter === st ? "#00838F" : "#F1F5F9",
                color: statusFilter === st ? "#FFFFFF" : "#475569",
                "&:hover": {
                  bgcolor: statusFilter === st ? "#006064" : "#E2E8F0"
                }
              }}
            />
          ))}
        </Stack>
      </Paper>

      {/* Customer Table Paper */}
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
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Role</TableCell>

              {/* Interactive Status Column Header Dropdown */}
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Status</span>
                  <FormControl size="small">
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
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
                      <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                      <MenuItem value="BLOCKED">BLOCKED</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>

              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: "#374151" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Skeleton height={40} />
                </TableCell>
              </TableRow>
            ) : filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#9CA3AF" }}>
                    <PeopleIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#4B5563" }}>
                      No Customers Found for Filter "{statusFilter}"
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => setStatusFilter("ALL")}
                      sx={{ mt: 1, textTransform: "none", color: "#00838F", fontWeight: 700 }}
                    >
                      Reset Filter to ALL
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.userId} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                  <TableCell sx={{ fontWeight: 600, color: "#6B7280" }}>
                    #{customer.userId}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                    {customer.username}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 500, color: "#374151" }}>
                    {customer.email}
                  </TableCell>

                  <TableCell>
                    <Chip label={customer.role || "CUSTOMER"} size="small" sx={{ bgcolor: "#E0F2FE", color: "#0284C7", fontWeight: 700 }} />
                  </TableCell>

                  <TableCell>
                    {(customer.status || "ACTIVE").toUpperCase() === "ACTIVE" ? (
                      <Chip label="ACTIVE" size="small" sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "0.75rem" }} />
                    ) : (customer.status || "").toUpperCase() === "BLOCKED" ? (
                      <Chip label="BLOCKED" size="small" sx={{ bgcolor: "#FEE2E2", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem" }} />
                    ) : (
                      <Chip label={customer.status || "INACTIVE"} size="small" sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 700, fontSize: "0.75rem" }} />
                    )}
                  </TableCell>

                  <TableCell sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                    {customer.createdAt
                      ? new Date(customer.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })
                      : "-"}
                  </TableCell>

                  <TableCell align="right">
                    {(customer.status || "ACTIVE").toUpperCase() === "ACTIVE" ? (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<BlockIcon />}
                        onClick={() => updateCustomerStatus(customer.userId, "BLOCKED")}
                        sx={{
                          borderColor: "#EF4444",
                          color: "#EF4444",
                          fontWeight: 600,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" }
                        }}
                      >
                        Block User
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => updateCustomerStatus(customer.userId, "ACTIVE")}
                        sx={{
                          bgcolor: "#10B981",
                          color: "#FFF",
                          fontWeight: 700,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#059669" }
                        }}
                      >
                        Activate User
                      </Button>
                    )}
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
