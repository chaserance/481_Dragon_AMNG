package com.dragon.server.security.model.token;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.jsonwebtoken.Claims;

public class JwtAccessToken implements JwtToken {

    private final String rawToken;
    @JsonIgnore
    private Claims claims;

    protected JwtAccessToken(final String token, Claims claims) {
        this.rawToken = token;
        this.claims = claims;
    }

    @Override
    public String getToken() {
        return this.rawToken;
    }

    public Claims getClaims() {
        return claims;
    }
}
