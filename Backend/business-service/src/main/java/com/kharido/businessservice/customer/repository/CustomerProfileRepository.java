package com.kharido.businessservice.customer.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.customer.entity.CustomerProfile;

public interface CustomerProfileRepository
        extends JpaRepository<CustomerProfile, Integer> {

    Optional<CustomerProfile> findByUser(User user);

    Optional<CustomerProfile> findByPhone(String phone);

    boolean existsByPhoneAndCustomerIdNot(String phone, Integer customerId);
}