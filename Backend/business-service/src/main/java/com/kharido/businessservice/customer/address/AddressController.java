package com.kharido.businessservice.customer.address;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<AddressResponse> addAddress(
            Authentication authentication,
            @Valid @RequestBody AddAddressRequest request) {

        AddressResponse response = addressService.addAddress(
                authentication.getName(),
                request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AddressResponse>> getAllAddresses(
            Authentication authentication) {

        return ResponseEntity.ok(
                addressService.getAllAddresses(
                        authentication.getName()));
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressResponse> getAddressById(
            Authentication authentication,
            @PathVariable Integer addressId) {

        return ResponseEntity.ok(
                addressService.getAddressById(
                        authentication.getName(),
                        addressId));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<AddressResponse> updateAddress(
            Authentication authentication,
            @PathVariable Integer addressId,
            @Valid @RequestBody AddAddressRequest request) {

        return ResponseEntity.ok(
                addressService.updateAddress(
                        authentication.getName(),
                        addressId,
                        request));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<String> deleteAddress(
            Authentication authentication,
            @PathVariable Integer addressId) {

        return ResponseEntity.ok(
                addressService.deleteAddress(
                        authentication.getName(),
                        addressId));
    }

    @PatchMapping("/{addressId}/default")
    public ResponseEntity<AddressResponse> setDefaultAddress(
            Authentication authentication,
            @PathVariable Integer addressId) {

        return ResponseEntity.ok(
                addressService.setDefaultAddress(
                        authentication.getName(),
                        addressId));
    }
}