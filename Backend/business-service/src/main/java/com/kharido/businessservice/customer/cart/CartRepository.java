package com.kharido.businessservice.customer.cart;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.common.entity.User;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    Optional<Cart> findByUser(User user);

}