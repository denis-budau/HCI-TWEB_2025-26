package com.budauguanti.springboot_server.details;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class DetailsService {
    private final DetailsRepository repository;

    @Autowired
    public DetailsService(DetailsRepository repository) {
        this.repository = repository;
    }

    public List<Details> searchByTitle(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }

    public List<Details> findAll() {return repository.findAll(); } // repository estende JpaRepository
}
