import { useEffect, useState } from "react";


function AdminOrders() {


    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");





    const loadOrders = async () => {


        try {


            setLoading(true);
            setError("");



            const response = await fetch(

                "http://localhost:8082/api/admin/orders",

                {
                    credentials: "include"
                }

            );



            if (!response.ok) {

                throw new Error(
                    "Unable to fetch orders"
                );

            }



            const data = await response.json();



            console.log(
                "ORDER DATA = ",
                data
            );



            setOrders(data);



        } catch(error) {


            console.error(error);


            setError(
                "Unable to load orders"
            );



        } finally {


            setLoading(false);

        }


    };







    useEffect(()=>{


        loadOrders();


    },[]);








    const cancelOrder = async(id)=>{


        if(!window.confirm("Cancel this order?")) {

            return;

        }




        try {


            const response = await fetch(

                `http://localhost:8082/api/admin/orders/${id}/status?status=CANCELLED`,

                {

                    method:"PUT",

                    credentials:"include"

                }

            );




            if(!response.ok) {

                throw new Error(
                    "Cancel failed"
                );

            }



            loadOrders();




        } catch(error) {


            console.error(error);


            setError(
                "Unable to cancel order"
            );


        }


    };







    return (


        <div className="admin-page">



            <h1>
                Orders Management
            </h1>



            <hr />





            {
                error &&


                <div className="alert alert-danger">

                    {error}

                </div>


            }







            <h2>
                All Orders
            </h2>







            <div className="orders-box">






            {
                loading ?


                (

                    <h4>
                        Loading orders...
                    </h4>

                )



                :



                (


                <table className="admin-table">



                    <thead>


                        <tr>


                            <th>
                                Order ID
                            </th>


                            <th>
                                Customer
                            </th>


                            <th>
                                Amount
                            </th>


                            <th>
                                Payment
                            </th>


                            <th>
                                Status
                            </th>


                            <th>
                                Order Date
                            </th>


                            <th>
                                Action
                            </th>


                        </tr>


                    </thead>







                    <tbody>






                    {
                        orders.length === 0 &&


                        <tr>

                            <td colSpan="7">

                                No Orders Found

                            </td>


                        </tr>


                    }







                    {
                        orders.map(order => (



                            <tr key={order.orderId}>


                                <td>
                                    {order.orderId}
                                </td>





                                <td>
                                    {order.customerName}
                                </td>





                                <td>
                                    ₹{order.totalAmount}
                                </td>





                                <td>
                                    {order.paymentStatus}
                                </td>





                                <td>


                                    <span

                                    className={
                                        order.orderStatus === "COMPLETED"

                                        ?

                                        "status completed"

                                        :

                                        order.orderStatus === "CANCELLED"

                                        ?

                                        "status cancelled"

                                        :

                                        "status pending"
                                    }

                                    >

                                        {order.orderStatus}

                                    </span>


                                </td>








                                <td>

                                    {
                                        order.createdAt
                                        ?
                                        order.createdAt.replace("T"," ")
                                        :
                                        "-"
                                    }

                                </td>







                                <td>



                                    {
                                        order.orderStatus !== "CANCELLED"

                                        &&


                                        <button

                                        className="delete-btn"

                                        onClick={() =>
                                            cancelOrder(
                                                order.orderId
                                            )
                                        }

                                        >

                                            Cancel

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


export default AdminOrders;
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
  Skeleton
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/orders`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch orders");
      }

      const data = await response.json();
      console.log("ORDER DATA = ", data);
      setOrders(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (id) => {
    if (!window.confirm("Cancel this order?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/orders/${id}/status?status=CANCELLED`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Cancel failed");
      }

      loadOrders();
    } catch (error) {
      console.error(error);
      setError("Unable to cancel order");
    }
  };

  const formatOrderDate = (dateVal) => {
    if (!dateVal) return "-";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return "-";
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (e) {
      return "-";
    }
  };

  const getOrderStatusChip = (status) => {
    const s = (status || "").toUpperCase();
    if (s === "COMPLETED" || s === "DELIVERED") {
      return <Chip label={s} size="small" sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    if (s === "CANCELLED") {
      return <Chip label="CANCELLED" size="small" sx={{ bgcolor: "#FEE2E2", color: "#DC2626", fontWeight: 700, fontSize: "0.75rem" }} />;
    }
    return <Chip label={s || "PENDING"} size="small" sx={{ bgcolor: "#FEF3C7", color: "#D97706", fontWeight: 700, fontSize: "0.75rem" }} />;
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
          Orders Management
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          View and monitor all platform transactions and customer orders
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

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
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Payment Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Order Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Order Date</TableCell>
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
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#9CA3AF" }}>
                    <ShoppingBagIcon sx={{ fontSize: 48, mb: 1, opacity: 0.5 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#4B5563" }}>
                      No Orders Found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.orderId} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                  <TableCell sx={{ fontWeight: 700, color: "#111827" }}>
                    #{order.orderId}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    {order.customerName || "Customer"}
                  </TableCell>

                  <TableCell sx={{ fontWeight: 800, color: "#00838F" }}>
                    ₹ {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.paymentStatus || "PAID"}
                      size="small"
                      sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700, fontSize: "0.75rem" }}
                    />
                  </TableCell>

                  <TableCell>
                    {getOrderStatusChip(order.orderStatus)}
                  </TableCell>

                  <TableCell sx={{ color: "#6B7280", fontSize: "0.85rem" }}>
                    {formatOrderDate(order.orderDate || order.createdAt)}
                  </TableCell>

                  <TableCell align="right">
                    {order.orderStatus !== "CANCELLED" && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<CancelIcon />}
                        onClick={() => cancelOrder(order.orderId)}
                        sx={{
                          borderColor: "#EF4444",
                          color: "#EF4444",
                          fontWeight: 600,
                          borderRadius: "8px",
                          textTransform: "none",
                          "&:hover": { bgcolor: "#FEE2E2", borderColor: "#DC2626" }
                        }}
                      >
                        Cancel
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
