package com.budauguanti.springboot_server.person;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Tag(
        name = "Persons",
        description = "Endpoints to retrieve person data stored in PostgreSQL"
)
@RestController
@RequestMapping("api/person")
public class PersonController {

    private final PersonService service;

    @Autowired
    public PersonController(PersonService service) {
        this.service = service;
    }

    @Operation(
            summary = "Search persons by name (case-insensitive)",
            description = "Returns a list of persons whose name contains the given string (case-insensitive)."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Person list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Person.class))
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Missing or invalid query parameter"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public List<Person> search(
            @Parameter(
                    description = "Name (or part of it) to search for",
                    example = "Hayao",
                    required = true
            )
            @RequestParam String name
    ) {
        return service.searchByName(name);
    }

    @Operation(
            summary = "Get all persons",
            description = "Returns all persons currently stored in the database."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Person list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Person.class))
                    )
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public List<Person> getAllPersons() {
        return service.findAll();
    }
}
