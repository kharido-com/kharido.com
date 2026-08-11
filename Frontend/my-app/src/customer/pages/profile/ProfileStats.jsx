import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const cardStyle = {
    borderRadius: 4,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    transition: "0.3s",
    height: "100%",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
    }
};

export default function ProfileStats({

    totalOrders,
    totalSpent,
    wishlistCount,
    cartCount

}) {

    const stats = [

        {
            title: "Total Orders",
            value: totalOrders,
            color: "#00838F",
            icon: <ShoppingBagOutlinedIcon fontSize="large" />
        },

        {
            title: "Total Spent",
            value: `₹${totalSpent}`,
            color: "#EF6C00",
            icon: <CurrencyRupeeOutlinedIcon fontSize="large" />
        },

        {
            title: "Wishlist",
            value: wishlistCount,
            color: "#E91E63",
            icon: <FavoriteBorderOutlinedIcon fontSize="large" />
        },

        {
            title: "Cart",
            value: cartCount,
            color: "#43A047",
            icon: <ShoppingCartOutlinedIcon fontSize="large" />
        }

    ];

    return (

        <Grid
            container
            spacing={3}
            sx={{ mb: 4 }}
        >

            {stats.map((item) => (

                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    key={item.title}
                >

                    <Card sx={cardStyle}>

                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >

                                <div>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        fontWeight="bold"
                                        mt={1}
                                    >
                                        {item.value}
                                    </Typography>

                                </div>

                                <div
                                    style={{
                                        color: item.color
                                    }}
                                >
                                    {item.icon}
                                </div>

                            </Stack>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}