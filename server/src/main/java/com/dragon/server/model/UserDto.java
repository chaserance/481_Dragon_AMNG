package com.dragon.server.model;

import com.dragon.server.entity.Address;
import com.dragon.server.entity.User;

public class UserDto {

    private String password;

    private String phoneNumber;

    private Address address;

    public UserDto() {
    }

    public User getUpdatedUser(User user) {
        return user;
    }
}
