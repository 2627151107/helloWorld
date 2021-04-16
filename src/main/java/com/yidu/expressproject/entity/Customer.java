package com.yidu.expressproject.entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * (Customer)实体类
 *
 * @author makejava
 * @since 2021-04-12 14:26:42
 */
@Component
public class Customer implements Serializable {
    private static final long serialVersionUID = 661491938080369014L;

    private Integer customerId;

    private String customerEmail;

    private String customerPhone;

    private String customerPassword;

    private String customerNickname;

    private String customerSex;

    private String customerBirthday;

    private String customerPhoto;

    private Integer customerState;

    public Customer() {

    }

    public Customer(Integer customerId, String customerEmail, String customerPhone, String customerPassword, String customerNickname, String customerSex, String customerBirthday, String customerPhoto, Integer customerState) {
        this.customerId = customerId;
        this.customerEmail = customerEmail;
        this.customerPhone = customerPhone;
        this.customerPassword = customerPassword;
        this.customerNickname = customerNickname;
        this.customerSex = customerSex;
        this.customerBirthday = customerBirthday;
        this.customerPhoto = customerPhoto;
        this.customerState = customerState;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCustomerPassword() {
        return customerPassword;
    }

    public void setCustomerPassword(String customerPassword) {
        this.customerPassword = customerPassword;
    }

    public String getCustomerNickname() {
        return customerNickname;
    }

    public void setCustomerNickname(String customerNickname) {
        this.customerNickname = customerNickname;
    }

    public String getCustomerSex() {
        return customerSex;
    }

    public void setCustomerSex(String customerSex) {
        this.customerSex = customerSex;
    }

    public String getCustomerBirthday() {
        return customerBirthday;
    }

    public void setCustomerBirthday(String customerBirthday) {
        this.customerBirthday = customerBirthday;
    }

    public String getCustomerPhoto() {
        return customerPhoto;
    }

    public void setCustomerPhoto(String customerPhoto) {
        this.customerPhoto = customerPhoto;
    }

    public Integer getCustomerState() {
        return customerState;
    }

    public void setCustomerState(Integer customerState) {
        this.customerState = customerState;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerId=" + customerId +
                ", customerEmail='" + customerEmail + '\'' +
                ", customerPhone='" + customerPhone + '\'' +
                ", customerPassword='" + customerPassword + '\'' +
                ", customerNickname='" + customerNickname + '\'' +
                ", customerSex='" + customerSex + '\'' +
                ", customerBirthday='" + customerBirthday + '\'' +
                ", customerPhoto='" + customerPhoto + '\'' +
                ", customerState=" + customerState +
                '}';
    }
}
