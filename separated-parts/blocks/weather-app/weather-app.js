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

    if (cityName) {
        try {
            // you need to have entered openweathermap api key
            let apiKey = await readFile("../../../api-key.txt")

            // Geting coordinates of entered city
            const cityParametrs = await getCityParams(cityName, apiKey)
        }
        catch(err) {
            throw new Error("haven`t entered api key of openweathermap")
        }
    }
    else {
        alert("enter city name")
    }
}

function createAlertMessage(messageText) {
    const messagesContainer = document.querySelector(".messages-container")
    

    if (messagesContainer) {

    }
}

async function getCityParams(cityName, apiKey) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
    console.log(url)
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
        const responce = request.json

        return responce
    } else {
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