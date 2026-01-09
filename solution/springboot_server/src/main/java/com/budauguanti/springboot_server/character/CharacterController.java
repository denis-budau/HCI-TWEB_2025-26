package com.budauguanti.springboot_server.character;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(
        name = "Anime Characters",
        description = "Endpoints to retrieve anime characters stored in PostgreSQL"
)
@RestController
@RequestMapping("/character")
public class CharacterController {

    private final CharacterService service;

    @Autowired
    public CharacterController(CharacterService service) { this.service = service; }

    @Operation(
            summary = "Search characters by name (case-insensitive)",
            description = "Returns a list of characters whose name contains the given string (case-insensitive)."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Characters list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Character.class))
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Missing or invalid query parameter"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
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

    @Operation(
            summary = "Get all characters",
            description = "Returns all characters currently stored in the database."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Characters list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Character.class))
                    )
            )
    })
    @GetMapping
    public List<Character> getAllCharacters() {
        return service.findAll();
    }
}