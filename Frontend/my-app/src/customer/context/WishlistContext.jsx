import { createContext, useContext, useEffect, useState } from "react";
import {
    getWishlist,
    addToWishlist as apiAddToWishlist,
    removeFromWishlist as apiRemoveFromWishlist,
    getLocalWishlist
} from "../services/wishlistService";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState(getLocalWishlist());

    async function refreshWishlist() {
        const items = await getWishlist();
        setWishlistItems(items);
    }

    useEffect(() => {
        refreshWishlist();
    }, []);

    function isInWishlist(productId) {
        if (!productId) return false;
        return wishlistItems.some(
            (item) => String(item.id || item.productId || item.productid) === String(productId)
        );
    }

    async function toggleWishlist(product) {
        if (!product) return;
        const prodId = product.id || product.productId || product.productid;
        if (isInWishlist(prodId)) {
            const updated = await apiRemoveFromWishlist(prodId);
            setWishlistItems(updated ? [...updated] : []);
        } else {
            const updated = await apiAddToWishlist(product);
            setWishlistItems(updated ? [...updated] : []);
        }
    }

    async function addItemToWishlist(product) {
        const updated = await apiAddToWishlist(product);
        setWishlistItems(updated);
    }

    async function removeItemFromWishlist(productId) {
        const updated = await apiRemoveFromWishlist(productId);
        setWishlistItems(updated);
    }

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                wishlistCount: wishlistItems.length,
                isInWishlist,
                toggleWishlist,
                addItemToWishlist,
                removeItemFromWishlist,
                refreshWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        return {
            wishlistItems: [],
            wishlistCount: 0,
            isInWishlist: () => false,
            toggleWishlist: () => {},
            addItemToWishlist: () => {},
            removeItemFromWishlist: () => {},
            refreshWishlist: () => {}
        };
    }
    return context;
}
