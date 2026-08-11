import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";

import paymentService from "../services/paymentService";

export default function Payment() {

    const navigate = useNavigate();

    const location = useLocation();

    const order = location.state?.order;

    const [paymentMethod, setPaymentMethod] = useState("UPI");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function payNow() {

        try {

            setLoading(true);

            setError("");

            await paymentService.makePayment({

                orderId: order.orderId,

                userId: order.userId,

                amount: order.totalAmount,

                paymentMethod

            });

            navigate(
                "/user/orders",
                {
                    replace: true
                }
            );

        }

        catch (error) {

            console.error(error);

            setError("Payment failed.");

        }

        finally {

            setLoading(false);

        }

    }

    if (!order) {

        return (

            <Alert severity="error">

                Invalid Payment Request.

            </Alert>

        );

    }

    return (

        <Box
            sx={{
                maxWidth: 1000,
                mx: "auto",
                mt: 5,
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "2fr 1fr"
                },
                gap: 4
            }}
        >

            <Card>

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        mb={3}
                    >

                        Select Payment Method

                    </Typography>

                    {
                        error &&
                        <Alert
                            severity="error"
                            sx={{ mb: 3 }}
                        >

                            {error}

                        </Alert>
                    }

                    <FormControl
                        fullWidth
                    >

                        <RadioGroup
                            value={paymentMethod}
                            onChange={(event) =>
                                setPaymentMethod(
                                    event.target.value
                                )
                            }
                        >

                            <FormControlLabel
                                value="UPI"
                                control={<Radio />}
                                label="UPI"
                            />

                            <FormControlLabel
                                value="CARD"
                                control={<Radio />}
                                label="Credit / Debit Card"
                            />

                            <FormControlLabel
                                value="NETBANKING"
                                control={<Radio />}
                                label="Net Banking"
                            />

                            <FormControlLabel
                                value="COD"
                                control={<Radio />}
                                label="Cash On Delivery"
                            />

                        </RadioGroup>

                    </FormControl>

                </CardContent>

            </Card>

            <Card>

                <CardContent>

                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        mb={3}
                    >

                        Order Summary

                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                    >

                        <Typography>

                            Order Id

                        </Typography>

                        <Typography>

                            #{order.orderId}

                        </Typography>

                    </Stack>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        mb={2}
                    >

                        <Typography>

                            Payment Method

                        </Typography>

                        <Typography>

                            {paymentMethod}

                        </Typography>

                    </Stack>

                    <Divider
                        sx={{ my: 2 }}
                    />

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >

                        <Typography
                            variant="h6"
                        >

                            Total

                        </Typography>

                        <Typography
                            variant="h6"
                            color="#FF7A00"
                            fontWeight="bold"
                        >

                            ₹{order.totalAmount}

                        </Typography>

                    </Stack>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 4,
                            py: 1.5,
                            bgcolor: "#008C95",
                            "&:hover": {
                                bgcolor: "#00757D"
                            }
                        }}
                        disabled={loading}
                        onClick={payNow}
                    >

                        {
                            loading
                                ? "Processing..."
                                : `Pay ₹${order.totalAmount}`
                        }

                    </Button>

                </CardContent>

            </Card>

        </Box>

    );

}