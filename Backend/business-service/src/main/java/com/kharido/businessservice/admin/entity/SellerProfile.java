package com.kharido.businessservice.admin.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "seller_profiles")
public class SellerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sellerid")
    private Integer sellerId;

    @OneToOne
    @JoinColumn(name = "userid", nullable = false, unique = true)
    private User user;

    @Column(name = "shop_name", nullable = false)
    private String shopName;

    @Column(name = "gst_number")
    private String gstNumber;

    @Column(name = "phone")
    private String phone;

    @Column(name = "approval_status")
    private String approvalStatus;

    @Column(name = "approved_by")
    private Integer approvedBy;

    @Column(name = "approved_date")
    private LocalDateTime approvedDate;

    public SellerProfile() {
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getShopName() {
        return shopName;
    }

    public void setShopName(String shopName) {
        this.shopName = shopName;
    }

    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public Integer getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Integer approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovedDate() {
        return approvedDate;
    }

    public void setApprovedDate(LocalDateTime approvedDate) {
        this.approvedDate = approvedDate;
    }
}