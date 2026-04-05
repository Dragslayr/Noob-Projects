let section = document.querySelector("section");
let input = document.querySelector("input");
let button = document.querySelector("button");
let result = document.querySelector(".result");
let form = document.querySelector("form");

class Details {
  constructor(city, temp, feelLike, condition, icon, humidity, wind) {
    this.city = city;
    this.temp = temp;
    this.feelLike = feelLike;
    this.condition = condition;
    this.icon = icon;
    this.humidity = humidity;
    this.wind = wind;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value;
  const apiKey = "a476182723d8419d978163025260504";
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  try {
    result.innerHTML = `<p>Loading...</p>`;
    let res = await fetch(url);
    let data = await res.json();
    let details = new Details(
      data.location.name,
      data.current.temp_c,
      data.current.feelslike_c,
      data.current.condition.text,
      "https:" + data.current.condition.icon,
      data.current.humidity,
      data.current.wind_kph,
    );
    console.log(details);
    result.innerHTML = `
      <h2>${details.city}</h2>
      <p>Temperature: ${details.temp}°C</p>
      <p>Feels Like: ${details.feelLike}°C</p>
      <p>Condition: ${details.condition}</p>
      <img src="${details.icon}" alt="Weather Icon" />
      <p>Humidity: ${details.humidity}%</p>
      <p>Wind Speed: ${details.wind} kph</p>
    `;
  } catch (error) {
    result.innerHTML = `
      Error fetching weather data. Please try again later.`;
    console.error("Error fetching weather data:", error);
  }
});
