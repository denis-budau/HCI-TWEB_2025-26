/**
 * Search Page Script
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const AnimeCard = document.getElementById("animeCardTemplate");
    const characterCard = document.getElementById("characterCardTemplate");
    const personCard = document.getElementById("personCardTemplate");


    // If the page was opened with ?title=...
    const params = new URLSearchParams(window.location.search);
    const initialTitle = params.get("title") || input?.value || "";
    const type = params.get("type") || "anime";
    document.getElementById("pageTitle").innerText = (type + " search").toUpperCase();

    /**
     * Renders a single card based on the search type and item data.
     *
     * @param {Object} item - Object representing an anime, character, or person.
     * @returns {DocumentFragment} Cloned DOM node ready to be appended to the results grid.
     */
    function renderCard(item) {
        // Choose the right model based on the type
        let cardTemplate;
        if (type === "anime") { cardTemplate = AnimeCard; }
        else if (type === "character") { cardTemplate = characterCard; }
        else if (type === "person") { cardTemplate = personCard; }

        // Clone template
        const clone = cardTemplate.content.cloneNode(true);

        if (type === "anime") {
            clone.querySelector(".card-title").textContent = item.title;
            clone.querySelector(".card-score").textContent = item.score ? `⭐ ${item.score}` : "⭐ no score";
            clone.querySelector(".card-genres").textContent = item.genres;
            clone.querySelector(".anime-img").src = item.imageUrl;
            clone.querySelector("a").href = `/animedetails?title=${encodeURIComponent(item.title)}`;
        }

        if (type === "character") {
            clone.querySelector(".card-title").textContent = item.name;
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "💔 no favorites";
            clone.querySelector(".character-img").src = item.image;
        }

        if (type === "person") {
            clone.querySelector(".card-title").textContent = item.name;
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "💔 no favorites";
            clone.querySelector(".card-relevant-location").textContent = item.relevantLocation ? `📍 ${item.relevantLocation}` : "📍 no location";
            clone.querySelector(".person-img").src = item.imageUrl;
        }

        return clone;
    }

    /**
     * Fetches search results from the API and renders them on the page.
     *
     * @param {string} title - The title or name to search for.
     * @returns {Promise<void>}
     */
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

        let params = {};
        if (type === "anime") {
            params = { title: inputValue };
        } else if (type === "character" || type === "person") {
            params = { name: inputValue }; // Spring si aspetta name
        }

        axios.get(`/api/${type}/search`, { params })

            .then(function (res) {
                const results = Array.isArray(res.data) ? res.data : [];
                console.log(results)


                status.style.display = "none";

                summary.textContent = results.length + ' result for "' + inputValue + '"';
                summary.style.display = "block";

                if (results.length === 0) {
                    return;
                }

                results.forEach(function (item) {
                    const cardNode = renderCard(item);
                    grid.appendChild(cardNode);
                });
            })
            .catch(function (error) {
                console.error("Error fetching anime:", error);
                location.href = "/error";
            });
    }

    // Submit should navigate (keeps URLs shareable / refreshable)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputValue = input.value.trim();
            const selectedType = document.getElementById("searchType").value;

            if (!inputValue) return;

            // redirect
            window.location.href = `?title=${encodeURIComponent(inputValue)}&type=${selectedType}`;
        });
    }

    // Auto-run search if ?title=... is present
    if (initialTitle.trim()) {
        AxiosAndRender(initialTitle);
    }
});