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
            Integer id = parseInteger(record.get("person_mal_id"));
            if (id == null) {
                // Skip invalid rows (ID is mandatory)
                continue;
            }

            Person p = new Person();
            p.setPersonMalId(id);

            p.setUrl(record.get("url"));
            p.setWebsiteUrl(record.get("website_url"));
            p.setImageUrl(record.get("image_url"));

            p.setName(record.get("name"));
            p.setRelevantLocation(record.get("relevant_location"));
            p.setGivenName(record.get("given_name"));
            p.setFamilyName(record.get("family_name"));

            //todo if you have time, consider normalizing to LocalDate and parsing during the import
            //add if needed p.setBirthday(record.get("birthday"));
            /*if you do so, change application.properties>spring.jpa.hibernate.ddl-auto=update
            to create-drop so it refreshed the database*/

            p.setFavorites(parseInteger(record.get("favorites")));
            p.setRelevantLocation(record.get("relevant_location"));

            repository.save(p);
        }


        System.out.println("CSV import completed.");
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

}
