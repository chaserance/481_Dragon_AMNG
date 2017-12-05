package com.dragon.server.security.controller;

import com.dragon.server.common.ErrorCode;
import com.dragon.server.common.ErrorResponse;
import com.dragon.server.entity.User;
import com.dragon.server.model.request.UserRequest;
import com.dragon.server.security.authentication.jwt.extractor.TokenExtractor;
import com.dragon.server.security.authentication.jwt.verifier.TokenVerifier;
import com.dragon.server.security.config.JwtSettings;
import com.dragon.server.security.config.SecurityConfig;
import com.dragon.server.security.exception.InvalidJwtToken;
import com.dragon.server.security.model.JwtUser;
import com.dragon.server.security.model.JwtUserFactory;
import com.dragon.server.security.model.token.JwtRawAccessToken;
import com.dragon.server.security.model.token.JwtRefreshToken;
import com.dragon.server.security.model.token.JwtToken;
import com.dragon.server.security.model.token.JwtTokenFactory;
import com.dragon.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * Refresh token & Registration
 */
@RestController
public class AuthenticationController {
    @Autowired
    private JwtTokenFactory tokenFactory;
    @Autowired
    private JwtSettings jwtSettings;
    @Autowired
    private UserService userService;
    @Autowired
    private TokenVerifier tokenVerifier;
    @Autowired
    private TokenExtractor tokenExtractor;

    @RequestMapping(value="${jwt.route.refresh}", method= RequestMethod.GET, produces={ MediaType.APPLICATION_JSON_VALUE })
    public JwtToken refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String tokenPayload = tokenExtractor.extract(request.getHeader(SecurityConfig.JWT_TOKEN_HEADER_PARAM));

        JwtRawAccessToken rawToken = new JwtRawAccessToken(tokenPayload);
        JwtRefreshToken refreshToken = JwtRefreshToken.create(rawToken, jwtSettings.getTokenSigningKey()).orElseThrow(() -> new InvalidJwtToken());

        String jti = refreshToken.getJti();
        if (!tokenVerifier.verify(jti)) {
            throw new InvalidJwtToken();
        }

        String subject = refreshToken.getSubject();
        User user = userService.findByUsername(subject).orElseThrow(() -> new UsernameNotFoundException("User not found: " + subject));

        if (user.getRoles() == null) throw new InsufficientAuthenticationException("User has no roles assigned");

        JwtUser jwtUser = JwtUserFactory.createDefault(user);

        return tokenFactory.createAccessJwtToken(jwtUser);
    }

    @RequestMapping(value = "${jwt.route.register}", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody @Valid UserRequest userRequest) {
        boolean success = userService.create(new User(
                                                        userRequest.getEmail(),
                                                        userRequest.getPassword(),
                                                        userRequest.getFirstname(),
                                                        userRequest.getLastname(),
                                                        userRequest.getAddress(),
                                                        userRequest.getPhoneNumber()
                                                    )
                                            );
        if(success)
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        ErrorResponse errorResponse = ErrorResponse.of("User already existed", ErrorCode.ARGUMENT_NOT_VALID, HttpStatus.BAD_REQUEST);
        return new ResponseEntity(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "${jwt.route.register} + /exist", method = RequestMethod.GET)
    public Map isExist(@RequestParam(value="email") String email) {
        Optional<User> user = userService.findByUsername(email);
        Map<String, Boolean> map = new HashMap<>();
        final String key = "exist";
        if(user.isPresent()) {
            map.put(key, true);
        } else {
            map.put(key, false);
        }
        return map;
    }
}
