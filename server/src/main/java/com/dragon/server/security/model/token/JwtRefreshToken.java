package com.dragon.server.security.model.token;

import com.dragon.server.security.model.Scopes;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

import java.util.List;
import java.util.Optional;

//@SuppressWarnings("unchecked")
public class JwtRefreshToken implements JwtToken {

    private Jws<Claims> claims;

    private JwtRefreshToken(Jws<Claims> claims) {
        this.claims = claims;
    }

    public static Optional<JwtRefreshToken> create(JwtRawAccessToken token, String signingKey) {
        Jws<Claims> claims = token.parseClaims(signingKey);

        List<String> scopes = claims.getBody().get(JwtTokenFactory.CLAIM_KEY_AUTHORITIES, List.class);
        if (scopes == null || scopes.isEmpty()
                || !scopes.stream().filter(scope -> Scopes.REFRESH_TOKEN.authority().equals(scope)).findFirst().isPresent()) {
            return Optional.empty();
        }

        return Optional.of(new JwtRefreshToken(claims));
    }

    @Override
    public String getToken() {
        return null;
    }

    public Jws<Claims> getClaims() {
        return claims;
    }

    public String getJti() {
        return claims.getBody().getId();
    }

    public String getSubject() {
        return claims.getBody().getSubject();
    }
}
