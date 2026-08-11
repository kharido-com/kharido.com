import { useEffect, useState } from "react";

import orderService from "../services/orderService";
import OrderTrackingTimeline from "../components/order/OrderTrackingTimeline";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

function isOrderCancellable(status) {
    if (!status) return false;
    const s = String(status).toUpperCase().trim();
    const nonCancellable = [
        "DELIVERED",
        "SHIPPED",
        "DISPATCHED",
        "CANCELLED",
        "PACKED",
        "OUT_FOR_DELIVERY",
        "COMPLETED"
    ];
    return !nonCancellable.includes(s);
}

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        try {

            const data =
                await orderService.getOrders();

            const sortedOrders = Array.isArray(data)
                ? [...data].sort((a, b) => {
                    const dateDiff = new Date(b.orderDate || 0) - new Date(a.orderDate || 0);
                    if (dateDiff !== 0) return dateDiff;
                    return (b.orderId || 0) - (a.orderId || 0);
                })
                : [];

            setOrders(sortedOrders);

        }

        catch (error) {

            console.error(error);

            setMessage(
                "Unable to load orders."
            );

        }

        finally {

            setLoading(false);

        }

    }

    async function cancelOrder(orderId) {

        if (!window.confirm(
            "Cancel this order?"
        )) {

            return;

        }

        try {

            await orderService.cancelOrder(
                orderId
            );

            loadOrders();

        }

        catch (error) {

            console.error(error);

            alert("Unable to cancel order.");

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

    if (orders.length === 0) {

        return (

            <Alert severity="info">

                No Orders Found.

            </Alert>

        );

    }

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={4}
            >
                My Orders
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
                orders.map(order => (

                    <Card
                        key={order.orderId}
                        id={`order-${order.orderId}`}
                        sx={{
                            mb: 4,
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                            border: "1px solid #E5E7EB"
                        }}
                    >

                        <CardContent sx={{ p: 3 }}>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                flexWrap="wrap"
                                mb={2}
                            >

                                <Box>

                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                    >
                                        Order #{order.orderId}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                    >
                                        {
                                            new Date(
                                                order.orderDate
                                            ).toLocaleString()
                                        }
                                    </Typography>

                                </Box>

                                <Stack
                                    direction="row"
                                    spacing={2}
                                >

                                    <Chip
                                        label={order.orderStatus}
                                        color={
                                            order.orderStatus === "PLACED"
                                                ? "success"
                                                : "error"
                                        }
                                    />

                                    <Chip
                                        label={order.paymentStatus}
                                        color="warning"
                                    />

                                </Stack>

                            </Stack>

                            <Divider sx={{ mb: 3 }} />

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "45% 55%" },
                                    gap: "32px",
                                    alignItems: "start",
                                    width: "100%"
                                }}
                            >
                                {/* Left Side: Order Details (45% width) */}
                                <Box sx={{ width: "100%" }}>

                                    <Typography
                                        fontWeight="bold"
                                        mb={1}
                                    >
                                        Delivery Address
                                    </Typography>

                                    {order.address && (
                                        <>
                                            <Typography>
                                                {order.address.addressName}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                {order.address.street}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                {order.address.city}, {order.address.state}
                                            </Typography>

                                            <Typography color="text.secondary">
                                                {order.address.country} - {order.address.pincode}
                                            </Typography>
                                        </>
                                    )}

                                    <Divider sx={{ my: 3 }} />

                                    <Typography
                                        fontWeight="bold"
                                        mb={2}
                                    >
                                        Ordered Items
                                    </Typography>

                                    {
                                        order.items && order.items.map(item => (

                                            <Stack
                                                key={item.orderItemId || item.productId}
                                                direction="row"
                                                justifyContent="space-between"
                                                sx={{ mb: 2 }}
                                            >

                                                <Box>

                                                    <Typography fontWeight={500}>
                                                        {item.productName}
                                                    </Typography>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Qty : {item.quantity}
                                                    </Typography>

                                                </Box>

                                                <Typography
                                                    fontWeight="bold"
                                                >
                                                    ₹{item.subtotal}
                                                </Typography>

                                            </Stack>

                                        ))
                                    }

                                    <Divider sx={{ my: 3 }} />

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <Typography
                                            variant="h5"
                                            color="#FF7A00"
                                            fontWeight="bold"
                                        >
                                            ₹{order.totalAmount}
                                        </Typography>

                                        {
                                            isOrderCancellable(order.orderStatus) && (
                                                <Button
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        cancelOrder(
                                                            order.orderId
                                                        )
                                                    }
                                                >
                                                    Cancel Order
                                                </Button>
                                            )
                                        }

                                    </Stack>
                                </Box>

                                {/* Right Side: Live Order Tracking Timeline (55% width) */}
                                <Box sx={{ width: "100%" }}>
                                    <OrderTrackingTimeline orderId={order.orderId} orderStatus={order.orderStatus} />
                                </Box>
                            </Box>

                        </CardContent>

                    </Card>
                ))
            }

        </Box>

    );

}