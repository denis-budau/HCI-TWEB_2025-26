document.addEventListener("DOMContentLoaded", () => {

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    const AnimeCard = document.getElementById("animeCardTemplate");
    const CharacterCard = document.getElementById("characterCardTemplate");
    const PersonCard = document.getElementById("personCardTemplate");

    // Leggi il parametro ?type=...
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "anime"; // default: anime

    // Imposta il titolo della pagina
    const pageTitle = document.getElementById("pageTitle");
    if (type === "anime") pageTitle.innerText = "TOP 50 ANIME";
    else if (type === "character") pageTitle.innerText = "TOP 50 CHARACTERS";
    else if (type === "person") pageTitle.innerText = "TOP 50 PERSONS";

    function renderCard(item, position) {
        let template;
        if (type === "anime") template = AnimeCard;
        else if (type === "character") template = CharacterCard;
        else if (type === "person") template = PersonCard;

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
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "❤️ 0";
            clone.querySelector(".character-img").src = item.image;
        }
        else if (type === "person") {
            clone.querySelector(".card-title").textContent = item.name;
            // Usiamo la posizione calcolata (1, 2, 3...)
            clone.querySelector(".rank-circle").textContent = position;
            clone.querySelector(".card-favorites").textContent = item.favorites ? `❤️ ${item.favorites}` : "❤️ 0";
            clone.querySelector(".card-relevant-location").textContent = item.relevantLocation ? `📍 ${item.relevantLocation}` : "📍 no location";
            clone.querySelector(".person-img").src = item.imageUrl;
        }
        return clone;
    }

    // Fetch Top 50 dal server
    axios.get(`/api/${type}`)
        .then(res => {
            const top50 = res.data;
            if (!top50 || top50.length === 0) {
                if (emptyState) emptyState.style.display = "block";
                return;
            }

            top50.forEach((item, index) => {
                let cardNode;
                // Se è anime passiamo solo item, altrimenti passiamo anche la posizione
                if (type === "anime") {
                    cardNode = renderCard(item);
                } else {
                    cardNode = renderCard(item, index + 1);
                }
                grid.appendChild(cardNode);
            });
        })
        .catch(err => {
            console.error(err);
            errorBox.style.display = "block";
            errorBox.textContent = "Something went wrong while fetching anime.";
        });
});