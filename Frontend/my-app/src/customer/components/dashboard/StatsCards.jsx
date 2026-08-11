import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    Typography
} from "@mui/material";

import orderService from "../../services/orderService";
import { getCart } from "../../services/cartService";
import addressService from "../../services/addressService";

export default function StatsCards() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        orders: 0,
        cart: 0,
        addresses: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    async function loadStats() {

        try {

            const [
                orders,
                cart,
                addresses
            ] = await Promise.all([
                orderService.getOrders(),
                getCart(),
                addressService.getAllAddresses()
            ]);

            setStats({
                orders: orders.length,
                cart: cart.items ? cart.items.length : 0,
                addresses: addresses.length
            });

        }
        catch (error) {

            console.error(error);

        }

    }

    const cards = [
        {
            title: "Orders",
            value: stats.orders,
            color: "#0F8B8D",
            path: "/user/orders"
        },
        {
            title: "Wishlist",
            value: "Coming Soon",
            color: "#FF7A00",
            path: null
        },
        {
            title: "Cart",
            value: stats.cart,
            color: "#2E7D32",
            path: "/user/cart"
        },
        {
            title: "Addresses",
            value: stats.addresses,
            color: "#1565C0",
            path: "/user/address"
        }
    ];

    return (

        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: 3,
                mb: 5
            }}
        >

            {
                cards.map(card => (

                    <Card
                        key={card.title}
                        elevation={0}
                        onClick={() => {
                            if (card.path) {
                                navigate(card.path);
                            }
                        }}
                        sx={{
                            cursor: card.path ? "pointer" : "default",
                            borderRadius: 4,
                            border: "1px solid #ECECEC",
                            transition: ".3s",
                            "&:hover": {
                                transform: "translateY(-6px)",
                                boxShadow: "0 12px 25px rgba(0,0,0,.12)"
                            }
                        }}
                    >

                        <CardContent>

                            <Typography
                                color="text.secondary"
                                fontWeight={600}
                            >
                                {card.title}
                            </Typography>

                            <Typography
                                variant={
                                    card.title === "Wishlist"
                                        ? "h5"
                                        : "h3"
                                }
                                fontWeight="bold"
                                sx={{
                                    mt: 1,
                                    color: card.color
                                }}
                            >
                                {card.value}
                            </Typography>

                        </CardContent>

                    </Card>

                ))
            }

        </Box>

    );

}