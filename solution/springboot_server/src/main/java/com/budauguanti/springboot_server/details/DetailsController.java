package com.budauguanti.springboot_server.details;

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
        name = "Anime Details",
        description = "Endpoints to retrieve anime details stored in PostgreSQL"
)
@RestController
@RequestMapping("/anime")
public class DetailsController {

    private final DetailsService service;

    @Autowired
    public DetailsController(DetailsService service) {
        this.service = service;
    }

    @Operation(
            summary = "Search anime by title (case-insensitive)",
            description = "Returns a list of anime whose title contains the given string (case-insensitive)."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Anime list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Details.class))
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Missing or invalid query parameter"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public List<Details> search(
            @Parameter(
                    description = "Title (or part of it) to search for",
                    example = "naruto",
                    required = true
            )
            @RequestParam String title
    ) {
        return service.searchByTitle(title);
    }

    @Operation(
            summary = "Get all anime",
            description = "Returns all anime currently stored in the database."
)
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Anime list retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Details.class))
                    )
            )
    })
    @GetMapping
    public List<Details> getAllAnime() {
        return service.findAll();
    }
}
