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
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@Tag(
        name = "Anime Details",
        description = "Endpoints to retrieve anime details stored in PostgreSQL"
)
@RestController
@RequestMapping("/api/anime")
public class DetailsController {

    private final DetailsService service;

    @Autowired
    public DetailsController(DetailsService service) {
        this.service = service;
    }

    @Operation(
            summary = "Search anime by title (case-insensitive)",
            description = "Returns a list of anime whose title contains the given string, ignoring case."
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
                    example = "Naruto",
                    required = true
            )
            @RequestParam String title
    ) {
        System.out.println("Spring received search request: " + title);
        return service.searchByTitle(title);
    }

    @Operation(
            summary = "Get top 50 anime by rank",
            description = "Returns the 50 anime with the best rank (lowest rank value)."
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
    public List<Details> getTop50Anime() {
        return service.getTop50ByRank();
    }

    @Operation(
            summary = "Get anime details by MyAnimeList ID",
            description = "Returns the anime details corresponding to the given MAL ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Anime details retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = Details.class)
                    )
            ),
            @ApiResponse(responseCode = "404", description = "Anime not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/{malId}")
    public Details getByMalId(
            @Parameter(
                    description = "MyAnimeList unique identifier",
                    example = "20",
                    required = true
            )
            @PathVariable int malId
    ) {
        System.out.println("Spring received get-by-id request: " + malId);
        return service.findByMalId(malId);
    }


}
