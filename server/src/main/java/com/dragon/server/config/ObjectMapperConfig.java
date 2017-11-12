//package com.dragon.server.config;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.ObjectWriter;
//import com.fasterxml.jackson.databind.SerializationFeature;
//import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
//
//@Configuration
//public class ObjectMapperConfig {
//
//    @Bean
//    @Primary
//    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
//
//        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
//        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
//        objectMapper.registerModule(new JavaTimeModule());
//
//        return objectMapper;
//    }
//
//    @Bean
//    public ObjectWriter objectWriter(ObjectMapper objectMapper) {
//        return objectMapper.writerWithDefaultPrettyPrinter();
//    }
//}
