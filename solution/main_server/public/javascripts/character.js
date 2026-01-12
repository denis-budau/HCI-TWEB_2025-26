/*document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const card = document.getElementById("characterCardTemplate");

    // If the page was opened with ?name=...
    const params = new URLSearchParams(window.location.search);
    const initialName = params.get("name") || input?.value || "";


    function renderCard(character) {
        const clone = card.content.cloneNode(true);

        clone.querySelector(".card-name").textContent = character.name;
        clone.querySelector(".card-favorites").textContent = character.favorites;
        clone.querySelector(".card-img-top").src = character.image;

        return clone;
    }

    async function AxiosAndRender(name) {
        const inputValue = (name || "").trim();

        // Reset UI
        grid.innerHTML = "";
        emptyState.style.display = "none";
        errorBox.style.display = "none";
        summary.style.display = "none";

        if (!inputValue) {
            emptyState.style.display = "block"
            emptyState.querySelector(".fw-semibold").textContent = "Type a name to search";
            return;
        }

        status.style.display = "block"

        axios.get("/api/character/search", {params: {name: inputValue}})
            .then(function (res) {
                const results = Array.isArray(res.data) ? res.data : [];

                status.style.display = "none";

                summary.textContent = results.length + ' result for "' + inputValue + '"';
                summary.style.display = "block";

                if (results.length === 0) {
                    return;
                }

                results.forEach(function (character) {
                    const cardNode = renderCard(character);
                    grid.appendChild(cardNode);
                });
            })
            .catch(function (error) {
                console.error("Error fetching character:", error);
                location.href = "/error";
            });
    }

    // Submit should navigate (keeps URLs shareable / refreshable)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputValue = input.value.trim();
            window.location.href = `/character/search?name=${encodeURIComponent(inputValue)}`;
        });
    }

    // Auto-run search if ?name=... is present
    if (initialName.trim()) {
        AxiosAndRender(initialName);
    }
});*/