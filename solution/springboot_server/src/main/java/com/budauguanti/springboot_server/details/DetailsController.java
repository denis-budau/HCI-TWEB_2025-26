package com.budauguanti.springboot_server.details;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/details")
public class DetailsController {

    private final DetailsService service;

    public DetailsController(DetailsService service) {
        this.service = service;
    }

    @GetMapping
    public List<Details> search(@RequestParam String title) {
        return service.searchByTitle(title);
    }
}
