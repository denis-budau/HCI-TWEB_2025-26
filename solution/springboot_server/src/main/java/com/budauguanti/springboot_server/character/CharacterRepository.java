package com.budauguanti.springboot_server.character;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    //this will be case-insensitive
    List<Character> findByNameContainingIgnoreCase(String character);
}