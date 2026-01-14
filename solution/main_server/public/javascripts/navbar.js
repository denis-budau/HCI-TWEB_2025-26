/**
 * Initializes the navbar search functionality.
 *
 * This script sets up an event listener on the search form in the navbar.
 * When the form is submitted:
 * 1. It prevents the default form submission behavior.
 * 2. Reads the search input value and the selected type (anime, character, person).
 * 3. Encodes the query by replacing spaces with "+".
 * 4. Redirects the user to the `/search` page with query parameters `title` and `type`.
 */
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

        location.href =`/search?title=${safeQuery}&type=${selectedType}`;

    });
}

// Run after page load
document.addEventListener("DOMContentLoaded", initNavbarSearch);
