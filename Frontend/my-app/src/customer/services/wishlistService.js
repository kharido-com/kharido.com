import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const WISHLIST_API = `${BASE_URL}/api/wishlist`;

export function getWishlistStorageKey() {
    try {
        const storedAuth = JSON.parse(localStorage.getItem("auth") || "{}");
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        const user = storedAuth?.user || storedUser;
        const identifier = user?.userId || user?.id || user?.customerId || user?.email || user?.username || localStorage.getItem("username");
        if (identifier) {
            return `kharido_wishlist_items_${identifier}`;
        }
    } catch {
        // Fallback
    }
    return "kharido_wishlist_items";
}

export function getLocalWishlist() {
    try {
        const key = getWishlistStorageKey();
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveLocalWishlist(items) {
    try {
        const key = getWishlistStorageKey();
        localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        console.error("Error saving wishlist to localStorage:", e);
    }
}

export async function getWishlist() {
    try {
        const response = await axios.get(WISHLIST_API, { withCredentials: true });
        if (response.data && Array.isArray(response.data)) {
            saveLocalWishlist(response.data);
            return response.data;
        }
    } catch {
        // Fallback to local storage if API is offline or not implemented yet
    }
    return getLocalWishlist();
}

export async function addToWishlist(product) {
    let current = getLocalWishlist();
    const prodId = product.id || product.productId || product.productid;
    const exists = current.some((item) => String(item.id || item.productId || item.productid) === String(prodId));
    if (!exists) {
        current = [...current, product];
        saveLocalWishlist(current);
    }

    try {
        await axios.post(
            `${WISHLIST_API}/items`,
            { productId: prodId },
            { withCredentials: true }
        );
    } catch {
        // Fallback handled via localStorage
    }

    return current;
}

export async function removeFromWishlist(productId) {
    let current = getLocalWishlist();
    current = current.filter((item) => String(item.id || item.productId || item.productid) !== String(productId));
    saveLocalWishlist(current);

    try {
        await axios.delete(`${WISHLIST_API}/items/${productId}`, { withCredentials: true });
    } catch {
        // Fallback handled via localStorage
    }

    return current;
}

export async function clearWishlist() {
    saveLocalWishlist([]);
    try {
        await axios.delete(WISHLIST_API, { withCredentials: true });
    } catch {
        // Fallback handled
    }
    return [];
}
