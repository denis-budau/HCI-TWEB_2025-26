package com.budauguanti.springboot_server.character;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "character")
@Schema(description = "Anime character entity from PostgreSQL")
public class Character {

    @Id
    @Column(name = "character_mal_id", nullable = false)
    @Schema(example = "17", description = "MyAnimeList unique character identifier")
    private Integer characterMalId;

    @Column(columnDefinition = "TEXT")
    private String url;

    @Schema(example = "Naruto Uzumaki", description = "Character name")
    private String name;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Schema(example = "102345", description = "Number of user favorites")
    private Integer favorites;

    @Column(columnDefinition = "TEXT")
    @Schema(
            example = "Naruto Uzumaki is a ninja from Konohagakure...",
            description = "Short character biography"
    )
    private String about;

    public Character() {
    }

    public Character(Integer characterMalId, String url, String name, Integer favorites, String about) {
        this.characterMalId = characterMalId;
        this.url = url;
        this.name = name;
        this.favorites = favorites;
        this.about = about;
    }

    public Integer getCharacterMalId() {
        return characterMalId;
    }

    public void setCharacterMalId(Integer characterMalId) {
        this.characterMalId = characterMalId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getFavorites() {
        return favorites;
    }

    public void setFavorites(Integer favorites) {
        this.favorites = favorites;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }
}
