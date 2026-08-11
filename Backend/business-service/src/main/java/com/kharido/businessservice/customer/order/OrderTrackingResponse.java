package com.kharido.businessservice.customer.order;

import java.time.LocalDateTime;

public class OrderTrackingResponse {

    private Integer trackingId;
    private Integer orderId;
    private String status;
    private String locationName;
    private String city;
    private String state;
    private String description;
    private String updatedBy;
    private LocalDateTime timestamp;

    public OrderTrackingResponse() {
    }

    public OrderTrackingResponse(Integer trackingId, Integer orderId, String status, String locationName, String city, String state, String description, String updatedBy, LocalDateTime timestamp) {
        this.trackingId = trackingId;
        this.orderId = orderId;
        this.status = status;
        this.locationName = locationName;
        this.city = city;
        this.state = state;
        this.description = description;
        this.updatedBy = updatedBy;
        this.timestamp = timestamp;
    }

    public Integer getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(Integer trackingId) {
        this.trackingId = trackingId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
