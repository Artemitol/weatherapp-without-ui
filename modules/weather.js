import { requests } from "./request.js"

// Class helps working with openweathermap api
class weather extends requests {
    _apiKey = null
    _temp = null

    constructor(apiKey) {
        super()
        this._apiKey = apiKey
    }
    

    // Geters and seters
    get temp() {
        return this._temp
    }


    // Functions
    async getCurrentWeather(lat, lon) {
        try {
            this._url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            
            // Using getJson() from parrent class
            await this.getJson()
            
            // after request inserting temperature object to the temp
            this._temp = this._response.main

            return this._temp
        }
        catch {
            console.log("failed to get weather, something went wrong with openweathermap")
            throw new Error("something went wrong while trying to get weather from api")
        }
    }
}

export { weather }