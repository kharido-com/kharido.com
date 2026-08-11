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
  TextField,
  Typography,
  Alert,
  Chip
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import logo from "../assets/logo.png";

export default function SellerRegisterComp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    shopName: "",
    gstNumber: "",
    panNumber: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    pickupAddress: "",
    bankAccount: "",
    ifscCode: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);
      setIsError(false);
      setMsg("");

      const payload = {
        shopName: form.shopName,
        gstNumber: form.gstNumber,
        panNumber: form.panNumber,
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
        pickupAddress: form.pickupAddress,
        bankAccount: form.bankAccount,
        ifscCode: form.ifscCode
      };

      const resp = await fetch("http://localhost:8081/seller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();

      if (resp.ok || (data.message && data.message.toLowerCase().includes("success"))) {
        setIsError(false);
        setMsg(data.message || "Seller account registered successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setIsError(true);
        setMsg(data.message || "Seller registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      setMsg("Unable to connect to seller registration server.");
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
        borderColor: "#FF6B00"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF6B00",
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
          "radial-gradient(circle at 10% 20%, rgba(255, 107, 0, 0.06) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(0, 131, 143, 0.06) 0%, transparent 45%), linear-gradient(135deg, #F5F7FA 0%, #FFF3E6 100%)",
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
            boxShadow: "0 16px 40px rgba(255, 107, 0, 0.08)",
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
              background: "linear-gradient(90deg, #FF6B00 0%, #00838F 100%)"
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
              Become a Seller on{" "}
              <Box component="span" sx={{ color: "#FF6B00" }}>
                Kharido.com
              </Box>
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
            >
              Reach millions of buyers across India and grow your business today.
            </Typography>
          </Box>

          {msg && (
            <Alert severity={isError ? "error" : "success"} sx={{ mb: 4, borderRadius: "12px" }}>
              {msg}
            </Alert>
          )}

          {/* Form Grid */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Business Name & GST Number */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="Business / Shop Name"
                  name="shopName"
                  placeholder="Acme Enterprises"
                  value={form.shopName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="GST Number"
                  name="gstNumber"
                  placeholder="22AAAAA0000A1Z5"
                  value={form.gstNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* PAN Number & Username */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="PAN Number"
                  name="panNumber"
                  placeholder="ABCDE1234F"
                  value={form.panNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="Username"
                  name="username"
                  placeholder="acme_seller"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Email & Phone */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type="email"
                  label="Business Email"
                  name="email"
                  placeholder="seller@acme.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="Business Phone"
                  name="phone"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Password & Confirm Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
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

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  name="confirmPassword"
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
                      color={passwordChecks.length ? "warning" : "default"}
                      variant={passwordChecks.length ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Uppercase"
                      color={passwordChecks.upper ? "warning" : "default"}
                      variant={passwordChecks.upper ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Lowercase"
                      color={passwordChecks.lower ? "warning" : "default"}
                      variant={passwordChecks.lower ? "filled" : "outlined"}
                    />
                    <Chip
                      size="small"
                      icon={<CheckCircleOutlinedIcon style={{ fontSize: 14 }} />}
                      label="1 Number"
                      color={passwordChecks.number ? "warning" : "default"}
                      variant={passwordChecks.number ? "filled" : "outlined"}
                    />
                  </Box>
                </Grid>
              )}

              {/* Pickup Address */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="Pickup Address"
                  name="pickupAddress"
                  placeholder="Warehouse 4, Industrial Area, Mumbai"
                  value={form.pickupAddress}
                  onChange={handleChange}
                />
              </Grid>

              {/* Bank Account & IFSC */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="Bank Account Number"
                  name="bankAccount"
                  placeholder="123456789012"
                  value={form.bankAccount}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  sx={inputSx}
                  label="IFSC Code"
                  name="ifscCode"
                  placeholder="SBIN0001234"
                  value={form.ifscCode}
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
                    sx={{ color: "#FF6B00", "&.Mui-checked": { color: "#FF6B00" } }}
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
                      sx={{ color: "#FF6B00", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                    >
                      Seller Terms & Conditions
                    </Box>{" "}
                    and{" "}
                    <Box
                      component={Link}
                      to="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#FF6B00", fontWeight: 600, textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
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
                bgcolor: "#FF6B00",
                color: "#FFFFFF",
                py: 1.6,
                fontSize: "1.05rem",
                fontWeight: 700,
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(255, 107, 0, 0.25)",
                transition: "all 0.25s ease-in-out",
                "&:hover": {
                  background: "linear-gradient(135deg, #FF6B00 0%, #E65100 100%)",
                  boxShadow: "0 8px 22px rgba(255, 107, 0, 0.35)",
                  transform: "translateY(-2px)"
                }
              }}
            >
              {loading ? "Registering Seller..." : "Become a Seller"}
            </Button>

            {/* Footer Login Link */}
            <Box textAlign="center" mt={3.5}>
              <Typography variant="body2" sx={{ color: "#6B7280" }}>
                Already have a seller account?{" "}
                <Button
                  component={Link}
                  to="/login"
                  sx={{ color: "#FF6B00", fontWeight: 700, textTransform: "none", p: 0, ml: 0.5 }}
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