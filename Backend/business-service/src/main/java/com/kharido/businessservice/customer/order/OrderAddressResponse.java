package com.kharido.businessservice.customer.order;

import lombok.Data;

@Data
public class OrderAddressResponse {

    private Integer addressId;

    private String addressName;

    private String street;

    private String city;

    private String state;

    private String country;

    private String pincode;

}