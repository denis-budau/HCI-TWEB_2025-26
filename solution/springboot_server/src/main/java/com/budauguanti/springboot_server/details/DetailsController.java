package com.budauguanti.springboot_server.details;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/anime")
public class DetailsController {

    private final DetailsService service;

    @Autowired
    public DetailsController(DetailsService service) {
        this.service = service;
    }

    // @PathVariable se vogliamo non usare ?title
    // dettagli di un anime in particolare
    @GetMapping("/details/{title}")
    public List<Details> search(@PathVariable String title) {
        return service.searchByTitle(title);
    }

    // ritorna tutti gli anime
    @GetMapping("/getAnime")
    public List<Details> getAllAnime() {
        return service.findAll();  // devi creare findAll() in DetailsService
    }
}

