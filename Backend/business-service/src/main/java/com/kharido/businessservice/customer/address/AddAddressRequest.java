package com.kharido.businessservice.customer.address;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddAddressRequest {

    @NotBlank(message = "Address name is required")
    @Size(max = 50)
    private String addressName;

    @NotBlank(message = "Street is required")
    @Size(max = 255)
    private String street;

    @NotBlank(message = "City is required")
    @Size(max = 100)
    private String city;

    @NotBlank(message = "State is required")
    @Size(max = 100)
    private String state;

    @NotBlank(message = "Country is required")
    @Size(max = 100)
    private String country;

    @NotBlank(message = "Pincode is required")
    @Size(max = 10)
    private String pincode;

    private Boolean isDefault = false;
}