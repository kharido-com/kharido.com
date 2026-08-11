package com.kharido.businessservice.customer.cart;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/items")
    public ResponseEntity<CartResponse> addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {

        return new ResponseEntity<>(
                cartService.addToCart(
                        authentication.getName(),
                        request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart(
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.getCart(
                        authentication.getName()));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(
            Authentication authentication,
            @PathVariable Integer cartItemId,
            @Valid @RequestBody UpdateCartRequest request) {

        return ResponseEntity.ok(
                cartService.updateCartItem(
                        authentication.getName(),
                        cartItemId,
                        request));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<String> removeCartItem(
            Authentication authentication,
            @PathVariable Integer cartItemId) {

        return ResponseEntity.ok(
                cartService.removeCartItem(
                        authentication.getName(),
                        cartItemId));
    }

    @DeleteMapping
    public ResponseEntity<String> clearCart(
            Authentication authentication) {

        return ResponseEntity.ok(
                cartService.clearCart(
                        authentication.getName()));
    }
}