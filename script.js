import * as components from "./blocks/components/index.js"
import * as modules from "./modules/index.js"

const button = document.getElementById("weather-button")
const apiKeyWeathermap = "bfcaae99fa5d3adb994759bb405071b9"

document.addEventListener("click", (event) => {
    const target = event.target

    if (target === button) {
        buttonHandler()
    }
})

document.addEventListener('keypress', (event) => {
    if (event.key === "enter") {
        enterHandler()
    }
})

async function buttonHandler() {
    const coordinatesModule = new modules.cityCoordinates(apiKeyWeathermap)
    const weatherModule = new modules.weather(apiKeyWeathermap)
    console.log(components)

    // const coordinates = await coordinatesModule.getCityCoord()
    // const temp = await weatherModule.getCurrentWeather(coordinates.lat, coordinates.lon)

}

async function enterHandler() {

}


