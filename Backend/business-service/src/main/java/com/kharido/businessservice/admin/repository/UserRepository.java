package com.kharido.businessservice.admin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kharido.businessservice.admin.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByUsername(String username);


    List<User> findByRoleRoleName(String roleName);

}