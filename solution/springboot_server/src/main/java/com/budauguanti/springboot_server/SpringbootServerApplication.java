package com.budauguanti.springboot_server;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
        info = @Info(
                title = "TWEB Anime Aggregator - SQL Satellite API",
                version = "1.0",
                description = "Spring Boot + PostgreSQL API for anime, characters, and persons."
        ),
        servers = {
                @Server(url = "http://localhost:8082", description = "Local SQL satellite")
        }
)
@SpringBootApplication
public class SpringbootServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootServerApplication.class, args);
    }

}
