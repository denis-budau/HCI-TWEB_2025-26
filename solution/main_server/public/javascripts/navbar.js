function initNavbarSearch() {
    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    const type = document.getElementById("searchType");

    if (!form || !input || !type) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const query = input.value.trim();
        const selectedType = type.value;

        if (query.length === 0) return;

        // Simple encoding: replace spaces with +
        const safeQuery = query.split(" ").join("+");

        if (selectedType === "anime") {
            location.href = "/anime?title=" + safeQuery;
        } else if (selectedType === "character") {
            location.href = "/character?name=" + safeQuery;
        } else if (selectedType === "person") {
            location.href = "/persons?name=" + safeQuery;
        }
    });
}

// Run after page load
document.addEventListener("DOMContentLoaded", initNavbarSearch);
