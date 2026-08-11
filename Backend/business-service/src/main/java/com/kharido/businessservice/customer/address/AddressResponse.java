package com.kharido.businessservice.customer.address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponse {

    private Integer addressId;

    private String addressName;

    private String street;

    private String city;

    private String state;

    private String country;

    private String pincode;

    private Boolean isDefault;
}