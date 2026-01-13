package com.budauguanti.springboot_server.person;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
    //this will be case-insensitive
    List<Person> findByNameContainingIgnoreCase(String name);

    List<Person> findTop50ByOrderByFavoritesDesc();
}