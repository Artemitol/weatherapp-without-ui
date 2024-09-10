import * as components from "./blocks/components/index.js"
import { request } from "./modules/request.js"
import { weather } from "./modules/weather.js"

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

const apiKey = "yWp9t1cjlgYOVAtUhh4xjebR3LsgOvD9"
const apiKeyWeathermap = "bfcaae99fa5d3adb994759bb405071b9"