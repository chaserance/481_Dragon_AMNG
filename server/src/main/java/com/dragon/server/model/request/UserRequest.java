package com.dragon.server.model.request;

import com.dragon.server.common.validator.ValidEmail;
import com.dragon.server.common.validator.ValidPassword;
import com.dragon.server.common.validator.ValidPhoneNumber;
import com.dragon.server.entity.Address;

import javax.validation.constraints.NotNull;

public class UserRequest {

    @NotNull
    private String firstname;
    @NotNull
    private String lastname;
    @NotNull
    @ValidEmail
    private String email;
    @NotNull
    @ValidPassword
    private String password;
    @NotNull
    private Address address;

    @NotNull
    @ValidPhoneNumber
    private String phoneNumber;

    public UserRequest() {
    }

    public UserRequest(String firstname, String lastname, String email, String password, Address address, String phoneNumber) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
