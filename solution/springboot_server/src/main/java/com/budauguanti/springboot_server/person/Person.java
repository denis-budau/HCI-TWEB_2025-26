package com.budauguanti.springboot_server.person;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Person {
    @Id
    @Column(name = "person_mal_id", nullable = false)
    private Integer personMalId;

    @Column(columnDefinition = "TEXT")
    private String url;

    @Column(name = "website_url", columnDefinition = "TEXT")
    private String websiteUrl;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    private String name;

    @Column(name = "given_name")
    private String givenName;

    @Column(name = "family_name")
    private String familyName;

    @Column(columnDefinition = "TEXT")
    private LocalDate birthday; //could have used LocalDate instead of String but just for displaying purposes it's not needed

    private Integer favorites;

    @Column(name = "relevant_location")
    private String relevantLocation;

    //generated empty constructor
    public Person() {
    }

    public Person(Integer personMalId, String url, String websiteUrl, String imageUrl, String name, String givenName, String familyName, LocalDate birthday, Integer favorites, String relevantLocation) {
        this.personMalId = personMalId;
        this.url = url;
        this.websiteUrl = websiteUrl;
        this.imageUrl = imageUrl;
        this.name = name;
        this.givenName = givenName;
        this.familyName = familyName;
        this.birthday = birthday;
        this.favorites = favorites;
        this.relevantLocation = relevantLocation;
    }

    public Integer getPersonMalId() {
        return personMalId;
    }

    public void setPersonMalId(Integer personMalId) {
        this.personMalId = personMalId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getWebsiteUrl() {
        return websiteUrl;
    }

    public void setWebsiteUrl(String websiteUrl) {
        this.websiteUrl = websiteUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public Integer getFavorites() {
        return favorites;
    }

    public void setFavorites(Integer favorites) {
        this.favorites = favorites;
    }

    public String getRelevantLocation() {
        return relevantLocation;
    }

    public void setRelevantLocation(String relevantLocation) {
        this.relevantLocation = relevantLocation;
    }
}