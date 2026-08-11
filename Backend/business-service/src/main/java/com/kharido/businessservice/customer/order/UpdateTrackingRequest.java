package com.kharido.businessservice.customer.order;

public class UpdateTrackingRequest {

    private String status;
    private String locationName;
    private String city;
    private String state;
    private String description;
    private String updatedBy;

    public UpdateTrackingRequest() {
    }

    public UpdateTrackingRequest(String status, String locationName, String city, String state, String description, String updatedBy) {
        this.status = status;
        this.locationName = locationName;
        this.city = city;
        this.state = state;
        this.description = description;
        this.updatedBy = updatedBy;
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
}
