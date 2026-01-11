document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");

    if (!form || !input) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // ❌ blocca il submit
        const query = input.value.trim();
        if (!query) return;

        // Navigate to anime results page
        window.location.href = `/anime/search?title=${encodeURIComponent(query)}`;
    });
});