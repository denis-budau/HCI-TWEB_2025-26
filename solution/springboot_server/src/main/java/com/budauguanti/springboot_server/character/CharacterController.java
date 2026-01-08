package com.budauguanti.springboot_server.character;

import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/character")
public class CharacterController {

    private final CharacterService service;

    @Autowired
    public CharacterController(CharacterService service) { this.service = service; }

    @GetMapping("/search")
    public List<Character> search(
            @Parameter(
                    description = "Name (or part of it) to search for",
                    example = "Eleven",
                    required = true
            )
            @RequestParam String name
    ) {
        return service.searchByName(name);
    }

    @GetMapping
    public List<Character> getAllAnime() {
        return service.findAll();
    }
}