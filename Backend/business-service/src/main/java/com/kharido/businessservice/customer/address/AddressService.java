package com.kharido.businessservice.customer.address;

import java.util.List;

public interface AddressService {

    AddressResponse addAddress(
            String username,
            AddAddressRequest request);

    List<AddressResponse> getAllAddresses(
            String username);

    AddressResponse getAddressById(
            String username,
            Integer addressId);

    AddressResponse updateAddress(
            String username,
            Integer addressId,
            AddAddressRequest request);

    String deleteAddress(
            String username,
            Integer addressId);

    AddressResponse setDefaultAddress(
            String username,
            Integer addressId);
}