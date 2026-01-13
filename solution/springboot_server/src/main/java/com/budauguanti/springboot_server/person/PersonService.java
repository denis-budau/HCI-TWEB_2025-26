package com.budauguanti.springboot_server.person;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> searchByName(String person) {
        return repository.findByNameContainingIgnoreCaseOrderByFavoritesDesc(person);
    }

    // Metodo per ottenere i primi 50 ordinati direttamente dal Database
    public List<Person> getTop50ByFavorites() {
        return repository.findTop50ByOrderByFavoritesDesc();
    }
}