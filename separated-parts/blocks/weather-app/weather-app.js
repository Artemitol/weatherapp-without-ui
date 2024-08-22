const weatherCard = document.getElementById("weather-card")
const button = document.getElementById("weather-button")
const textField = document.getElementById("weather-textfield")

weatherCard.classList.add("hidden")

document.addEventListener("click", (Event) => {
    const target = Event.target

    if (target === button) {
        buttonHandler()
    }
    
    function buttonHandler(event) {
        const cityName = getCurrentCity()

        if (cityName) {
            const url = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&appid={API key}"

            weatherRequest(url)
        }
    }

    async function weatherRequest(url) {
        
    }
})

const getTextValue = (element) => {
    const text = element.value
    const result = text.trim()

    if (result) return result
}

const getCurrentCity = () => {
    return getTextValue(textField)
}