package com.budauguanti.springboot_server.character;

import com.budauguanti.springboot_server.details.Details;
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
        return repository.findByNameContainingIgnoreCaseOrderByFavoritesDesc(character);
    }

    public List<Character> getTop50ByFavorites() {
        return repository.findTop50ByOrderByFavoritesDesc();
    }
}