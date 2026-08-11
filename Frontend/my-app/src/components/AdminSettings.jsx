import { useEffect, useState } from "react";

function AdminSettings() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const response = await fetch(
                    "http://localhost:8082/api/admin/profile",
                    {
                        credentials: "include"
                    }
                );

                if (!response.ok) {
                    throw new Error("Unable to load profile");
                }

                const data = await response.json();

                console.log("PROFILE =", data);

                setProfile(data);

            } catch (err) {

                console.error(err);

                setError("Unable to load profile.");

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (

        <div className="admin-page">

            <h1>Admin Profile</h1>

            <hr />

            <table className="admin-table">

                <tbody>

                    <tr>
                        <th>User ID</th>
                        <td>{profile.userId}</td>
                    </tr>

                    <tr>
                        <th>Username</th>
                        <td>{profile.username}</td>
                    </tr>

                    <tr>
                        <th>Email</th>
                        <td>{profile.email}</td>
                    </tr>

                    <tr>
                        <th>Role</th>
                        <td>{profile.role}</td>
                    </tr>

                    <tr>
                        <th>Status</th>
                        <td>{profile.status}</td>
                    </tr>

                    <tr>
                        <th>Created At</th>
                        <td>{profile.createdAt}</td>
                    </tr>

                </tbody>

            </table>

        </div>

    );
}

export default AdminSettings;
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Alert,
  Skeleton
} from "@mui/material";

import ShieldIcon from "@mui/icons-material/Shield";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import EventIcon from "@mui/icons-material/Event";

export default function AdminSettings() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/admin/profile`, {
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error("Unable to load profile");
        }

        const data = await response.json();
        console.log("PROFILE =", data);
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
        <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "20px", mb: 3 }} />
        <Skeleton height={40} width="60%" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ borderRadius: "12px" }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 850, mx: "auto" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#111827" }}>
          Admin Profile & Settings
        </Typography>
        <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.5 }}>
          View administrator account details, security credentials, and system privileges
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          bgcolor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
          overflow: "hidden"
        }}
      >
        {/* Top Header Gradient Banner */}
        <Box
          sx={{
            p: 4,
            background: "linear-gradient(135deg, #0A2540 0%, #004D40 100%)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: 3
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#FFFFFF",
              color: "#0A2540",
              fontWeight: 800,
              fontSize: "2.2rem",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
            }}
          >
            {(profile?.username || "A").charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {profile?.username || "Administrator"}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.85)", mt: 0.5 }}>
              Email: {profile?.email || "-"}
            </Typography>
            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <Chip
                icon={<ShieldIcon sx={{ color: "#FFFFFF !important", fontSize: "1rem" }} />}
                label={profile?.role || "ADMIN"}
                size="small"
                sx={{ bgcolor: "#FF6B00", color: "#FFFFFF", fontWeight: 700 }}
              />
              <Chip
                label={profile?.status || "ACTIVE"}
                size="small"
                sx={{ bgcolor: "#D1FAE5", color: "#059669", fontWeight: 700 }}
              />
            </Box>
          </Box>
        </Box>

        {/* Profile Info Grid */}
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                  <BadgeIcon fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    User ID
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  #{profile?.userId}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Username
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  {profile?.username}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                  <EmailIcon fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Email Address
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  {profile?.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748B", mb: 0.5 }}>
                  <EventIcon fontSize="small" />
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase" }}>
                    Account Created
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0F172A" }}>
                  {profile?.createdAt ? profile.createdAt.replace("T", " ") : "-"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
