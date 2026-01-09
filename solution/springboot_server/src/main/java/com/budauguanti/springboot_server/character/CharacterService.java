package com.budauguanti.springboot_server.character;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class CharacterService {
    private final CharacterRepository repository;

    @Autowired
    public CharacterService(CharacterRepository repository) {
        this.repository = repository;
    }

    public List<Character> searchByName(String character) {
        return repository.findByNameContainingIgnoreCase(character);
    }

    public List<Character> findAll() {return repository.findAll(); }
}