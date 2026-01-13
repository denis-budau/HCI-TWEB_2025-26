document.addEventListener("DOMContentLoaded", () => {

    //const malIdEl = document.getElementById("malId");
    const synopsisText = document.getElementById("synopsisText");
    const synopsisStatus = document.getElementById("synopsisStatus");

    if (!synopsisText || !synopsisStatus) return;

    const params = new URLSearchParams(window.location.search);
    const title = params.get("title") || "";

    axios.get("/api/anime/search", { params : { title } })
        .then(function (response) {
            const results = Array.isArray(response.data) ? response.data : [];
            clone.querySelector(".card-score").textContent = anime.score ? `⭐ ${anime.score}` : "⭐ no score";
            clone.querySelector(".card-genres").textContent = anime.genres;
            clone.querySelector(".anime-img").src = anime.imageUrl;
            synopsisText.textContent = anime.synopsis || "No synopsis available.";
            synopsisStatus.textContent = "";
        })
        .catch(function (error) {
            console.error("Error fetching anime details:", error);
            location.href = "/error";
        });
});
