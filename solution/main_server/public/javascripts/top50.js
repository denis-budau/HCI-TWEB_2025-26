document.addEventListener("DOMContentLoaded", () => {

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const AnimeCard = document.getElementById("animeCardTemplate");

    document.getElementById("pageTitle").innerText = "TOP 50 ANIME";

    function renderCard(anime) {
        // Clona il template
        const clone = AnimeCard.content.cloneNode(true);

        clone.querySelector(".card-title").textContent = anime.title;

        const rankNode = clone.querySelector(".rank-circle");
        rankNode.textContent = anime.rank;

        clone.querySelector(".card-score").textContent = anime.score ? `⭐ ${anime.score}` : "⭐ no score";
        clone.querySelector(".card-genres").textContent = anime.genres;
        clone.querySelector(".anime-img").src = anime.imageUrl;

        const linkNode = clone.querySelector("a");
        linkNode.href = `/animedetails?title=${anime.title}`;

        return clone;
    }

    // Fetch Top 50 dal server
    axios.get("/api/anime")
        .then(res => {
            const top50 = res.data;
            top50.forEach(anime => {
                const cardNode = renderCard(anime);
                grid.appendChild(cardNode);
            });
        })
        .catch(err => {
            console.error(err);
            errorBox.style.display = "block";
            errorBox.textContent = "Something went wrong while fetching anime.";
        });
});