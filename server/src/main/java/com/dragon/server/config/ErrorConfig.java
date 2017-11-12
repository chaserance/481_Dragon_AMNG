package com.dragon.server.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class ErrorConfig implements EmbeddedServletContainerCustomizer {

    @Override
    public void customize(ConfigurableEmbeddedServletContainer container) {
        container.addErrorPages(new ErrorPage(HttpStatus.ACCEPTED.NOT_FOUND, "/404"));
        container.addErrorPages(new ErrorPage(HttpStatus.UNAUTHORIZED, "/401"));
        container.addErrorPages(new ErrorPage(HttpStatus.FORBIDDEN, "/403"));
    }
}
