const weatherCard = document.getElementById("weather-card")
const button = document.getElementById("weather-button")
const textField = document.getElementById("weather-textfield")

document.addEventListener("click", (Event) => {
    const target = Event.target

    if (target === button) {
        buttonHandler()
    }
})

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buttonHandler(event)
    }
})

async function buttonHandler(event) {
    const cityName = getCurrentCity()

    try {
        const weatherApikey = await getApiKey("../../../weather-api-key.txt")
        const geocodingApiKey = await getApiKey("../../../geocoding-api-key.txt")

        console.log(geocodingApiKey)
        if (cityName) {
            const weather = await getWeather(cityName, geocodingApiKey, weatherApikey)

            console.log(weather)
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

async function getWeather(city, geocodingApiKey, weatherApiKey) {
    try {
        const cityCoordinates = await getCityCoordinates(city, geocodingApiKey)
        const {lat, lon} = cityCoordinates
        console.log(lat, lon)
        const weather = await getCityForecast({lat, lon, apiKey: weatherApiKey})

        return weather
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
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

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



// http://api.openweathermap.org/geo/1.0/direct?q=moscow&appid=bfcaae99fa5d3adb994759bb405071b9