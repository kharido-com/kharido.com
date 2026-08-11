import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Alert,
  Chip
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import logo from "../assets/logo.png";

export default function CustomerRegisterComp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    gender: "MALE",
    city: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Live password requirements check
  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password)
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setIsError(true);
      setMsg("Passwords do not match.");
      return;
    }

    if (form.phone && form.phone.replace(/\D/g, "").length !== 10) {
      setIsError(true);
      setMsg("Mobile number must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);
      setIsError(false);
      setMsg("");

      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
        dob: form.dob,
        gender: (form.gender || "MALE").toUpperCase(),
        city: form.city
      };

      const resp = await fetch("http://localhost:8081/api/customers/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();

      if (resp.ok || (data.message && data.message.toLowerCase().includes("success"))) {
        setIsError(false);
        setMsg(data.message || "Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setIsError(true);
        setMsg(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMsg("Unable to connect to registration server. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  const inputSx = {
    "& .MuiInputBase-root": {
      height: 48,
      borderRadius: "12px",
      bgcolor: "#FFFFFF",
      transition: "all 0.2s ease-in-out"
    },
    "& .MuiOutlinedInput-root": {
      height: 48,
      borderRadius: "12px",
      bgcolor: "#FFFFFF",
      transition: "all 0.2s ease-in-out",
      "&:hover fieldset": {
        borderColor: "#00838F"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00838F",
        borderWidth: "2px"
      }
    },
    "& .MuiSelect-select": {
      display: "flex",
      alignItems: "center",
      height: "48px !important",
      boxSizing: "border-box"
    },
    "& .MuiInputBase-input": {
      boxSizing: "border-box"
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 20%, rgba(0, 131, 143, 0.06) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(255, 107, 0, 0.06) 0%, transparent 45%), linear-gradient(135deg, #F5F7FA 0%, #E6F7F5 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 5, md: 8 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            borderRadius: "24px",
            border: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
            boxShadow: "0 16px 40px rgba(0, 131, 143, 0.08)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Top Brand Accent Strip */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: "linear-gradient(90deg, #00838F 0%, #FF6B00 100%)"
            }}
          />

          {/* Header */}
          <Box textAlign="center" mb={4} mt={1}>
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
                  height: { xs: 58, md: 72 },
                  objectFit: "contain"
                }}
              />
            </Box>

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "#111827", fontSize: { xs: "1.7rem", md: "2.3rem" }, mb: 1 }}
            >
              Create Your{" "}
              <Box component="span" sx={{ color: "#00838F" }}>
                Customer Account
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
            >
              Join thousands of happy shoppers on Kharido.com today.
            </Typography>
          </Box>

          {msg && (
            <Alert severity={isError ? "error" : "success"} sx={{ mb: 4, borderRadius: "12px" }}>
              {msg}
            </Alert>
          )}

          {/* Form Grid */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2.5} alignItems="flex-start">
              {/* Row 1: First Name, Last Name, Username */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  First Name <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  name="firstname"
                  placeholder="First Name"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Last Name <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  name="lastname"
                  placeholder="Last Name"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Username <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Row 2: Email, Password, Confirm Password */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Email Address <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Password <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Confirm Password <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  error={form.confirmPassword !== "" && form.password !== form.confirmPassword}
                  helperText={
                    form.confirmPassword !== "" && form.password !== form.confirmPassword
                      ? "Passwords do not match"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Password Strength Checklist */}
              {form.password && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      bgcolor: "#F9FAFB",
                      p: 2,
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1.5,
                      alignItems: "center"
                    }}
                  >
                    <Typography variant="caption" fontWeight={700} sx={{ color: "#6B7280", mr: 1 }}>
                      Password Requirements:
                    </Typography>

                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="8+ Characters"
                      color={passwordChecks.length ? "success" : "default"}
                      variant={passwordChecks.length ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Uppercase"
                      color={passwordChecks.upper ? "success" : "default"}
                      variant={passwordChecks.upper ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Lowercase"
                      color={passwordChecks.lower ? "success" : "default"}
                      variant={passwordChecks.lower ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Number"
                      color={passwordChecks.number ? "success" : "default"}
                      variant={passwordChecks.number ? "filled" : "outlined"}
                    />
                  </Box>
                </Grid>
              )}

              {/* Row 3: Mobile Number (3), Date of Birth (3), Gender (2), City (4) */}
              <Grid item xs={12} md={3}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Mobile Number <Box component="span" sx={{ color: "#EF4444" }}>*</Box>
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Date of Birth
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  Gender
                </Typography>
                <TextField
                  select
                  fullWidth
                  sx={inputSx}
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHER">Other</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography variant="body2" fontWeight={600} color="#374151" mb={0.75}>
                  City
                </Typography>
                <TextField
                  fullWidth
                  sx={inputSx}
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Terms & Conditions Checkbox */}
            <Box mt={3.5} mb={3.5}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    sx={{ color: "#00838F", "&.Mui-checked": { color: "#00838F" } }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#4B5563" }}>
                    I agree to the{" "}
                    <Box
                      component={Link}
                      to="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#00838F", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      Terms & Conditions
                    </Box>{" "}
                    and{" "}
                    <Box
                      component={Link}
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#00838F", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      Privacy Policy
                    </Box>
                  </Typography>
                }
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!agreedToTerms || loading}
              sx={{
                bgcolor: "#00838F",
                color: "#FFFFFF",
                py: 1.6,
                fontSize: "1.05rem",
                fontWeight: 700,
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0, 131, 143, 0.25)",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(135deg, #00838F 0%, #00695C 100%)",
                  boxShadow: "0 8px 22px rgba(0, 131, 143, 0.35)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              {loading ? "Creating Account..." : "Create Customer Account"}
            </Button>

            {/* Footer Login Link */}
            <Box textAlign="center" mt={3.5}>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Already have an account?{" "}
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: "#00838F", fontWeight: 700, textTransform: "none", p: 0, ml: 0.5 }}
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}