package com.budauguanti.springboot_server.importer;

import com.budauguanti.springboot_server.details.Details;
import com.budauguanti.springboot_server.details.DetailsRepository;


//todo manage this function in order to normalize fields when the CSV is loaded into PostgreSQL
public class CsvDetailsImporter {

    private final DetailsRepository repository;

    public CsvDetailsImporter(DetailsRepository repository) {
        this.repository = repository;
    }

    public void importRow(CsvRow row) {
        Details d = new Details();

        d.setMalId(Integer.parseInt(row.get("mal_id")));
        d.setTitle(row.get("title"));

        // 👇 NORMALIZATION HAPPENS HERE
        d.setGenres(normalizeListField(row.get("genres")));
        d.setStudios(normalizeListField(row.get("studios")));
        d.setProducers(normalizeListField(row.get("producers")));

        repository.save(d);
    }

    private static String normalizeListField(String raw) {
        if (raw == null) return null;

        // "['Horror', 'Supernatural']"
        String s = raw.trim();
        if (s.equals("[]") || s.isEmpty()) return "";

        return s.replace("[", "")
                .replace("]", "")
                .replace("'", "")
                .trim();
    }
}
