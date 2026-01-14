/**
 * Script for the Anime Details page.
 *
 * This script runs when the DOM content is loaded and is responsible for:
 * 1. Parsing the "title" query parameter from the URL.
 * 2. Sending an Axios GET request to the `/api/anime/search` endpoint.
 * 3. Finding the anime object that matches the exact title.
 * 4. Updating the DOM elements on the page with the retrieved anime details.
 *
 * If the anime is not found, a "not found" message is displayed.
 * If an error occurs during the API request, the user is redirected to the error page.
 */
document.addEventListener("DOMContentLoaded", () => {

    const synopsisText = document.getElementById("synopsisText");
    const synopsisStatus = document.getElementById("synopsisStatus");
    const name = document.getElementById("title")
    const titleJapanese = document.getElementById("titleJapanese");
    const score = document.getElementById("cardScore");
    const genres = document.getElementById("cardGenres")
    const animeImg = document.getElementById("animeImg");
    const episodes = document.getElementById("cardEpisode");
    const studios = document.getElementById("cardStudios")
    const producer = document.getElementById("cardProducer");


    if (!synopsisText || !synopsisStatus) return;

    const params = new URLSearchParams(window.location.search);
    const title = params.get("title") || "";

    axios.get("/api/anime/search", { params: { title } })
        .then(function (response) {
            const results = Array.isArray(response.data) ? response.data : [];

            // Find the anime that exactly matches the title
            const anime = results.find(a => a.title === title);

            if (!anime) {
                console.warn("Nessun anime trovato con esatto titolo:", title);
                synopsisText.textContent = "Anime non trovato.";
                synopsisStatus.textContent = "";
                return;
            }
            name.textContent = anime.title ? anime.title : "no title";
            titleJapanese.textContent = anime.titleJapanese ? anime.titleJapanese : "no title Japanese";
            score.textContent = "Score: " + (anime.score ? anime.score : "no score");
            genres.textContent = "Genres: " + (anime.genres ? anime.genres : "no genres");
            episodes.textContent = "Episodes: " + (anime.episodes ? anime.episodes : "no episode");
            studios.textContent = "Studios: " + (anime.studios ? anime.studios : "no studios");
            producer.textContent = "Producer: " + (anime.producer ? anime.producer : "no producer");
            animeImg.src = anime.imageUrl;
            synopsisText.textContent = anime.synopsis || "No synopsis available.";
            synopsisStatus.textContent = "";
        })
        .catch(function (error) {
            console.error("Error fetching anime details:", error);
            location.href = "/error";
        });
});
