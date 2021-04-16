package com.yidu.expressproject.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * (Address)实体类
 *
 * @author makejava
 * @since 2021-04-15 10:31:37
 */
@Component
public class Address implements Serializable {
    private static final long serialVersionUID = -52487951167160196L;
    
    private Integer addressId;
    
    private Integer customerId;
    
    private Integer addressState;
    
    private String addressPhone;
    
    private String addressName;
    
    private String postcode;
    
    private String province;
    
    private String city;
    
    private String district;
    
    private String street;
    
    private Integer state;

    public Address() {

    }

    public Address(Integer addressId, Integer customerId, Integer addressState, String addressPhone, String addressName, String postcode, String province, String city, String district, String street, Integer state) {
        this.addressId = addressId;
        this.customerId = customerId;
        this.addressState = addressState;
        this.addressPhone = addressPhone;
        this.addressName = addressName;
        this.postcode = postcode;
        this.province = province;
        this.city = city;
        this.district = district;
        this.street = street;
        this.state = state;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getAddressState() {
        return addressState;
    }

    public void setAddressState(Integer addressState) {
        this.addressState = addressState;
    }

    public String getAddressPhone() {
        return addressPhone;
    }

    public void setAddressPhone(String addressPhone) {
        this.addressPhone = addressPhone;
    }

    public String getAddressName() {
        return addressName;
    }

    public void setAddressName(String addressName) {
        this.addressName = addressName;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressId=" + addressId +
                ", customerId=" + customerId +
                ", addressState=" + addressState +
                ", addressPhone='" + addressPhone + '\'' +
                ", addressName='" + addressName + '\'' +
                ", postcode='" + postcode + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", district='" + district + '\'' +
                ", street='" + street + '\'' +
                ", state=" + state +
                '}';
    }
}