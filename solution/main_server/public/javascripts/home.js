document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("searchBtn");
    const input = document.getElementById("searchInput");

    if (!btn || !input) return;

    btn.addEventListener("click", () => {
        const query = input.value.trim();
        if (!query) return;

        // Navigate to anime results page (Pattern B)
        window.location.href = `/anime?title=${encodeURIComponent(query)}`;
    });
});
