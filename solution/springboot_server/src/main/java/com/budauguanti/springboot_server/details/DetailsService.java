package com.budauguanti.springboot_server.details;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailsService {

    private final DetailsRepository repository;

    public DetailsService(DetailsRepository repository) {
        this.repository = repository;
    }

    public List<Details> searchByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }
}
