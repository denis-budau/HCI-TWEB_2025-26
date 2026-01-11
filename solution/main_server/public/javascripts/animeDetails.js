const malId = document.getElementById("malId").value;

function loadSynopsis() {
    const malIdEl = document.getElementById("malId");
    const synopsisText = document.getElementById("synopsisText");
    const synopsisStatus = document.getElementById("synopsisStatus");

    if (!malIdEl || !synopsisText || !synopsisStatus) return;

    const malId = malIdEl.value;

    axios.get("/api/anime/" + malId)
        .then(function (response) {
            const anime = response.data;
            synopsisText.textContent = anime.synopsis || "No synopsis available.";
            synopsisStatus.textContent = "";
        })
        .catch(function (error) {
            console.error("Error fetching anime details:", error);
            location.href = "/error";
        });
}

document.addEventListener("DOMContentLoaded", loadSynopsis);
