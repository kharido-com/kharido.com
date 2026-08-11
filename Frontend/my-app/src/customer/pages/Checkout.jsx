import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Paper,
    Radio,
    Stack,
    Typography
} from "@mui/material";

import {
    getCart
} from "../services/cartService";

import addressService from "../services/addressService";
import orderService from "../services/orderService";

export default function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState(null);

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [loading, setLoading] = useState(true);

    const [placingOrder, setPlacingOrder] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const cartData =
                await getCart();

            const addressData =
                await addressService.getAllAddresses();

            setCart(cartData);

            setAddresses(addressData);

            const defaultAddress =
                addressData.find(
                    address => address.isDefault
                );

            if (defaultAddress) {

                setSelectedAddress(
                    defaultAddress.addressId
                );

            }

            else if (addressData.length > 0) {

                setSelectedAddress(
                    addressData[0].addressId
                );

            }

        }

        catch (error) {

            console.error(error);

            setMessage(
                "Unable to load checkout."
            );

        }

        finally {

            setLoading(false);

        }

    }

    async function placeOrder() {

        if (!selectedAddress) {

            setMessage(
                "Please select an address."
            );

            return;
        }

        try {

            setPlacingOrder(true);

            const order =
                await orderService.placeOrder(
                    selectedAddress
                );

            navigate(
                `/user/payment/${order.orderId}`,
                {
                    state: {
                        order
                    }
                }
            );

        }

        catch (error) {
            console.error(error);
            setMessage(
                "Unable to place order."
            );
        }
        finally {
            setPlacingOrder(false);
        }

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={5}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    lg: "2fr 1fr"
                },
                gap: 4
            }}
        >

            <Box>

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mb={3}
                >
                    Delivery Address
                </Typography>

                {
                    message &&
                    <Alert
                        severity="error"
                        sx={{ mb: 3 }}
                    >
                        {message}
                    </Alert>
                }

                {
                    addresses.map(address => (

                        <Card
                            key={address.addressId}
                            sx={{
                                mb: 2,
                                border:
                                    selectedAddress === address.addressId
                                        ? "2px solid #008C95"
                                        : "1px solid #E5E5E5",
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                setSelectedAddress(
                                    address.addressId
                                )
                            }
                        >

                            <CardContent>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="flex-start"
                                >

                                    <Radio
                                        checked={
                                            selectedAddress === address.addressId
                                        }
                                    />

                                    <Box>

                                        <Typography
                                            fontWeight="bold"
                                        >
                                            {address.addressName}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                        >
                                            {address.street}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                        >
                                            {address.city},{" "}
                                            {address.state}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                        >
                                            {address.country} - {address.pincode}
                                        </Typography>

                                    </Box>

                                </Stack>

                            </CardContent>

                        </Card>

                    ))
                }

                <Typography
                    variant="h5"
                    fontWeight="bold"
                    mt={5}
                    mb={3}
                >
                    Order Items
                </Typography>

                {
                    cart.items.map(item => (

                        <Card
                            key={item.cartItemId}
                            sx={{ mb: 2 }}
                        >

                            <CardContent>

                                <Box
                                    display="flex"
                                    gap={3}
                                    alignItems="center"
                                >

                                    <Box
                                        component="img"
                                        src={
                                            item.imageUrl ||
                                            "https://placehold.co/150x150?text=No+Image"
                                        }
                                        alt={item.productName}
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            objectFit: "cover",
                                            borderRadius: 2
                                        }}
                                    />

                                    <Box flex={1}>

                                        <Typography
                                            variant="h6"
                                        >
                                            {item.productName}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                        >
                                            {item.brand}
                                        </Typography>

                                        <Typography mt={1}>
                                            Quantity : {item.quantity}
                                        </Typography>

                                        <Typography
                                            mt={1}
                                            fontWeight="bold"
                                        >
                                            ₹{item.subtotal}
                                        </Typography>

                                    </Box>

                                </Box>

                            </CardContent>

                        </Card>

                    ))
                }

            </Box>

            <Paper
                sx={{
                    p: 4,
                    height: "fit-content",
                    position: "sticky",
                    top: 95,
                    borderRadius: 3
                }}
            >

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
                        Items
                    </Typography>

                    <Typography>
                        {cart.items.length}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={2}
                >
                    <Typography>
                        Total
                    </Typography>

                    <Typography
                        fontWeight="bold"
                    >
                        ₹{cart.totalAmount}
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    mb={3}
                >
                    <Typography
                        variant="h6"
                    >
                        Grand Total
                    </Typography>

                    <Typography
                        variant="h6"
                        color="#FF7A00"
                        fontWeight="bold"
                    >
                        ₹{cart.totalAmount}
                    </Typography>
                </Stack>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={placingOrder}
                    onClick={placeOrder}
                    sx={{
                        bgcolor: "#008C95",
                        py: 1.5,
                        "&:hover": {
                            bgcolor: "#00757D"
                        }
                    }}
                >
                    {
                        placingOrder
                            ? "Placing Order..."
                            : "Place Order"
                    }
                </Button>

            </Paper>

        </Box>

    );

}