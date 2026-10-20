
const input = document.getElementById("city");
const btn = document.getElementById("search-btn");
const resultat = document.getElementById("resultat-meteo");

async function rechercherMeteo() {
    const city = input.value.trim();

    // Vérifier que le champ n'est pas vide
    if (city === "") {
        alert("Entrez une ville !");
        return;
    }

    resultat.textContent = "Recherche de la météo...";

    try {
        // 1. Rechercher la ville et ses coordonnées
        const geoURL =
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`;

        const geoResponse = await fetch(geoURL);

        if (!geoResponse.ok) {
            throw new Error("Erreur lors de la recherche de la ville.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultat.textContent =
                "Ville introuvable. Vérifiez son nom.";
            return;
        }

        const lieu = geoData.results[0];
        const latitude = lieu.latitude;
        const longitude = lieu.longitude;

        // 2. Récupérer la météo actuelle
        const meteoURL =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

        const meteoResponse = await fetch(meteoURL);

        if (!meteoResponse.ok) {
            throw new Error("Erreur lors de la récupération de la météo.");
        }

        const meteoData = await meteoResponse.json();
        const meteo = meteoData.current;

        // 3. Traduire le code météo
        const descriptions = {
            0: "Ciel dégagé",
            1: "Principalement dégagé",
            2: "Partiellement nuageux",
            3: "Ciel couvert",
            45: "Brouillard",
            48: "Brouillard givrant",
            51: "Bruine légère",
            53: "Bruine modérée",
            55: "Bruine dense",
            56: "Bruine verglaçante légère",
            57: "Bruine verglaçante dense",
            61: "Pluie faible",
            63: "Pluie modérée",
            65: "Pluie forte",
            66: "Pluie verglaçante légère",
            67: "Pluie verglaçante forte",
            71: "Neige faible",
            73: "Neige modérée",
            75: "Neige forte",
            77: "Grains de neige",
            80: "Averses faibles",
            81: "Averses modérées",
            82: "Averses violentes",
            85: "Averses de neige faibles",
            86: "Averses de neige fortes",
            95: "Orage",
            96: "Orage avec grêle légère",
            99: "Orage avec forte grêle"
        };

        const description =
            descriptions[meteo.weather_code] ??
            "Conditions météo variables";

        // 4. Afficher les résultats
        resultat.textContent =
            `${lieu.name}, ${lieu.country}\n` +
            `Température : ${meteo.temperature_2m} °C\n` +
            `Ressenti : ${meteo.apparent_temperature} °C\n` +
            `Conditions : ${description}\n` +
            `Humidité : ${meteo.relative_humidity_2m} %\n` +
            `Vent : ${meteo.wind_speed_10m} km/h`;

    } catch (erreur) {
        console.error(erreur);

        resultat.textContent =
            "Impossible de récupérer la météo. Vérifiez votre connexion.";
    }
}

// Un seul événement pour le bouton
btn.addEventListener("click", rechercherMeteo);

// Permet aussi de rechercher avec la touche Entrée
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        rechercherMeteo();
    }
});
