/**
 * Top50 Page Script
 */
document.addEventListener("DOMContentLoaded", () => {

    const status = document.getElementById("statusMessage");
    const statusText = document.getElementById("statusText");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const AnimeCard = document.getElementById("animeCardTemplate");
    const CharacterCard = document.getElementById("characterCardTemplate");
    const PersonCard = document.getElementById("personCardTemplate");
    const UserCard = document.getElementById("userCardTemplate");

    // Read URL parameter
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "anime"; // default: anime

    // Update page title
    const pageTitle = document.getElementById("pageTitle");
    if (type === "anime") pageTitle.innerText = "TOP 50 ANIME";
    else if (type === "character") pageTitle.innerText = "TOP 50 CHARACTER";
    else if (type === "person") pageTitle.innerText = "TOP 50 PERSON";
    else if (type === "userProfile") pageTitle.innerText = "TOP 50 USER";

    /**
     * Clone a card template and populate it with data based on type.
     *
     * @param {Object} item - Data of the anime, character, person, or user.
     * @param {number} [position] - Ranking position (used for character, person, user)
     * @returns {DocumentFragment} - A DOM node ready to be appended to the grid
     */
    function renderCard(item, position) {
        let template;
        if (type === "anime") template = AnimeCard;
        else if (type === "character") template = CharacterCard;
        else if (type === "person") template = PersonCard;
        else if (type === "userProfile") template = UserCard;

        const clone = template.content.cloneNode(true);

        if (type === "anime") {
            clone.querySelector(".card-title").textContent = item.title;
            // Gli anime usano il rank nativo del DB
            clone.querySelector(".rank-circle").textContent = item.rank || "N/A";
            clone.querySelector(".card-score").textContent = item.score ? `⭐ ${item.score}` : "⭐ no score";
            clone.querySelector(".card-genres").textContent = item.genres;
            clone.querySelector(".anime-img").src = item.imageUrl;
            clone.querySelector("a").href = `/animedetails?title=${encodeURIComponent(item.title)}`;
        }
        else if (type === "character") {
            clone.querySelector(".card-title").textContent = item.name;
            // Usiamo la posizione calcolata (1, 2, 3...)
            clone.querySelector(".rank-circle").textContent = position;
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "💔 0";
            clone.querySelector(".character-img").src = item.image;
        }
        else if (type === "person") {
            clone.querySelector(".card-title").textContent = item.name;
            // Usiamo la posizione calcolata (1, 2, 3...)
            clone.querySelector(".rank-circle").textContent = position;
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "💔 0";
            clone.querySelector(".card-relevant-location").textContent = item.relevantLocation ? `📍 ${item.relevantLocation}` : "📍 no location";
            clone.querySelector(".person-img").src = item.imageUrl;
        }

        else if (type === "userProfile") {
            clone.querySelector(".card-title").textContent = item.username || "no username";
            clone.querySelector(".rank-circle").textContent = position;
            clone.querySelector(".card-location").textContent = item.location ? `📍 ${item.location}` : "📍 no location";
            clone.querySelector(".card-completed").textContent = item.completed ? `Completed: ${item.completed}` : "Completed: 0";
            clone.querySelector(".card-dropped").textContent = item.watching ? `Dropped: ${item.watching}` : "Dropped: 0";
        }

        return clone;
    }

    // SHOW loading
    status.classList.remove("d-none");
    if (statusText) statusText.textContent = "Loading…";

    errorBox.classList.add("d-none");
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.add("d-none");

    axios.get(`/api/${type}`)
        .then(res => {
            status.classList.add("d-none"); // HIDE loading

            const top50 = res.data;
            if (!top50 || top50.length === 0) {
                if (emptyState) emptyState.classList.remove("d-none");
                return;
            }

            top50.forEach((item, index) => {
                const cardNode =
                    (type === "anime")
                        ? renderCard(item)
                        : renderCard(item, index + 1);

                grid.appendChild(cardNode);
            });
        })
        .catch(err => {
            console.error(err);
            status.classList.add("d-none"); // HIDE loading

            errorBox.classList.remove("d-none");
            errorBox.textContent = "Something went wrong while fetching data.";
        });
});