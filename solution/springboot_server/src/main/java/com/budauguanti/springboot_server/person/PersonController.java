package com.budauguanti.springboot_server.person;

import com.budauguanti.springboot_server.details.Details;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/anime/")
public class PersonController {

    private final PersonService service;

    @Autowired
    public PersonController(PersonService service) {
        this.service = service;
    }

    // dettagli di un anime in particolare
    @GetMapping("/{person}")
    public List<Details> search(@PathVariable String person) {
        return service.searchByName(person);
    }

    // ritorna tutti gli anime
    @GetMapping("/getPerson")
    public List<Details> getAllPerson() {
        return service.findAll();  // devi creare findAll() in DetailsService
    }
}
