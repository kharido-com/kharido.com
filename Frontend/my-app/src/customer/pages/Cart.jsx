import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart as clearCartService
} from "../services/cartService";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Cart() {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const { refreshCart } = useCart();

    useEffect(() => {
        loadCart();
    }, []);

    async function loadCart() {

        try {

            const data = await getCart();

            setCart(data);

        }
        catch {

            setMessage("Unable to load cart.");

        }
        finally {

            setLoading(false);

        }

    }

    async function increase(item) {

        await updateCartItem(
            item.cartItemId,
            item.quantity + 1
        );

        await refreshCart();

        loadCart();

    }

    async function decrease(item) {

        if (item.quantity === 1) {

            remove(item.cartItemId);

            return;

        }

        await updateCartItem(
            item.cartItemId,
            item.quantity - 1
        );

        await refreshCart();

        loadCart();

    }

    async function remove(cartItemId) {

        await removeCartItem(cartItemId);

        await refreshCart();

        loadCart();

    }

    async function clearCart() {

        if (!window.confirm("Clear Cart?")) {

            return;

        }

        await clearCartService();

        await refreshCart();

        loadCart();

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
                maxWidth: 950,
                mx: "auto",
                mt: 3
            }}
        >

            <Typography
                variant="h4"
                mb={3}
                fontWeight="bold"
            >

                <ShoppingCartIcon sx={{ mr: 1 }} />

                My Cart

            </Typography>

            {message && (

                <Alert sx={{ mb: 2 }}>

                    {message}

                </Alert>

            )}

            {cart?.items?.length === 0 ? (

                <Alert severity="info">

                    Your cart is empty.

                </Alert>

            ) : (

                cart.items.map(item => (

                    <Card
                        key={item.cartItemId}
                        sx={{
                            mb: 3,
                            borderRadius: 3
                        }}
                    >

                        <CardContent>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    alignItems: "center"
                                }}
                            >

                                <Box
                                    component="img"
                                    src={
                                        item.imageUrl ||
                                        "https://placehold.co/200x200?text=No+Image"
                                    }
                                    alt={item.productName}
                                    sx={{
                                        width: 180,
                                        height: 180,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                        border: "1px solid #ECECEC",
                                        flexShrink: 0
                                    }}
                                />

                                <Box
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        minHeight: 180
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >

                                            {item.productName}

                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            mt={1}
                                        >

                                            {item.brand}

                                        </Typography>

                                        <Typography mt={2}>

                                            Price : ₹{item.price}

                                        </Typography>

                                    </Box>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt={3}
                                    >

                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >

                                            <IconButton
                                                onClick={() => decrease(item)}
                                            >

                                                <RemoveIcon />

                                            </IconButton>

                                            <Typography
                                                fontWeight="bold"
                                            >

                                                {item.quantity}

                                            </Typography>

                                            <IconButton
                                                onClick={() => increase(item)}
                                            >

                                                <AddIcon />

                                            </IconButton>

                                        </Stack>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            color="#FF7A00"
                                        >

                                            ₹{item.subtotal}

                                        </Typography>

                                    </Stack>

                                    <Divider sx={{ my: 2 }} />

                                    <Button
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => remove(item.cartItemId)}
                                        sx={{
                                            width: "fit-content"
                                        }}
                                    >

                                        Remove

                                    </Button>

                                </Box>

                            </Box>

                        </CardContent>

                    </Card>

                ))

            )}

            {cart?.items?.length > 0 && (

                <Paper
                    sx={{
                        p: 3,
                        mt: 4,
                        borderRadius: 3
                    }}
                >

                    <Typography variant="h6">

                        Total Items : {cart.items.length}

                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        mt={2}
                        color="#FF7A00"
                    >

                        ₹{cart.totalAmount}

                    </Typography>

                    <Box
                        mt={3}
                        display="flex"
                        gap={2}
                    >

                        <Button
                            color="error"
                            variant="outlined"
                            onClick={clearCart}
                        >

                            Clear Cart

                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => navigate("/user/checkout")}
                            sx={{
                                bgcolor: "#008C95",
                                "&:hover": {
                                    bgcolor: "#00757D"
                                }
                            }}
                        >

                            Checkout

                        </Button>

                    </Box>

                </Paper>

            )}

        </Box>

    );

}