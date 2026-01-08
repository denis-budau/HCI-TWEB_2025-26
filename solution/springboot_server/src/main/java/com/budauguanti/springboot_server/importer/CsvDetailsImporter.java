package com.budauguanti.springboot_server.importer;

import com.budauguanti.springboot_server.details.Details;
import com.budauguanti.springboot_server.details.DetailsRepository;
import org.apache.commons.csv.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Component
public class CsvDetailsImporter implements CommandLineRunner {

    private final DetailsRepository repository;

    public CsvDetailsImporter(DetailsRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        // IMPORTANT: prevent re-import every restart
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

        CSVParser parser = CSVFormat.DEFAULT
                .withFirstRecordAsHeader()
                .parse(reader);

        for (CSVRecord record : parser) {
            Details d = new Details();

            d.setMalId(Integer.parseInt(record.get("mal_id")));
            d.setTitle(record.get("title"));
            d.setTitleJapanese(record.get("title_japanese"));

            d.setGenres(normalizeListField(record.get("genres")));
            d.setStudios(normalizeListField(record.get("studios")));
            d.setProducers(normalizeListField(record.get("producers")));

            d.setScore(parseDouble(record.get("score")));
            d.setEpisodes(parseInteger(record.get("episodes")));

            repository.save(d);
        }

        System.out.println("CSV import completed.");
    }

    // ---------- helpers ----------

    private String normalizeListField(String raw) {
        if (raw == null || raw.isBlank() || raw.equals("[]")) return "";

        return raw.replace("[", "")
                .replace("]", "")
                .replace("'", "")
                .trim();
    }

    private Integer parseInteger(String s) {
        try {
            return Integer.parseInt(s);
        } catch (Exception e) {
            return null;
        }
    }

    private Double parseDouble(String s) {
        try {
            return Double.parseDouble(s);
        } catch (Exception e) {
            return null;
        }
    }
}
