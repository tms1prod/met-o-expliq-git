 /*fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`)
        .then(response => response.json())
        .then(data => {
            afficherVille(data);
        })
        .catch(error => {
            console.error("Erreur :", error);
        });
});
function afficherVille(data){
    // Création du bloc HTML
    const div = document.createElement("div");
    div.classList.add("ville");

    div.innerHTML = `
        <span class="material-symbols-outlined">device_thermostat</span>
        <h3>${data.name}</h3>
        <p id="description">${data.weather[0].description}</p>
        <p id="humidite">Humidité : ${data.main.humidity}%</p>
        <p class="temp">${Math.round(data.main.temp)}°C</p>
    `;

    // Ajout dans la liste
    villeContainer.appendChild(div);*/
}