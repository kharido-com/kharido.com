import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartCount, setCartCount] = useState(0);

    async function refreshCart() {

        try {

            const cart = await getCart();

            const count = cart.items.reduce(
                (total, item) => total + item.quantity,
                0
            );

            setCartCount(count);

        }

        catch {

            setCartCount(0);

        }

    }

    useEffect(() => {

        refreshCart();

    }, []);

    return (

        <CartContext.Provider
            value={{
                cartCount,
                refreshCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        return {
            cartCount: 0,
            refreshCart: () => { }
        };
    }
    return context;
}