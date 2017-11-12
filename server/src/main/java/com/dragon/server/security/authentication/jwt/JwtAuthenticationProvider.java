package com.dragon.server.security.authentication.jwt;

import com.dragon.server.security.authentication.JwtAuthenticationToken;
import com.dragon.server.security.config.JwtSettings;
import com.dragon.server.security.model.JwtUser;
import com.dragon.server.security.model.token.JwtRawAccessToken;
import com.dragon.server.security.model.token.JwtTokenFactory;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
    private final JwtTokenFactory jwtTokenFactory;

    @Autowired
    public JwtAuthenticationProvider(JwtTokenFactory jwtTokenFactory) {
        this.jwtTokenFactory = jwtTokenFactory;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        JwtRawAccessToken rawAccessToken = (JwtRawAccessToken) authentication.getCredentials();

        JwtUser jwtUser = jwtTokenFactory.getJwtUserFromToken(rawAccessToken);

        return new JwtAuthenticationToken(jwtUser, jwtUser.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
