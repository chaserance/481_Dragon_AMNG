package com.dragon.server.security.model.token;

import com.dragon.server.security.config.JwtSettings;
import com.dragon.server.security.model.JwtUser;
import com.dragon.server.security.model.Scopes;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenFactory {

    private final JwtSettings settings;

    public static final String CLAIM_KEY_USER_ID = "user_id";
    public static final String CLAIM_KEY_FIRST_NAME = "firstname";
    public static final String CLAIM_KEY_LAST_NAME = "lastname";
    public static final String CLAIM_KEY_AUTHORITIES = "scope";
    public static final String CLAIM_KEY_ACCOUNT_ENABLED = "enabled";
    public static final String CLAIM_KEY_ACCOUNT_NON_LOCKED = "non_locked";
    public static final String CLAIM_KEY_ACCOUNT_NON_EXPIRED = "non_expired";

    private final SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    @Autowired
    public JwtTokenFactory(JwtSettings settings) {
        this.settings = settings;
    }

    public JwtAccessToken createAccessJwtToken(JwtUser jwtUser) {
        if (StringUtils.isEmpty(jwtUser.getUsername()))
            throw new IllegalArgumentException("Cannot create JWT Token without username");

        if (jwtUser.getAuthorities() == null || jwtUser.getAuthorities().isEmpty())
            throw new IllegalArgumentException("User doesn't have any privileges");

        Claims claims = Jwts.claims().setSubject(jwtUser.getUsername());
        claims.put(CLAIM_KEY_USER_ID, jwtUser.getUserId());
        claims.put(CLAIM_KEY_FIRST_NAME, jwtUser.getFirstname());
        claims.put(CLAIM_KEY_LAST_NAME, jwtUser.getLastname());
        claims.put(CLAIM_KEY_AUTHORITIES, authoritiesToArray(jwtUser.getAuthorities()));
        claims.put(CLAIM_KEY_ACCOUNT_ENABLED, jwtUser.isEnabled());
        claims.put(CLAIM_KEY_ACCOUNT_NON_LOCKED, jwtUser.isAccountNonLocked());
        claims.put(CLAIM_KEY_ACCOUNT_NON_EXPIRED, jwtUser.isAccountNonExpired());

        String token = generateToken(claims, settings.getTokenExpirationTime());

        return new JwtAccessToken(token, claims);
    }

    public JwtToken createRefreshToken(JwtUser jwtUser) {
        if (StringUtils.isEmpty(jwtUser.getUsername())) {
            throw new IllegalArgumentException("Cannot create JWT Token without username");
        }

        Claims claims = Jwts.claims().setSubject(jwtUser.getUsername());
        claims.put(CLAIM_KEY_USER_ID, jwtUser.getUserId());
        claims.put(CLAIM_KEY_FIRST_NAME, jwtUser.getFirstname());
        claims.put(CLAIM_KEY_LAST_NAME, jwtUser.getLastname());
        claims.put(CLAIM_KEY_AUTHORITIES, Arrays.asList(Scopes.REFRESH_TOKEN.authority()));
        claims.put(CLAIM_KEY_ACCOUNT_ENABLED, jwtUser.isEnabled());
        claims.put(CLAIM_KEY_ACCOUNT_NON_LOCKED, jwtUser.isAccountNonLocked());
        claims.put(CLAIM_KEY_ACCOUNT_NON_EXPIRED, jwtUser.isAccountNonExpired());

        String token = generateToken(claims, settings.getRefreshTokenExpTime());

        return new JwtAccessToken(token, claims);
    }

    private String generateToken(Map<String, Object> claims, Integer expiration) {
        LocalDateTime currentTime = LocalDateTime.now();
        return Jwts.builder()
                .setClaims(claims)
                .setId(UUID.randomUUID().toString())
                .setIssuedAt(Date.from(currentTime.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(LocalDateTime.now()
                        .plusMinutes(expiration)
                        .atZone(ZoneId.systemDefault()).toInstant()))
                //.compressWith(CompressionCodecs.DEFLATE)
                .signWith(SIGNATURE_ALGORITHM, settings.getTokenSigningKey())
                .compact();
    }

    public JwtUser getJwtUserFromToken(JwtRawAccessToken jwtRawAccessToken) {
        Jws<Claims> jwsClaims = jwtRawAccessToken.parseClaims(settings.getTokenSigningKey());
        Long userId = Long.valueOf((Integer) jwsClaims.getBody().get(CLAIM_KEY_USER_ID));
        String username = jwsClaims.getBody().getSubject();
        String firstname = (String) jwsClaims.getBody().get(CLAIM_KEY_FIRST_NAME);
        String lastname = (String) jwsClaims.getBody().get(CLAIM_KEY_LAST_NAME);
        List<String> scopes = jwsClaims.getBody().get(CLAIM_KEY_AUTHORITIES, List.class);
        boolean account_enabled = (Boolean) jwsClaims.getBody().get(CLAIM_KEY_ACCOUNT_ENABLED);
        boolean account_non_locked = (Boolean) jwsClaims.getBody().get(CLAIM_KEY_ACCOUNT_NON_LOCKED);
        boolean account_non_expired = (Boolean) jwsClaims.getBody().get(CLAIM_KEY_ACCOUNT_NON_EXPIRED);

        if (!account_enabled) {
            throw new DisabledException("User is disabled");
        }

        return new JwtUser(
                userId,
                username,
                firstname,
                lastname,
                "password",
                account_enabled,
                account_non_expired,
                true,
                account_non_locked,
                parseArrayToAuthorities(scopes)
        );
    }

    private List authoritiesToArray(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream().map(s -> s.getAuthority()).collect(Collectors.toList());
    }

    private Collection parseArrayToAuthorities(List<String> roles) {
        return roles.stream().map(s -> new SimpleGrantedAuthority(s.toString())).collect(Collectors.toCollection(HashSet::new));
    }
}
