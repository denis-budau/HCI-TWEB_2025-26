package com.budauguanti.springboot_server.details;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;


@Entity
@Table
public class Details {
    @Id
    @Column(name="mal_id")
    private Integer malId;

    @Column(nullable = false)
    private String title;

    @Column(name = "title_japanese")
    private String titleJapanese;

    private String url;

    @Column(name = "image_url")
    private String imageUrl;

    private String type;
    private String status;

    private Double score;

    @Column(name = "scored_by")
    private Integer scoredBy;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String synopsis;

    private Integer rank;
    private Integer popularity;
    private Integer members;
    private Integer favorites;

    // Lists stored as CSV strings (simple & acceptable)
    private String genres;
    private String studios;
    private String themes;
    private String demographics;
    private String producers;
    private String licensors;
    private String streaming;

    private String source;
    private String rating;
    private Integer episodes;
    private String season;
    private Integer year;

    @Column(name = "explicit_genres")
    private String explicitGenres;

    //generated empty constructor
    public Details() {
    }

    //generated constructor
    public Details(Integer malId, String title, String titleJapanese, String url, String imageUrl, String type, String status, Double score, Integer scoredBy, LocalDate startDate, LocalDate endDate, String synopsis, Integer rank, Integer popularity, Integer members, Integer favorites, String genres, String studios, String themes, String demographics, String producers, String licensors, String streaming, String source, String rating, Integer episodes, String season, Integer year, String explicitGenres) {
        this.malId = malId;
        this.title = title;
        this.titleJapanese = titleJapanese;
        this.url = url;
        this.imageUrl = imageUrl;
        this.type = type;
        this.status = status;
        this.score = score;
        this.scoredBy = scoredBy;
        this.startDate = startDate;
        this.endDate = endDate;
        this.synopsis = synopsis;
        this.rank = rank;
        this.popularity = popularity;
        this.members = members;
        this.favorites = favorites;
        this.genres = genres;
        this.studios = studios;
        this.themes = themes;
        this.demographics = demographics;
        this.producers = producers;
        this.licensors = licensors;
        this.streaming = streaming;
        this.source = source;
        this.rating = rating;
        this.episodes = episodes;
        this.season = season;
        this.year = year;
        this.explicitGenres = explicitGenres;
    }

    public Integer getMalId() {
        return malId;
    }

    public void setMalId(Integer malId) {
        this.malId = malId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitleJapanese() {
        return titleJapanese;
    }

    public void setTitleJapanese(String titleJapanese) {
        this.titleJapanese = titleJapanese;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Integer getScoredBy() {
        return scoredBy;
    }

    public void setScoredBy(Integer scoredBy) {
        this.scoredBy = scoredBy;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    public Integer getMembers() {
        return members;
    }

    public void setMembers(Integer members) {
        this.members = members;
    }

    public Integer getFavorites() {
        return favorites;
    }

    public void setFavorites(Integer favorites) {
        this.favorites = favorites;
    }

    public String getGenres() {
        return genres;
    }

    public void setGenres(String genres) {
        this.genres = genres;
    }

    public String getStudios() {
        return studios;
    }

    public void setStudios(String studios) {
        this.studios = studios;
    }

    public String getThemes() {
        return themes;
    }

    public void setThemes(String themes) {
        this.themes = themes;
    }

    public String getDemographics() {
        return demographics;
    }

    public void setDemographics(String demographics) {
        this.demographics = demographics;
    }

    public String getProducers() {
        return producers;
    }

    public void setProducers(String producers) {
        this.producers = producers;
    }

    public String getLicensors() {
        return licensors;
    }

    public void setLicensors(String licensors) {
        this.licensors = licensors;
    }

    public String getStreaming() {
        return streaming;
    }

    public void setStreaming(String streaming) {
        this.streaming = streaming;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public Integer getEpisodes() {
        return episodes;
    }

    public void setEpisodes(Integer episodes) {
        this.episodes = episodes;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getExplicitGenres() {
        return explicitGenres;
    }

    public void setExplicitGenres(String explicitGenres) {
        this.explicitGenres = explicitGenres;
    }

    //function to use every time you read a Details entity
    @Transient
    public List<String> getGenresAsList() {
        if (genres == null || genres.isBlank()) {
            return List.of();
        }

        return Arrays.stream(genres.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .toList();
    }
}
