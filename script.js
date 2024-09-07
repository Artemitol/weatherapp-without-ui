import * as components from "./blocks/components"


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