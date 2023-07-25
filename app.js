let weather = {
    "apiKey": "PASTE_YOUR_API_KEY_FROM_OPENWEATHER",
    fetchWeather: function (city) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").textContent = `Weather in ${name}`;
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp-value").textContent = temp;
        document.querySelector(".description").textContent = description;
        document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
        document.querySelector(".wind").textContent = `Wind speed: ${speed} km/h`;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = `url("https://source.unsplash.com/random/2560x1440/?${name}")`;
    },
    search: function () {
        const city = document.querySelector(".search input").value;
        this.fetchWeather(city);
    }
}

const searchButton = document.querySelector(".search button");

searchButton.addEventListener("click", () => {
    weather.search();
});

const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        weather.search();
    }
})

weather.fetchWeather("London");
