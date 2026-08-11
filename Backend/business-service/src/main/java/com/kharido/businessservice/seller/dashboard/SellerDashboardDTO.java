package com.kharido.businessservice.seller.dashboard;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDashboardDTO {

    private String username;

    private String shopName;

    private Integer totalProducts;

    private Integer totalOrders;

    private Integer pendingOrders;

    private BigDecimal totalRevenue;

}