import { apiKey } from "./api_key.js"; // Import the apiKey from a seperate JS file (use relative path)

/*
Asynchronous functions are functions that allow multiple instructions to be run at the same time in the code.
This happens via promises, a system where a process promises a result and the main code halts until the promise resolves.
This is most commonly used for HTTP requests, because the fetch() function returns a promise and the await keyword waits until that promise is resolved.
*/
async function getWeatherData() {
  try {
    const lat = 40.8448; const lon = 73.8648; // Latitude and longitude of the bronx\
    const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${apiKey}`;
    const res = await fetch(url); // Send a GET request to the API

    if (!res.ok) throw new Error("HTTP error: " + res.status); // If the HTTP status isn't OK (200), throw an error
    const data = await res.json(); // Get the response body as JSON
    return data; // Return the data

  } catch (e) { // Catch any errors
    alert(e); // Create a popup with the error message
    return e; // Return the error
  }
}

async function displayWeatherData() {
  const weatherData = await getWeatherData();
  const pollutionText = document.getElementById("air-pollution");
  alert(weatherData.data)
  pollutionText.innerText = `Air Quality in the Bronx: ${weatherData.data.aqi}`;
  
  const weatherMeasure = document.getElementById("air-pollution-scale");
  weatherMeasure.value = weatherData.data.aqi;
  
  const extraData = document.querySelector(".extra-data");
  const components = weatherData.data.iaqi;
  
  for (const key of Object.keys(components)) {
    const pTag = document.createElement("p");
    for (const subkey of Object.keys(key)) {
      pTag.innerText = `${key}: ${subkey}`;
    }
    extraData.appendChild(pTag);
  }
}

displayWeatherData();