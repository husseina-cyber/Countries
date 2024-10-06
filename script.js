let countryCard = document.querySelector(".country-card")
let countrySelect = document.getElementById("countrySelect");
let searchInput = document.getElementById("searchInput");
let allCountriesData = [];

fetch("https://restcountries.com/v3.1/all").then((response) => response.json())
.then((data) => {
    allCountriesData = data;
    displayCountries(allCountriesData);
});

function displayCountries(countries){
    countryCard.innerHTML = '';
    countries.forEach((value) => {
        let card = document.createElement("div");
        card.classList.add('item');

        card.innerHTML = ` 
        <img src = "${value.flags.png}"   width = "220px" height="230px"/>
        <p>Name: ${value.name.common}</p>
        <p>Population: ${value.population}</p>
        <p>Region: ${value.region}</p>
        <p>Capital: ${value.capital}</p>
        `;
        countryCard.appendChild(card)

    });
}

function filterCountries() {
    let selectedRegion = countrySelect.value;
    let filteredCountries = allCountriesData;

    if (selectedRegion !== "all") {
        filteredCountries = allCountriesData.filter(country => country.region ===selectedRegion);
    }
    displayCountries(filteredCountries);
}

countrySelect.addEventListener("change", filterCountries);

searchInput.addEventListener("input",()=>{
    let searchQuery = searchInput.value.toLowerCase();
    let filteredCountries = allCountriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery)


    );
    displayCountries(filteredCountries);
})

  