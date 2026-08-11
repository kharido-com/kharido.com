package com.kharido.businessservice.seller.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderitemid")
    private Integer orderItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orderid")
    private Order order;

    @Column(name = "productid")
    private Integer productId;

    @Column(name = "sellerid")
    private Integer sellerId;

    private Integer quantity;

    private BigDecimal price;

    private BigDecimal subtotal;
}