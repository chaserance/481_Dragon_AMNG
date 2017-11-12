package com.dragon.server.security.authentication.jwt.extractor;

public interface TokenExtractor {
    String extract(String request);
}
