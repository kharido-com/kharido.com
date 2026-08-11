package com.kharido.businessservice.customer.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kharido.businessservice.common.entity.User;
import com.kharido.businessservice.common.enums.AccountStatus;
import com.kharido.businessservice.common.repository.UserRepository;
import com.kharido.businessservice.customer.dto.CustomerResponseDTO;
import com.kharido.businessservice.customer.dto.UpdateCustomerRequest;
import com.kharido.businessservice.customer.entity.CustomerProfile;
import com.kharido.businessservice.customer.repository.CustomerProfileRepository;
import com.kharido.businessservice.customer.service.CustomerService;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final UserRepository userRepository;
    private final CustomerProfileRepository customerProfileRepository;

    public CustomerServiceImpl(UserRepository userRepository,
                               CustomerProfileRepository customerProfileRepository) {
        this.userRepository = userRepository;
        this.customerProfileRepository = customerProfileRepository;
    }

    @Override
    public CustomerResponseDTO getCustomerProfile(String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CustomerProfile customer = customerProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Customer profile not found"));

        return mapToResponse(user, customer);
    }

    @Override
    public CustomerResponseDTO updateCustomerProfile(
            String username,
            UpdateCustomerRequest request) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CustomerProfile customer = customerProfileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Customer profile not found"));

        // Validate phone number
        if (request.getPhone() == null ||
                !request.getPhone().matches("^[0-9]{10}$")) {

            throw new IllegalArgumentException(
                    "Phone number must contain exactly 10 digits");
        }

        // Check duplicate phone
        if (customerProfileRepository.existsByPhoneAndCustomerIdNot(
                request.getPhone(), customer.getCustomerId())) {

            throw new IllegalArgumentException(
                    "Mobile number is already registered.");
        }

        customer.setFirstName(request.getFirstName());
        customer.setLastName(request.getLastName());
        customer.setPhone(request.getPhone());
        customer.setDob(request.getDob());
        customer.setGender(request.getGender());

        CustomerProfile updatedCustomer =
                customerProfileRepository.save(customer);

        return mapToResponse(user, updatedCustomer);
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {

        List<CustomerProfile> customers = customerProfileRepository.findAll();

        return customers.stream()
                .map(customer -> mapToResponse(customer.getUser(), customer))
                .collect(Collectors.toList());
    }

    private CustomerResponseDTO mapToResponse(User user, CustomerProfile customer) {

        CustomerResponseDTO response = new CustomerResponseDTO();

        response.setCustomerId(customer.getCustomerId());
        response.setUserId(user.getUserId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFirstName(customer.getFirstName());
        response.setLastName(customer.getLastName());
        response.setPhone(customer.getPhone());
        response.setDob(customer.getDob());
        response.setGender(customer.getGender());
        response.setCreatedAt(user.getCreatedAt());

        return response;
    }
    
    @Override
    public String deleteCustomer(Integer customerId) {

        CustomerProfile customer = customerProfileRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User user = customer.getUser();

        user.setStatus(AccountStatus.INACTIVE);

        userRepository.save(user);

        return "Customer account deactivated successfully.";
    }
}