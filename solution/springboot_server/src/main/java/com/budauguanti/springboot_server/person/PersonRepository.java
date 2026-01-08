package com.budauguanti.springboot_server.person;

import com.budauguanti.springboot_server.details.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
}