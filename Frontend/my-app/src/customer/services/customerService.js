const API_GATEWAY_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE_URL = `${API_GATEWAY_URL}/api/customers`;

const customerService = {

    async getProfile() {

        const response = await fetch(
            `${BASE_URL}/profile`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch profile");
        }

        return await response.json();
    },

    async updateProfile(profile) {

        const response = await fetch(
            `${BASE_URL}/profile`,
            {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || "Unable to update profile");
        }

        return await response.json();
    }

};

export default customerService;