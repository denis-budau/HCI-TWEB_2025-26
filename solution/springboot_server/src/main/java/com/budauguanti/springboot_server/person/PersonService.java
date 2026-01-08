package com.budauguanti.springboot_server.person;

import com.budauguanti.springboot_server.details.Details;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    private final PersonRepository repository;

    @Autowired
    public PersonService(PersonRepository repository) {
        this.repository = repository;
    }

    public List<Person> searchByName(String person) {
        return repository.findByTitleContainingIgnoreCase(person);
    }


    public List<Person> findAll() { return repository.findAll(); }
}