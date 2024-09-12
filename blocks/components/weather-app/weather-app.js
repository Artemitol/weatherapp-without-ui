document.addEventListener("click", (event) => {
    const target = event.target

    if (target === button) {
        buttonHandler()
    }
    else if (target.closest("#weather-card")) {
        weatherCard.classList.add("hidden")

        // Reseting input fields to avoid any problems in the future
        cityNameDisplay.value = ""
        temperatureDisplay.value = ""
        typeDisplay.value = ""
    }
})

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buttonHandler()
    }
})

async function buttonHandler() {
    const cityName = getCurrentCity()

    try {
        const weatherApikey = await getApiKey("../../../weather-api-key.txt")
        const geocodingApiKey = await getApiKey("../../../geocoding-api-key.txt")

        if (cityName) {
            const weather = await getWeather(cityName, geocodingApiKey, weatherApikey)
            weather.cityName = cityName

            insertDataToTheCard(weather)
        }
        else {
            const alert = createAlertMessage("Error: enter city name")

            displayAlert(alert, 3)
        }
    }
    catch(err) {
        displayAlert(createAlertMessage(err), 10)
        console.log(err)
    }
}

function insertDataToTheCard(data) {
    const {currentTemperature: temp, maxTemp, minTemp, weatherStatus: status, cityName} = data

    if (weatherCard.classList.contains("hidden")) {
        weatherCard.classList.remove("hidden")
    }

    cityNameDisplay.prepend = cityName
    temperatureDisplay.prepend = `${temp} min: ${minTemp} max: ${maxTemp}`
    typeDisplay.prepend = status
}

async function getWeather(city, geocodingApiKey, weatherApiKey) {
    try {
        const cityCoordinates = await getCityCoordinates(city, geocodingApiKey)
        const {lat, lon} = cityCoordinates

        const weather = await getCityForecast({lat, lon, apiKey: weatherApiKey})

        const result = {
            currentTemperature: weather.main?.temp,
            maxTemp: weather.main["temp_max"],
            minTemp: weather.main["temp_min"],
            weatherStatus: weather.weather[0].main
        }

        return result
    }
    catch(err) {
        throw new Error(`weather service not working, error message: ${err}`)
    }
}

async function getApiKey(path) {
    try {
        // you need to have entered api key
        let apiKey = await readFile(path)

        return apiKey
    }
    catch(err) {
        throw new Error("haven`t entered api key")
    }
}

function displayAlert(alert, delayBeforeClose) {
    const messagesContainer = document.getElementById("alerts-container")

    messagesContainer.prepend(alert)

    if (delayBeforeClose) {
        setTimeout(() => {closeButtonHandler(alert)}, delayBeforeClose * 1000) 
    }
}

function createAlertMessage(messageText) {
    const alert = document.createElement("div")
    const alertInner = document.createElement("div")
    const alertMessage = document.createElement("span")
    const alertIcon = document.createElement("span")

    alert.classList.add("modal-frame")
    alertInner.classList.add("modal-frame__inner")
    alertMessage.classList.add("modal-frame__text")
    alertIcon.classList.add("modal-frame__icon")

    alertMessage.innerText = messageText
    alertIcon.innerHTML = "<b>&times;</b>"

    alertInner.append(alertMessage, alertIcon)
    alert.append(alertInner)

    return alert
}

async function getCityCoordinates(cityName, apiKey) {
    const url = `https://api.geocodify.com/v2/geocode?api_key=${apiKey}&q=${cityName}`

    try {
        const req = await request(url)
        const result = {
            lat: 0,
            lon: 0,
        }

        const response = req?.response
        const coordinates = response.features[0].geometry.coordinates

        result.lon = coordinates[0]
        result.lat = coordinates[1]

        return result
    }
    catch(err) {
        displayAlert(createAlertMessage("cant get city coordinates"), 5)
        throw new Error(err)
    }
}

async function getCityForecast({lat, lon, apiKey}) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

    try {
        const responce = await request(url)

        return responce
    }   
    catch(err) {
        throw new Error(err)
    }
}

async function request(url) {
    const request = await fetch(url)

    if (request.status === 200) {
        const responce = request.json()

        return responce
    } 
    else {
        throw new Error("failed to fetch")
    }
}

async function readFile(url) {
    try {
        const file = await getFile(url) 
        const result = await readBlobFile(file)
        
        return result
    }
    catch(err) {
        throw new Error(err)
    }
}

async function getFile(url) {
    const request = await fetch(url)
    
    if (request.ok) {
        const result = await request.blob()

        return result 
    }
    else {
        console.log(`file with path: "${url}" doesnot exists`)
        throw new Error("file doesn`t exists")
    }
}

async function readBlobFile(blobFile) {
    const reader = new FileReader()
    reader.readAsText(blobFile)

    return new Promise((resolve) => {
        reader.onload = (event) => {
            const target = event.target
            const result = target.result.trim()
            
            resolve(result)
        }
        reader.onerror = () => {
            throw new Error("something went wrong while parsing text value from text")
        }
    })
}

const getTextValue = (element) => {
    const text = element.value
    const result = text.trim()

    if (result) return result
}

const getCurrentCity = () => {
    return getTextValue(textField)
}

const weatherCard = class weather {
    _temp = null
    _tempMax = null
    _tempMin = null 
    _isExisting = false
    _cityName = null


    //  Geters and seters
    get temp() {
        return this._temp
    }
    set temp(value) {
        const temperature = document.getElementById("temperature")
        temperature.textContent = value

        this._temp = value
    }

    get tempMin() {
        return this._tempMin
    }
    set tempMin(value) {
        const temperature = document.getElementById("temperature-min")
        temperature.textContent = value

        this._tempMin = value
    }
    
    get tempMax() {
        return this._tempMax
    }
    set tempMax(value) {
        const temperature = document.getElementById("temperature-max")
        temperature.textContent = value

        this._tempMax = value
    }

    get cityName() {
        return this._cityName
    }
    set cityName(value) {
        const cityName = document.getElementById("city-name")
        cityName.textContent = value

        this._cityName = value
    }


    // Functions
    show() {
        const card = document.getElementById("weather-card")
        card.classList.remove("hidden")

        this._isExisting = true
    }

    hide() {
        const card = document.getElementById("weather-card")
        card.classList.add("hidden")

        this._isExisting = false
    }

    // method clears all fields value
    clear() {
        this.temp = ""
        this.tempMax = ""
        this.tempMin = ""
        this.cityName = ""
    }
}

export { weatherCard }