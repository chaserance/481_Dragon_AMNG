package com.dragon.server.security.config;

import com.dragon.server.filter.CustomCorsFilter;
import com.dragon.server.security.RestAuthenticationEntryPoint;
import com.dragon.server.security.authentication.ajax.AjaxAuthenticationProvider;
import com.dragon.server.security.authentication.ajax.AjaxLoginProcessingFilter;
import com.dragon.server.security.authentication.jwt.JwtAuthenticationProvider;
import com.dragon.server.security.authentication.jwt.JwtTokenAuthenticationProcessingFilter;
import com.dragon.server.security.authentication.jwt.SkipPathRequestMatcher;
import com.dragon.server.security.authentication.jwt.extractor.TokenExtractor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    public static final String JWT_TOKEN_HEADER_PARAM = "Authorization";

    @Value("${jwt.route.register}")
    public String FORM_BASED_REGISTER_ENTRY_POINT;
    @Value("${jwt.route.login}")
    public String FORM_BASED_LOGIN_ENTRY_POINT;
    @Value("${jwt.route.refresh}")
    public String TOKEN_REFRESH_ENTRY_POINT;

    public static final String TOKEN_BASED_AUTH_ENTRY_POINT = "/api/**";
    public static final String PROGRAMS_ENDPOINT = "/api/programs";
    public static final String COURSES_ENDPOINT = "/api/courses";
    public static final String PROMOTION_ENDPOINT = "/api/promotions";

    @Autowired
    private RestAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private AuthenticationSuccessHandler successHandler;
    @Autowired
    private AuthenticationFailureHandler failureHandler;
    @Autowired
    private AjaxAuthenticationProvider ajaxAuthenticationProvider;
    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Autowired
    private TokenExtractor tokenExtractor;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ObjectMapper objectMapper;

    protected AjaxLoginProcessingFilter buildAjaxLoginProcessingFilter() throws Exception {
        AjaxLoginProcessingFilter filter = new AjaxLoginProcessingFilter(FORM_BASED_LOGIN_ENTRY_POINT, successHandler, failureHandler, objectMapper);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() throws Exception {
        List<String> pathsToSkip = Arrays.asList(TOKEN_REFRESH_ENTRY_POINT, FORM_BASED_LOGIN_ENTRY_POINT, FORM_BASED_REGISTER_ENTRY_POINT);
        List<RequestMatcher> matchersToSkip = Arrays.asList(
                new AntPathRequestMatcher(PROGRAMS_ENDPOINT, HttpMethod.GET.toString()),
                new AntPathRequestMatcher(COURSES_ENDPOINT, HttpMethod.GET.toString()),
                new AntPathRequestMatcher(PROMOTION_ENDPOINT, HttpMethod.GET.toString())
        );
        SkipPathRequestMatcher matcher = new SkipPathRequestMatcher(
                pathsToSkip,
                matchersToSkip,
                TOKEN_BASED_AUTH_ENTRY_POINT);
        JwtTokenAuthenticationProcessingFilter filter
                = new JwtTokenAuthenticationProcessingFilter(failureHandler, tokenExtractor, matcher);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(ajaxAuthenticationProvider);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // We don't need CSRF for JWT based authentication
                .exceptionHandling()
                .authenticationEntryPoint(this.authenticationEntryPoint)

                .and()
                .sessionManagement() // Not session needed
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers(FORM_BASED_REGISTER_ENTRY_POINT).permitAll() // Register end-point
                .antMatchers(FORM_BASED_LOGIN_ENTRY_POINT).permitAll() // Login end-point
                .antMatchers(TOKEN_REFRESH_ENTRY_POINT).permitAll() // Token refresh end-point
                .antMatchers(HttpMethod.GET, PROGRAMS_ENDPOINT, COURSES_ENDPOINT, PROMOTION_ENDPOINT).permitAll() // permit for advertisement
                .and()
                .authorizeRequests()
                .antMatchers(TOKEN_BASED_AUTH_ENTRY_POINT).authenticated() // Protected API End-points
                .anyRequest().permitAll() // Permit all other end-points
                .and()
                .addFilterBefore(new CustomCorsFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(buildAjaxLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers();
    }
}
