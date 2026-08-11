import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const CART_API = `${BASE_URL}/api/cart`;

export async function addToCart(productId, quantity = 1) {

    const response = await axios.post(
        `${CART_API}/items`,
        {
            productId,
            quantity
        },
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function getCart() {

    const response = await axios.get(
        CART_API,
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function updateCartItem(cartItemId, quantity) {

    const response = await axios.put(
        `${CART_API}/items/${cartItemId}`,
        {
            quantity
        },
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function removeCartItem(cartItemId) {

    const response = await axios.delete(
        `${CART_API}/items/${cartItemId}`,
        {
            withCredentials: true
        }
    );

    return response.data;
}

export async function clearCart() {

    const response = await axios.delete(
        CART_API,
        {
            withCredentials: true
        }
    );

    return response.data;
}