import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import logo from "../assets/logo.png";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}/api/auth/login`,
        {
          method: "POST",
          credentials: "include", // Cookie sent & received
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      console.log("Spring Boot Response:", data);

      // Login Failed
      if (!response.ok || data.message !== "Login successful") {
        setMsg(data.message || data.error || "Invalid username or password.");
        return;
      }

      const userData = {
        username: data.username,
        role: data.role,
      };

      dispatch(
        login({
          user: userData,
        })
      );

      // Save only user info (JWT is in HttpOnly Cookie)
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: userData,
        })
      );

      switch (data.role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "SELLER":
          navigate("/seller");
          break;

        case "CUSTOMER":
          navigate("/user");
          break;

        case "DELIVERY":
          navigate("/delivery");
          break;

        default:
          setMsg("Invalid user role: " + data.role);
          break;
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMsg("Invalid username or password.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 6
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: "20px",
          border: "1px solid #E5E7EB",
          bgcolor: "#FFFFFF",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)"
        }}
      >
        <Box textAlign="center" mb={3}>
          <Box
            component={Link}
            to="/"
            sx={{ display: "inline-block", textDecoration: "none", mb: 2 }}
          >
            <Box
              component="img"
              src={logo}
              alt="Kharido.com Logo"
              sx={{
                height: 56,
                objectFit: "contain"
              }}
            />
          </Box>

          <Typography variant="h4" fontWeight={800} sx={{ color: "#111827" }}>
            Welcome Back
          </Typography>

          <Typography color="text.secondary" mt={0.5} sx={{ fontSize: "0.95rem" }}>
            Login to your Kharido account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <FormControlLabel
              control={<Checkbox sx={{ color: "#00838F", "&.Mui-checked": { color: "#00838F" } }} />}
              label="Remember Me"
            />

            <Link
              to="#"
              style={{
                textDecoration: "none",
                color: "#00838F",
                fontWeight: 600,
                fontSize: "0.9rem"
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "10px",
              bgcolor: "#00838F",
              fontSize: "1rem",
              fontWeight: 700,
              "&:hover": { bgcolor: "#00695C" }
            }}
          >
            LOGIN
          </Button>

          {msg && (
            <Alert severity="error" sx={{ mt: 3, borderRadius: "10px" }}>
              {msg}
            </Alert>
          )}

          <Typography textAlign="center" mt={3} sx={{ color: "#6B7280", fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: 700,
                color: "#FF6B00"
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}