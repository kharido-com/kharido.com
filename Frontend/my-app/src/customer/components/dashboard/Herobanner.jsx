import {
    Box,
    Button,
    Typography,
    Stack
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroBanner() {

    return (
        <Box
            sx={{
                background:
                    "linear-gradient(135deg,#008C95,#00AEB5)",
                borderRadius: 5,
                color: "white",
                px: 8,
                py: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                mb: 5
            }}
        >
            <Box
                sx={{
                    maxWidth: 600
                }}
            >
                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    Shop Smart.
                    <br />
                    Shop Kharido.
                </Typography>

                <Typography
                    sx={{
                        mt: 3,
                        mb: 4,
                        opacity: .9,
                        fontSize: 18
                    }}
                >
                    Discover thousands of products from trusted
                    sellers across Electronics, Fashion,
                    Gaming, Sports, Books and much more.

                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                >
                    <Button
                        variant="contained"
                        startIcon={<ShoppingBagOutlinedIcon />}
                        sx={{
                            bgcolor:"#FF7A00",
                            px:4,
                            py:1.4,
                            borderRadius:3,
                            "&:hover":{
                                bgcolor:"#EF6C00"
                            }
                        }}
                    >
                        Shop Now
                    </Button>

                    <Button
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            color:"white",
                            borderColor:"white",
                            px:4,
                            py:1.4,
                            borderRadius:3,
                            "&:hover":{
                                borderColor:"white",
                                bgcolor:"rgba(255,255,255,.08)"
                            }
                        }}
                    >
                        Explore
                    </Button>
                </Stack>
            </Box>

            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    fontSize: 180
                }}
            >
                🛍️
            </Box>
        </Box>
    );
}