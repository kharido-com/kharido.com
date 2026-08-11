import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Chip
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import orderService from "../../services/orderService";

const STAGES = [
    { key: "ORDER_PLACED", label: "Order Placed" },
    { key: "PAYMENT_SUCCESSFUL", label: "Payment Success" },
    { key: "SELLER_ACCEPTED", label: "Seller Accepted" },
    { key: "PACKED", label: "Packed" },
    { key: "DISPATCHED", label: "Dispatched" },
    { key: "WAREHOUSE_RECEIVED", label: "Reached Warehouse" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
    { key: "DELIVERED", label: "Delivered" }
];

function getStageIndexFromStatus(statusStr) {
    if (!statusStr) return -1;
    const s = String(statusStr).toUpperCase().trim();
    if (s === "PLACED" || s === "ORDER_PLACED" || s === "PENDING_PAYMENT") return 0;
    if (s === "PAID" || s === "PAYMENT_SUCCESSFUL" || s === "PAYMENT_SUCCESS") return 1;
    if (s === "ACCEPTED" || s === "SELLER_ACCEPTED" || s === "APPROVED" || s === "PROCESSING") return 2;
    if (s === "PACKED") return 3;
    if (s === "DISPATCHED" || s === "SHIPPED" || s === "IN_TRANSIT") return 4;
    if (s === "WAREHOUSE" || s === "WAREHOUSE_RECEIVED" || s === "REACHED_WAREHOUSE") return 5;
    if (s === "OUT_FOR_DELIVERY") return 6;
    if (s === "DELIVERED" || s === "COMPLETED") return 7;
    return -1;
}

export default function OrderTrackingTimeline({ orderId, orderStatus }) {
    const [trackingEvents, setTrackingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            loadTracking();
        }
    }, [orderId]);

    async function loadTracking() {
        try {
            setLoading(true);
            const data = await orderService.getOrderTracking(orderId);
            setTrackingEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load tracking:", err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" py={4} sx={{ width: "100%" }}>
                <CircularProgress size={26} sx={{ color: "#00838F" }} />
            </Box>
        );
    }

    // Map backend records by status key
    const eventMap = {};
    trackingEvents.forEach((ev) => {
        if (ev && ev.status) {
            const raw = ev.status.toUpperCase();
            eventMap[raw] = ev;
            const normIdx = getStageIndexFromStatus(raw);
            if (normIdx >= 0 && normIdx < STAGES.length) {
                eventMap[STAGES[normIdx].key] = ev;
            }
        }
    });

    const orderStatusIdx = getStageIndexFromStatus(orderStatus);

    // Find highest completed stage index
    let highestCompletedIndex = -1;
    STAGES.forEach((stage, idx) => {
        if (eventMap[stage.key] || idx <= orderStatusIdx) {
            highestCompletedIndex = idx;
        }
    });

    const currentStageLabel = highestCompletedIndex >= 0 ? STAGES[highestCompletedIndex].label : "Order Placed";

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: "20px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(0, 131, 143, 0.05)",
                boxSizing: "border-box"
            }}
        >
            {/* Header with Title and Current Status Chip */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 2.5,
                    mb: 3,
                    borderBottom: "1px solid #F1F5F9"
                }}
            >
                <Typography variant="subtitle1" fontWeight={800} sx={{ color: "#0F172A", fontSize: "1.05rem" }}>
                    Live Order Tracking
                </Typography>

                <Chip
                    label={currentStageLabel}
                    size="small"
                    sx={{
                        bgcolor: "#E0F7F8",
                        color: "#00838F",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        borderRadius: "8px"
                    }}
                />
            </Box>

            {/* Timeline List */}
            <Box sx={{ position: "relative", pl: 0.5 }}>
                {STAGES.map((stage, index) => {
                    const record = eventMap[stage.key];
                    const isCompleted = record !== undefined || index <= orderStatusIdx;
                    const isCurrent = index === highestCompletedIndex;

                    let icon;
                    let iconColor;
                    let textColor = "#94A3B8";
                    let fontWeight = 500;

                    if (isCurrent) {
                        icon = <RadioButtonCheckedIcon sx={{ fontSize: 20 }} />;
                        iconColor = "#FF6B00";
                        textColor = "#FF6B00";
                        fontWeight = 800;
                    } else if (isCompleted) {
                        icon = <CheckCircleIcon sx={{ fontSize: 20 }} />;
                        iconColor = "#10B981";
                        textColor = "#0F172A";
                        fontWeight = 700;
                    } else {
                        icon = <RadioButtonUncheckedIcon sx={{ fontSize: 20 }} />;
                        iconColor = "#CBD5E1";
                    }

                    return (
                        <Box
                            key={stage.key}
                            sx={{
                                display: "flex",
                                gap: 2.5,
                                position: "relative",
                                pb: index === STAGES.length - 1 ? 0 : 3.2
                            }}
                        >
                            {/* Continuous Vertical Line */}
                            {index < STAGES.length - 1 && (
                                <Box
                                    sx={{
                                        position: "absolute",
                                        left: 11,
                                        top: 22,
                                        bottom: 0,
                                        width: 2,
                                        bgcolor: index < highestCompletedIndex ? "#10B981" : "#E2E8F0",
                                        zIndex: 1
                                    }}
                                />
                            )}

                            {/* Node Circle Box - Strictly 24px wide, centered */}
                            <Box
                                sx={{
                                    width: 24,
                                    minWidth: 24,
                                    height: 24,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: iconColor,
                                    zIndex: 2,
                                    bgcolor: "#FFFFFF"
                                }}
                            >
                                {icon}
                            </Box>

                            {/* Event Details */}
                            <Box sx={{ flex: 1 }}>
                                <Typography
                                    variant="body2"
                                    fontWeight={fontWeight}
                                    sx={{ color: textColor, fontSize: "0.925rem", lineHeight: 1.3 }}
                                >
                                    {stage.label}
                                </Typography>

                                {record && (
                                    <Box sx={{ mt: 0.6 }}>
                                        {(record.locationName || record.city || record.state) && (
                                            <Box sx={{ mb: 0.5 }}>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        display: "inline-block",
                                                        bgcolor: isCurrent ? "#FFF3E6" : "#E0F7F8",
                                                        color: isCurrent ? "#FF6B00" : "#00838F",
                                                        fontWeight: 600,
                                                        px: 1.2,
                                                        py: 0.4,
                                                        borderRadius: "6px",
                                                        fontSize: "0.75rem"
                                                    }}
                                                >
                                                    {record.locationName ? `${record.locationName} • ` : ""}
                                                    {record.city ? `${record.city}${record.state ? `, ${record.state}` : ""}` : ""}
                                                </Typography>
                                            </Box>
                                        )}

                                        {record.timestamp && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                                                <AccessTimeIcon sx={{ fontSize: 13, color: "#64748B" }} />
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: "#64748B", fontSize: "0.75rem", fontWeight: 500 }}
                                                >
                                                    {new Date(record.timestamp).toLocaleString([], {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit"
                                                    })}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
