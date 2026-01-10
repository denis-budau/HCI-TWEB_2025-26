document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const card = document.getElementById("animeCardTemplate");

    // If the page was opened with ?title=...
    const params = new URLSearchParams(window.location.search);
    const initialTitle = params.get("title") || input?.value || "";

    function renderCard(anime) {
        const clone = card.content.cloneNode(true);

        clone.querySelector(".card-title").textContent = anime.title;
        clone.querySelector(".card-score").textContent = anime.score ? `⭐ ${anime.score}` : "⭐ no score";
        clone.querySelector(".card-genres").textContent = anime.genres;
        clone.querySelector(".card-img-top").src = anime.imageUrl;

        return clone;
    }

    async function AxiosAndRender(title) {
        const inputValue = (title || "").trim();

        // Reset UI
        grid.innerHTML = "";
        emptyState.style.display = "none";
        errorBox.style.display = "none";
        summary.style.display = "none";

        if (!inputValue) {
            emptyState.style.display = "block"
            emptyState.querySelector(".fw-semibold").textContent = "Type a title to search";
            return;
        }

        status.style.display = "block"

        try {
            const res = await axios.get("/anime/search", { params: { title: inputValue } });
            const results = Array.isArray(res.data) ? res.data : [];

            status.style.display = "none";

            summary.textContent = `${results.length} result for "${inputValue}"`;
            summary.style.display = "block";

            if (results.length === 0) {
                summary.style.display = "block";
                return;
            }

            results.forEach(anime => {
                const cardNode = renderCard(anime);
                grid.appendChild(cardNode);
            });
        } catch (err) {
            console.error("Search failed:", err);
            status.style.display = "none";
            errorBox.style.display = "block";
        }
    }

    // Submit should navigate (keeps URLs shareable / refreshable)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputValue = input.value.trim();
            window.location.href = `/anime/search?title=${encodeURIComponent(inputValue)}`;
        });
    }

    // Auto-run search if ?title=... is present
    if (initialTitle.trim()) {
        AxiosAndRender(initialTitle);
    }
});