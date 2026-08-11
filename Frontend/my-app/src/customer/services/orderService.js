const API_GATEWAY_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE_URL = `${API_GATEWAY_URL}/api/orders`;

const orderService = {

    async getOrders() {

        const response = await fetch(BASE_URL, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Unable to fetch orders.");
        }

        return await response.json();
    },

    async placeOrder(addressId) {

        const response = await fetch(
            BASE_URL,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    addressId
                })
            }
        );

        if (!response.ok) {
            throw new Error("Unable to place order.");
        }

        return await response.json();
    },

    async getOrder(orderId) {

        const response = await fetch(`${BASE_URL}/${orderId}`, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Unable to fetch order.");
        }

        return await response.json();
    },

    async cancelOrder(orderId) {
        const response = await fetch(
            `${BASE_URL}/${orderId}/cancel`,
            {
                method: "PATCH",
                credentials: "include"
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || "Unable to cancel order.");
        }

        return await response.text();
    },

    async getOrderTracking(orderId) {

        try {
            const response = await fetch(`${BASE_URL}/${orderId}/tracking`, {
                method: "GET",
                credentials: "include"
            });

            if (!response.ok) {
                return [];
            }

            return await response.json();
        } catch (err) {
            console.error("Error fetching order tracking:", err);
            return [];
        }
    }

};

export default orderService;