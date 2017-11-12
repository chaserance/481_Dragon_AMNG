package com.dragon.server.security.authentication.ajax;

import com.dragon.server.security.model.JwtUser;

import java.util.List;
import java.util.stream.Collectors;

public class LoginResponse {

    private String username;
    private String firstname;
    private String lastname;
    private List<String> scope;
    private String access_token;
    private String refresh_token;

    public LoginResponse() {
    }

    public LoginResponse(JwtUser user, String access_token, String refresh_token) {
        this.username = user.getUsername();
        this.firstname = user.getFirstname();
        this.lastname = user.getLastname();
        this.scope = user.getAuthorities().stream().map(auth -> auth.getAuthority()).filter(auth -> auth.startsWith("ROLE")).collect(Collectors.toList());
        this.access_token = access_token;
        this.refresh_token = refresh_token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public List<String> getScope() {
        return scope;
    }

    public void setScope(List<String> scope) {
        this.scope = scope;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public String getRefresh_token() {
        return refresh_token;
    }

    public void setRefresh_token(String refresh_token) {
        this.refresh_token = refresh_token;
    }
}
