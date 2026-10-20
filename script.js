console.log('zzz')


const API_Key="http://api.openweathermap.org/geo/1.0/direct?q=${ville},{state code},{country code}&limit={limit}&appid={f489c7c6af1ff95913a631dcb7c86c52}";

const villecontainer = document.getElementById("ville");
const weather = document.querySelector("weather-card");
const city=document.getElementById("city");
const btn = document.getElementById ("search-btn");
console.log("btn ",btn)

btn.addEventListener("click", () => {
console.log("city", city.value);
    /*
    const city = input.value.trim();

    if(city === ("")){
        alert("Entrez une ville !");
        return;
    }*/
})