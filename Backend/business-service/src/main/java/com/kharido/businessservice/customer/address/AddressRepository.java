package com.kharido.businessservice.customer.address;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.User;

public interface AddressRepository extends JpaRepository<Address, Integer> {

    List<Address> findByUser(User user);

    Optional<Address> findByAddressIdAndUser(Integer addressId, User user);

}