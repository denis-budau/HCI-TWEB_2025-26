package com.budauguanti.springboot_server.importers;

import com.budauguanti.springboot_server.details.Details;
import com.budauguanti.springboot_server.details.DetailsRepository;
import org.apache.commons.csv.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.util.*;

/**
 * Loads anime data from CSV at application startup and stores it in PostgreSQL.
 * This supports the SQL satellite design of the project.
 */
@Component
public class CsvDetailsImporter implements CommandLineRunner {
    private final DetailsRepository repository;

    public CsvDetailsImporter(DetailsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Prevent re-import every restart
        if (repository.count() > 0) {
            System.out.println("Details already loaded, skipping CSV import.");
            return;
        }

        // NOTE: IntelliJ runs Spring Boot with working dir = springboot_server,
        // so we go one level up to reach /datasets
        Path csvPath = Paths.get("..","datasets", "details_cleaned.csv");
        if (!Files.exists(csvPath)) {
            throw new RuntimeException("CSV not found at: " + csvPath.toAbsolutePath());
        }
        Reader reader = Files.newBufferedReader(csvPath);

        // Configure the CSV parser:
        // - use standard CSV format (comma-separated, quoted values supported)
        // - treat the first row as column headers
        // - skip the header row when iterating over records
        CSVParser parser = CSVFormat.DEFAULT
                .builder()
                .setHeader()               // use first CSV row as column names
                .setSkipHeaderRecord(true) // do not treat header row as data
                .build()
                .parse(reader);            // parse the CSV from the given reader


        for (CSVRecord record : parser) {
            Details d = new Details();

            d.setMalId(Integer.parseInt(record.get("mal_id")));
            d.setTitle(record.get("title"));
            d.setTitleJapanese(record.get("title_japanese"));

            d.setGenres(normalizeListField(record.get("genres")));
            d.setStudios(normalizeListField(record.get("studios")));
            d.setProducers(normalizeListField(record.get("producers")));

            d.setRank(parseDouble(record.get("rank")));
            d.setScore(parseDouble(record.get("score")));
            d.setEpisodes(parseInteger(record.get("episodes")));
            d.setDemographics(record.get("demographics"));
            d.setImageUrl(record.get("image_url"));
            d.setSynopsis(record.get("synopsis"));
            //todo extend if more fields needed
            /*if you do so, change application.properties>spring.jpa.hibernate.ddl-auto=update
            to create-drop so it refreshed the database*/
            repository.save(d);
        }

        System.out.println("CSV import completed.");
    }


    private String normalizeListField(String raw) {
        if (raw == null || raw.isBlank() || raw.equals("[]")) return "";

        return raw.replace("[", "")
                .replace("]", "")
                .replace("'", "")
                .trim();
    }

    private Integer parseInteger(String s) {
        try {
            //If the value is valid → store it
            return Integer.parseInt(s);
        } catch (Exception e) {
            //If the value is missing or invalid → store NULL in the DB
            return null;
        }
    }

    private Double parseDouble(String s) {
        try {
            //If the value is valid → store it
            return Double.parseDouble(s);
        } catch (Exception e) {
            //If the value is missing or invalid → store NULL in the DB
            return null;
        }
    }
}
