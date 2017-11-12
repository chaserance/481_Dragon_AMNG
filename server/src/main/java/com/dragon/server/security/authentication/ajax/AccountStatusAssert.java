package com.dragon.server.security.authentication.ajax;

import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;

public class AccountStatusAssert {

    public static void isValid(UserDetails user) throws AccountStatusException {
        if(!user.isEnabled()) {
            throw new DisabledException("Account is disabled");
        }
        if(!user.isAccountNonExpired()) {
            throw new AccountExpiredException("Account is expired");
        }
        if(!user.isAccountNonLocked()) {
            throw new LockedException("Account is locked");
        }
        if(!user.isCredentialsNonExpired()) {
            throw new CredentialsExpiredException("User credential is expired");
        }
    }

}
