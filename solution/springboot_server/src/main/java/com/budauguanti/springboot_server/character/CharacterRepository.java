package com.budauguanti.springboot_server.character;

import com.budauguanti.springboot_server.details.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, Integer> {
    List<Character> findByNameContainingIgnoreCaseOrderByFavoritesDesc(String character);
    List<Character> findTop50ByOrderByFavoritesDesc();
}