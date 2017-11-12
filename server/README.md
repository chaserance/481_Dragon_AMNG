# Server

This project was developed in Spring Boot, as a Restful API backend webservice.
This is a `maven` based project, you need install it first. 

## Configuration

You need go to `src/main/resources/application.yml` to enter your own MySQL username/password.

## Development server

Run `mvn spring-boot:run` for a dev server. Navigate to `http://localhost:8082/`.

## Build

Run `mvn clean install`, it will automatically package the the front end static files into `targer/` directory,
you can then run `java -jar server-SNAPSHOT**.jar` to run the application.
