package com.budauguanti.springboot_server.importers;

import com.budauguanti.springboot_server.person.Person;
import com.budauguanti.springboot_server.person.PersonRepository;
import org.apache.commons.csv.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.*;
import java.nio.file.*;
import java.util.*;

@Component
public class CsvPersonImporter implements CommandLineRunner {

    private final PersonRepository repository;

    public CsvPersonImporter(PersonRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Prevent re-import every restart
        if (repository.count() > 0) {
            System.out.println("Persons already loaded, skipping CSV import.");
            return;
        }

        // NOTE: IntelliJ runs Spring Boot with working dir = springboot_server,
        // so we go one level up to reach /datasets
        Path csvPath = Paths.get("..","datasets", "person_details_cleaned.csv");
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
            Person d = new Person();


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
