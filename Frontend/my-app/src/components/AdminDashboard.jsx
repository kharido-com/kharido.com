import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Skeleton,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

    const [dashboard, setDashboard] = useState({
        totalUsers: 0,
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
import StoreIcon from "@mui/icons-material/Store";
import PeopleIcon from "@mui/icons-material/People";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShieldIcon from "@mui/icons-material/Shield";
>>>>>>> Stashed changes

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

        fetch("http://localhost:8082/api/admin/dashboard", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(async (response) => {

            if (!response.ok) {

                const text = await response.text();

                throw new Error(text || "Failed to load dashboard");
            }

            return response.json();
        })
        .then((data) => {

            console.log("Dashboard Response:", data);

            setDashboard(data);
        })
        .catch((error) => {

            console.error(error);

            setError(error.message);

        })
        .finally(() => {

            setLoading(false);

        });

    }, []);

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div className="admin-page">

            <h1>Kharido Admin Dashboard</h1>

            {error && (
                <h3 style={{ color: "red" }}>
                    {error}
                </h3>
            )}

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <h3>Total Vendors</h3>
                    <h2>{dashboard.totalSellers}</h2>
                    <p>Registered Vendors</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Users</h3>
                    <h2>{dashboard.totalUsers}</h2>
                    <p>Registered Users</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Products</h3>
                    <h2>{dashboard.totalProducts}</h2>
                    <p>Available Products</p>
                </div>

                <div className="dashboard-card">
                    <h3>Total Orders</h3>
                    <h2>{dashboard.totalOrders}</h2>
                    <p>Customer Orders</p>
                </div>

                <div className="dashboard-card">
                    <h3>Revenue</h3>
                    <h2>₹2,50,000</h2>
                    <p>Total Sales</p>
                </div>

            </div>

            <div className="activity-box">

                <h2>Recent Activities</h2>

                <table className="admin-table">

                    <thead>

                        <tr>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>New customer registered</td>
                            <td>16 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Completed
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>New order placed</td>
                            <td>16 June 2026</td>
                            <td>
                                <span className="status pending">
                                    Processing
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Product stock updated</td>
                            <td>15 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Updated
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <td>Vendor added new product</td>
                            <td>15 June 2026</td>
                            <td>
                                <span className="status completed">
                                    Added
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const adminName = user.username || "Admin";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/dashboard`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text || "Failed to load dashboard");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dashboard Response:", data);
        setDashboard(data);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      title: "Total Vendors",
      value: dashboard.totalSellers,
      icon: <StoreIcon sx={{ fontSize: 28 }} />,
      bgColor: "#E6F7F5",
      iconColor: "#00838F",
      path: "/admin/vendors"
    },
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      bgColor: "#E0F2FE",
      iconColor: "#0284C7",
      path: "/admin/customers"
    },
    {
      title: "Total Products",
      value: dashboard.totalProducts,
      icon: <Inventory2Icon sx={{ fontSize: 28 }} />,
      bgColor: "#D1FAE5",
      iconColor: "#059669",
      path: "/admin/products"
    },
    {
      title: "Total Orders",
      value: dashboard.totalOrders,
      icon: <ShoppingBagIcon sx={{ fontSize: 28 }} />,
      bgColor: "#FFF3E0",
      iconColor: "#FF6B00",
      path: "/admin/orders"
    },
    {
      title: "Total Revenue",
      value: `₹ ${Number(dashboard.totalRevenue || 0).toLocaleString("en-IN")}`,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />,
      bgColor: "#FEF3C7",
      iconColor: "#D97706",
      path: "/admin/reports"
    }
  ];

  const activities = [
    { activity: "New customer registered", date: "16 June 2026", status: "Completed", color: "success" },
    { activity: "New order placed", date: "16 June 2026", status: "Processing", color: "warning" },
    { activity: "Product stock updated", date: "15 June 2026", status: "Updated", color: "success" },
    { activity: "Vendor added new product", date: "15 June 2026", status: "Added", color: "info" }
  ];

  return (
    <Box>
      {/* Hero Welcome Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: "20px",
          background: "linear-gradient(135deg, #0A2540 0%, #004D40 100%)",
          color: "#FFFFFF",
          boxShadow: "0 10px 30px rgba(10, 37, 64, 0.2)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Chip
              icon={<ShieldIcon sx={{ color: "#FFFFFF !important", fontSize: "1.1rem" }} />}
              label="Kharido Control Center"
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: "0.85rem",
                px: 0.5
              }}
            />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: "-0.5px" }}>
            Welcome back, {adminName}! 👋
          </Typography>

          <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.85)", maxWidth: 650, mb: 3 }}>
            Monitor store vendors, review product approval queues, track customer orders, and manage platform security.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              component={Link}
              to="/admin/vendors"
              variant="contained"
              sx={{
                bgcolor: "#FF6B00",
                color: "#FFFFFF",
                fontWeight: 700,
                px: 3,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 4px 14px rgba(255, 107, 0, 0.4)",
                "&:hover": { bgcolor: "#E65100" }
              }}
            >
              Review Vendors
            </Button>

            <Button
              component={Link}
              to="/admin/products"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "rgba(255, 255, 255, 0.5)",
                color: "#FFFFFF",
                fontWeight: 600,
                px: 3,
                py: 1.2,
                borderRadius: "12px",
                textTransform: "none",
                "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.1)" }
              }}
            >
              Approve Products
            </Button>
          </Box>
        </Box>

        {/* Decorative Background Accent */}
        <Box
          sx={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)",
            pointerEvents: "none"
          }}
        />
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Overview Stat Cards Grid */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 2 }}>
        Platform Overview
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)"
          },
          gap: 3,
          mb: 4,
          width: "100%"
        }}
      >
        {statCards.map((card, idx) => (
          <Paper
            key={idx}
            elevation={0}
            component={Link}
            to={card.path}
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              transition: "transform 0.2s ease-in-out, boxShadow 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                borderColor: card.iconColor
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: card.bgColor,
                  color: card.iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {card.icon}
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: "#6B7280", fontWeight: 600, mb: 0.5 }}>
              {card.title}
            </Typography>

            {loading ? (
              <Skeleton width="60%" height={36} />
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
                {card.value}
              </Typography>
            )}
          </Paper>
        ))}
      </Box>

      {/* Recent Activities Section */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 2 }}>
        Recent Activities
      </Typography>

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
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Activity Description</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {activities.map((act, index) => (
              <TableRow key={index} sx={{ "&:hover": { bgcolor: "#F9FAFB" } }}>
                <TableCell sx={{ fontWeight: 600, color: "#111827" }}>{act.activity}</TableCell>
                <TableCell sx={{ color: "#6B7280" }}>{act.date}</TableCell>
                <TableCell>
                  <Chip
                    label={act.status}
                    size="small"
                    color={act.color}
                    sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
