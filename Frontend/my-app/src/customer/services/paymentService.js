const API_GATEWAY_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE_URL = `${API_GATEWAY_URL}/api/payments`;

const paymentService = {

    async makePayment(payment) {

        const response = await fetch(
            `${BASE_URL}/pay`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment)
            }
        );

        if (!response.ok) {
            throw new Error("Payment failed.");
        }

        return await response.json();
    },

    async getPaymentsByUser(userId) {

        const response = await fetch(
            `${BASE_URL}/user/${userId}`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch payments.");
        }

        return await response.json();
    },

    async getPaymentsByOrder(orderId) {

        const response = await fetch(
            `${BASE_URL}/order/${orderId}`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch payment.");
        }

        return await response.json();
    }

};

export default paymentService;