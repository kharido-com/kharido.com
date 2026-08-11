import { useEffect, useState } from "react";

function AdminReports() {

    const [reports, setReports] = useState({
        totalUsers: 0,
        totalSellers: 0,
        totalProducts: 0,
        totalOrders: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadReports = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:8082/api/admin/reports",
                {
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error("Unable to fetch reports");
            }

            const data = await response.json();

            console.log("REPORT DATA =", data);

            setReports(data);

        } catch (error) {

            console.error(error);
            setError("Unable to load reports");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        loadReports();

    }, []);

    return (

        <div className="admin-page">

            <h1>Reports & Analytics</h1>

            <hr />

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {loading ? (

                <h4>Loading reports...</h4>

            ) : (

                <>
                    <div className="report-container">

                        <div className="report-card">
                            <h3>Total Users</h3>
                            <h2>{reports.totalUsers}</h2>
                            <p>Registered Users</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Sellers</h3>
                            <h2>{reports.totalSellers}</h2>
                            <p>Registered Sellers</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Products</h3>
                            <h2>{reports.totalProducts}</h2>
                            <p>Available Products</p>
                        </div>

                        <div className="report-card">
                            <h3>Total Orders</h3>
                            <h2>{reports.totalOrders}</h2>
                            <p>Orders Received</p>
                        </div>

                    </div>

                    <br />

                    <div className="activity-box">

                        <h2>System Summary</h2>

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>Metric</th>
                                    <th>Count</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr>
                                    <td>Total Users</td>
                                    <td>{reports.totalUsers}</td>
                                </tr>

                                <tr>
                                    <td>Total Sellers</td>
                                    <td>{reports.totalSellers}</td>
                                </tr>

                                <tr>
                                    <td>Total Products</td>
                                    <td>{reports.totalProducts}</td>
                                </tr>

                                <tr>
                                    <td>Total Orders</td>
                                    <td>{reports.totalOrders}</td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </>

            )}

        </div>

    );

}

export default AdminReports;
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Skeleton
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function AdminReports() {
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/reports`, {
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch reports");
      }

      const data = await response.json();
      console.log("REPORT DATA =", data);
      setReports(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const reportCards = [
    { title: "Total Users", value: reports.totalUsers, icon: <PeopleIcon sx={{ fontSize: 28 }} />, bgColor: "#E0F2FE", iconColor: "#0284C7" },
    { title: "Total Sellers", value: reports.totalSellers, icon: <StoreIcon sx={{ fontSize: 28 }} />, bgColor: "#E6F7F5", iconColor: "#00838F" },
    { title: "Total Products", value: reports.totalProducts, icon: <Inventory2Icon sx={{ fontSize: 28 }} />, bgColor: "#D1FAE5", iconColor: "#059669" },
    { title: "Total Orders", value: reports.totalOrders, icon: <ShoppingBagIcon sx={{ fontSize: 28 }} />, bgColor: "#FFF3E0", iconColor: "#FF6B00" },
    { title: "Total Revenue", value: `₹ ${Number(reports.totalRevenue || 0).toLocaleString("en-IN")}`, icon: <AccountBalanceWalletIcon sx={{ fontSize: 28 }} />, bgColor: "#FEF3C7", iconColor: "#D97706" }
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
          Reports & Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          Comprehensive metrics, platform growth indicators, and system totals
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}

      {/* Analytics Metric Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportCards.map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: "16px",
                bgcolor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)"
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
                <Skeleton width="50%" height={36} />
              ) : (
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
                  {card.value}
                </Typography>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* System Summary Table */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", mb: 2 }}>
        System Summary
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
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 700, color: "#374151" }}>Current Count</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#111827" }}>Total Registered Users</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#0284C7" }}>{reports.totalUsers}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#111827" }}>Total Registered Sellers</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#00838F" }}>{reports.totalSellers}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#111827" }}>Total Listed Products</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#059669" }}>{reports.totalProducts}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ fontWeight: 600, color: "#111827" }}>Total Processed Orders</TableCell>
              <TableCell sx={{ fontWeight: 800, color: "#FF6B00" }}>{reports.totalOrders}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
