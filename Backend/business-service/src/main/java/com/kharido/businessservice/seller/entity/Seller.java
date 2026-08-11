package com.kharido.businessservice.seller.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seller_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sellerid")
    private Integer sellerId;

    @Column(name = "userid")
    private Integer userId;

    @Column(name = "shop_name")
    private String shopName;

    @Column(name = "gst_number")
    private String gstNumber;

    private String phone;

    @Column(name = "approval_status")
    private String approvalStatus;
}