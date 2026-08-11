package com.kharido.businessservice.customer.address;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.repository.UserRepository;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public AddressServiceImpl(
            UserRepository userRepository,
            AddressRepository addressRepository) {

        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Override
    public AddressResponse addAddress(
            String username,
            AddAddressRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Address> addresses =
                addressRepository.findByUser(user);

        if (addresses.isEmpty()) {
            request.setIsDefault(true);
        }

        if (Boolean.TRUE.equals(request.getIsDefault())) {

            for (Address address : addresses) {
                address.setIsDefault(false);
            }

            addressRepository.saveAll(addresses);
        }

        Address address = Address.builder()
                .user(user)
                .addressName(request.getAddressName())
                .street(request.getStreet())
                .city(request.getCity())
                .state(request.getState())
                .country(request.getCountry())
                .pincode(request.getPincode())
                .isDefault(request.getIsDefault())
                .build();

        Address savedAddress =
                addressRepository.save(address);

        return mapToResponse(savedAddress);
    }

    @Override
    public List<AddressResponse> getAllAddresses(
            String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Address> addresses =
                addressRepository.findByUser(user);

        return addresses.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AddressResponse getAddressById(
            String username,
            Integer addressId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository
                .findByAddressIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new RuntimeException("Address not found"));

        return mapToResponse(address);
    }
    @Override
    public AddressResponse updateAddress(
            String username,
            Integer addressId,
            AddAddressRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository
                .findByAddressIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new RuntimeException("Address not found"));

        if (Boolean.TRUE.equals(request.getIsDefault())) {

            List<Address> addresses =
                    addressRepository.findByUser(user);

            for (Address a : addresses) {
                a.setIsDefault(false);
            }

            addressRepository.saveAll(addresses);

            address.setIsDefault(true);

        } else {

            address.setIsDefault(false);
        }

        address.setAddressName(request.getAddressName());
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setCountry(request.getCountry());
        address.setPincode(request.getPincode());

        Address updatedAddress =
                addressRepository.save(address);

        return mapToResponse(updatedAddress);
    }

    @Override
    public String deleteAddress(
            String username,
            Integer addressId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Address address = addressRepository
                .findByAddressIdAndUser(addressId, user)
                .orElseThrow(() ->
                        new RuntimeException("Address not found"));

        if (Boolean.TRUE.equals(address.getIsDefault())) {

            throw new RuntimeException(
                    "Default address cannot be deleted. Set another address as default first.");
        }

        try {

            addressRepository.delete(address);

            addressRepository.flush();

            return "Address deleted successfully.";

        } catch (Exception e) {

            throw new RuntimeException(
                    "This address is associated with an existing order and cannot be deleted.");
        }
    }

    @Override
    public AddressResponse setDefaultAddress(
            String username,
            Integer addressId) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        List<Address> addresses =
                addressRepository.findByUser(user);

        Address defaultAddress = null;

        for (Address address : addresses) {

            if (address.getAddressId().equals(addressId)) {

                address.setIsDefault(true);

                defaultAddress = address;

            } else {

                address.setIsDefault(false);
            }
        }

        if (defaultAddress == null) {

            throw new RuntimeException("Address not found");
        }

        addressRepository.saveAll(addresses);

        return mapToResponse(defaultAddress);
    }

    private AddressResponse mapToResponse(
            Address address) {

        AddressResponse response =
                new AddressResponse();

        response.setAddressId(address.getAddressId());
        response.setAddressName(address.getAddressName());
        response.setStreet(address.getStreet());
        response.setCity(address.getCity());
        response.setState(address.getState());
        response.setCountry(address.getCountry());
        response.setPincode(address.getPincode());
        response.setIsDefault(address.getIsDefault());

        return response;
    }
}