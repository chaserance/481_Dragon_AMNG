package com.dragon.server.security.authentication.jwt.verifier;

public interface TokenVerifier {
    boolean verify(String jti);
}
