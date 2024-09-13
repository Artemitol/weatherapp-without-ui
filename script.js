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

function buttonHandler() {
    console.log(modules)
}

function enterHandler() {

}


