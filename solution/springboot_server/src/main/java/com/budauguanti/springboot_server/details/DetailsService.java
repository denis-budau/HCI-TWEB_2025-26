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
        return repository.findByTitleContainingIgnoreCaseOrderByRankAsc(title);
    }

    //public Details findByMalId(int malId) {return repository.findById(malId);}
    public Details findByMalId(int malId) {
        return repository.findById(malId)
                .orElseThrow(() -> new RuntimeException("Anime not found: " + malId));
    }

    public List<Details> getTop50ByRank() {
        return repository.findTop50ByOrderByRankAsc();
    }
}
