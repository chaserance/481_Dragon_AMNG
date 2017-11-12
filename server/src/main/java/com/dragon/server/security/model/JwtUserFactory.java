package com.dragon.server.security.model;

import com.dragon.server.entity.Role;
import com.dragon.server.entity.User;
import com.dragon.server.security.model.token.JwtRawAccessToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class JwtUserFactory {

    public static JwtUser createDefault(User user) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getPassword(),
                user.getEnabled(),
                true,
                true,
                true,
                getAuthorities(user.getRoles())
        );
    }

    public static JwtUser create(
            User user,
            boolean enabled,
            boolean accountNonExpired,
            boolean credentialsNonExpired,
            boolean accountNonLocked
            ) {
        return new JwtUser(
                user.getId(),
                user.getUsername(),
                user.getFirstname(),
                user.getLastname(),
                user.getPassword(),
                enabled,
                accountNonExpired,
                credentialsNonExpired,
                accountNonLocked,
                getAuthorities(user.getRoles())
        );
    }

    private static Collection<? extends GrantedAuthority> getAuthorities(Collection<Role> roles) {
        return getGrantedAuthorities(roles);
    }

    private static Set<GrantedAuthority> getGrantedAuthorities(Collection<Role> roles) {
        Set<GrantedAuthority> authorities = new HashSet<>(roles);
        for(Role role : roles) {
            authorities.addAll(role.getPrivileges());
        }
        return authorities;
    }
}
