package com.kharido.businessservice.customer.cart;

public interface CartService {

    CartResponse addToCart(
            String username,
            AddToCartRequest request);

    CartResponse getCart(
            String username);

    CartResponse updateCartItem(
            String username,
            Integer cartItemId,
            UpdateCartRequest request);

    String removeCartItem(
            String username,
            Integer cartItemId);

    String clearCart(
            String username);
}