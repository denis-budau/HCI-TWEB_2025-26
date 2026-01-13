package com.budauguanti.springboot_server.details;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetailsRepository extends JpaRepository<Details, Integer> {
    //this will be case-insensitive
    List<Details> findByTitleContainingIgnoreCase(String title);

    List<Details> findTop50ByOrderByRankAsc();
}