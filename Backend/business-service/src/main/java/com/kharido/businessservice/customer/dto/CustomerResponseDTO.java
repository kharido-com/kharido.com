package com.kharido.businessservice.customer.dto;

import java.time.LocalDate;

import com.kharido.businessservice.common.enums.Gender;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponseDTO {

    private Integer customerId;
    private Integer userId;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private LocalDate dob;
    private LocalDateTime createdAt;
    private Gender gender;
}