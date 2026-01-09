package com.budauguanti.springboot_server.character;

import jakarta.persistence.*;

@Entity
@Table(name = "character")
public class Character {

    @Id
    @Column(name = "character_mal_id", nullable = false)
    private Integer characterMalId;

    @Column(columnDefinition = "TEXT")
    private String url;

    private String name;

    @Column(name = "name_kanji")
    private String nameKanji;

    @Column(columnDefinition = "TEXT")
    private String image;

    private Integer favorites;

    @Column(columnDefinition = "TEXT")
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

    public String getNameKanji() {
        return nameKanji;
    }

    public void setNameKanji(String nameKanji) {
        this.nameKanji = nameKanji;
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
