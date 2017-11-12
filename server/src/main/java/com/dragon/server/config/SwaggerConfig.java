package com.dragon.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Collections;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfo(
                "AMNG REST API",
                "API Documentation of AMNG Web Application",
                "v1",
                "Terms...",
                new Contact("Chushu Liu", "https://www.whiletrue.cc", "chushul512@gmail.com"),
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0.html",
                Collections.emptyList()
        );
    }
}
