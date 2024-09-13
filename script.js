import * as components from "./blocks/components/index.js"
import * as modules from "./modules/index.js"

const button = document.getElementById("weather-button")
const apiKeyWeathermap = "bfcaae99fa5d3adb994759bb405071b9"

document.addEventListener("click", (event) => {
    const target = event.target

    if (target === button) {
        try {
            buttonHandler()
        }
        catch(err) {
            console.log(err)
            
            const alert = new components.modalFrame("Error")
            alert.create("something went wrong")
            alert.show().delete(4)
        }
    }
})

document.addEventListener('keypress', (event) => {
    if (event.key === "enter") {
        try {
            buttonHandler()
        }
        catch(err) {
            console.log(err)
            
            const alert = new components.modalFrame("Error")
            alert.create("something went wrong")
            alert.show().delete(4)
        }
    }
})

async function buttonHandler() {
    const coordinatesModule = new modules.cityCoordinates(apiKeyWeathermap)
    const weatherModule = new modules.weather(apiKeyWeathermap)
    const weatherCard = new components.weatherCard()


    const inputField = document.getElementById("weather-textfield")

    // Checks that user are not trying to make request without entered city name
    if (inputField.value) {
        coordinatesModule.cityName = inputField.value

        const coordinates = await coordinatesModule.getCityCoord()
        const temp = await weatherModule.getCurrentWeather(coordinates.lat, coordinates.lon)

        // just to make sure that fields are empty
        weatherCard.clear()
        weatherCard.temp = temp
        console.log(temp)
    }
    else {
        const alert = new components.modalFrame("Error")
        alert.create("Error: trying to get weather without city name. Please, enter city name")
        alert.show().delete(5)

        throw new Error("trying to make request without city name")
    }
}