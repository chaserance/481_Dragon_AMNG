package com.dragon.server.security.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class JwtUser implements UserDetails {

    private final Long userId;
    private final String username;
    private final String firstname;
    private final String lastname;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;
    private final boolean accountNonExpired;
    private final boolean accountNonLocked;
    private final boolean credentialsNonExpired;
    private final boolean enabled;


    public JwtUser(
            Long userId,
            String username,
            String firstname,
            String lastname,
            String password,
            Collection<? extends GrantedAuthority> authorities) {
        this(
                userId,
                username,
                firstname,
                lastname,
                password,
                true,
                true,
                true,
                true,
                authorities)
        ;
    }

    public JwtUser(
            Long userId,
            String username,
            String firstname,
            String lastname,
            String password,
            boolean enabled,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities) {

        if (username != null && !"".equals(username) && password != null) {
            this.userId = userId;
            this.username = username;
            this.firstname = firstname;
            this.lastname = lastname;
            this.password = password;
            this.enabled = enabled;
            this.accountNonExpired = accountNonExpired;
            this.credentialsNonExpired = credentialsNonExpired;
            this.accountNonLocked = accountNonLocked;
            this.authorities = authorities;
        } else {
            throw new IllegalArgumentException("Null/Empty is not allowed");
        }
    }

    public Long getUserId() {
        return userId;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
