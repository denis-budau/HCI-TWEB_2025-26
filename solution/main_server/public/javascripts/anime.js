document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    const status = document.getElementById("statusMessage");
    const errorBox = document.getElementById("errorMessage");
    const summary = document.getElementById("resultsSummary");
    const grid = document.getElementById("resultsGrid");
    const emptyState = document.getElementById("emptyState");

    // If the page was opened with ?title=...
    const params = new URLSearchParams(window.location.search);
    const initialTitle = params.get("title") || input?.value || "";

    // Keep UI helpers small and obvious
    function setVisible(el, visible) {
        if (!el) return;
        el.classList.toggle("d-none", !visible);
    }

    // per evitare attacco xss
    function escapeHtml(str) {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function renderCard(anime) {
        const title = escapeHtml(anime.title ?? "Untitled");
        const titleJp = escapeHtml(anime.title_japanese ?? "");
        const score = anime.score ?? null;
        const episodes = anime.episodes ?? null;

        // If you stored list-like fields as comma-separated strings
        const genres = (anime.genres ?? "").toString().split(",").map(s => s.trim()).filter(Boolean);
        const studios = (anime.studios ?? "").toString().split(",").map(s => s.trim()).filter(Boolean);

        const badges = [
            ...genres.slice(0, 3).map(g => `<span class="badge text-bg-secondary me-1">${escapeHtml(g)}</span>`),
            ...studios.slice(0, 2).map(s => `<span class="badge text-bg-light border me-1">${escapeHtml(s)}</span>`),
        ].join("");

        const meta = [
            score !== null && score !== "" ? `⭐ ${escapeHtml(score)}` : null,
            episodes !== null && episodes !== "" ? `${escapeHtml(episodes)} eps` : null,
            titleJp ? `JP: ${titleJp}` : null,
        ].filter(Boolean).join(" · ");

        return `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2">${title}</h5>
            ${meta ? `<div class="text-muted small mb-3">${meta}</div>` : `<div class="text-muted small mb-3"> </div>`}
            <div class="mt-auto">
              ${badges || `<span class="text-muted small">No tags</span>`}
            </div>
          </div>
        </div>
      </div>
    `;
    }

    async function fetchAndRender(title) {
        const q = (title || "").trim();

        // Reset UI
        grid.innerHTML = "";
        setVisible(emptyState, false);
        setVisible(errorBox, false);
        setVisible(summary, false);

        if (!q) {
            setVisible(emptyState, true);
            emptyState.querySelector(".fw-semibold").textContent = "Type a title to search";
            return;
        }

        setVisible(status, true);

        try {
            const res = await fetch(`/api/anime/search?title=${encodeURIComponent(q)}`, {
                headers: { "Accept": "application/json" }
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();
            const results = Array.isArray(data) ? data : [];

            setVisible(status, false);

            summary.textContent = `${results.length} result(s) for "${q}"`;
            setVisible(summary, true);

            if (results.length === 0) {
                setVisible(emptyState, true);
                return;
            }

            grid.innerHTML = results.map(renderCard).join("");
        } catch (err) {
            console.error("Search failed:", err);
            setVisible(status, false);
            setVisible(errorBox, true);
        }
    }

    // Submit should navigate (keeps URLs shareable / refreshable)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const q = input.value.trim();
            window.location.href = `/anime?title=${encodeURIComponent(q)}`;
        });
    }

    // Auto-run search if ?title=... is present
    if (initialTitle.trim()) {
        fetchAndRender(initialTitle);
    }
});
