import * as components from "./blocks/components/index.js"
import * as modules from "./modules/index.js"

const button = document.getElementById("weather-button")

document.addEventListener("click", () => {
    const target = Event.target

    if (target === button) {
        console.log("button")
    }
})

document.addEventListener('keypress', () => {
    if (Event.key === "enter") {
        console.log("enter")
    }
})

const apiKeyWeathermap = "bfcaae99fa5d3adb994759bb405071b9"

