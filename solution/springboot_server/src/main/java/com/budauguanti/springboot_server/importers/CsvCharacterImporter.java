package com.budauguanti.springboot_server.importers;

import com.budauguanti.springboot_server.character.Character;
import com.budauguanti.springboot_server.character.CharacterRepository;
import org.apache.commons.csv.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class CsvCharacterImporter implements CommandLineRunner{
    private final CharacterRepository repository;

    public CsvCharacterImporter(CharacterRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {

        // Prevent re-import every restart
        if (repository.count() > 0) {
            System.out.println("Characters already loaded, skipping CSV import.");
            return;
        }

        // NOTE: IntelliJ runs Spring Boot with working dir = springboot_server,
        // so we go one level up to reach /datasets
        Path csvPath = Paths.get("..", "datasets", "characters_cleaned.csv");
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
            Integer id = parseInteger(record.get("character_mal_id"));
            if (id == null) {
                // Skip invalid rows (ID is mandatory)
                continue;
            }

            Character c = new Character();
            c.setCharacterMalId(id);

            c.setUrl(record.get("url"));
            c.setName(record.get("name"));
            c.setNameKanji(record.get("name_kanji"));
            c.setImage(record.get("image"));

            c.setFavorites(parseInteger(record.get("favorites")));
            c.setAbout(record.get("about"));

            repository.save(c);
        }

        System.out.println("CSV import completed.");
    }

    private Integer parseInteger(String s) {
        try {
            // If the value is valid → store it
            return Integer.parseInt(s);
        } catch (Exception e) {
            // If the value is missing or invalid → store NULL in the DB
            return null;
        }
    }
}
