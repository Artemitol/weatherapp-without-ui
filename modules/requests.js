const request = class requestClass {
    _url = null
    _response = null

    constructor(url) {
        this._url = url
    }

    // Functions
    async getJson() {
        const request = await fetch(this.url)

        if (request.status == 200) {
            this._response = await request.json()

            return this._response
        } 
        else {            
            console.log(`request with url:${this._url} failed, status was not 200`)
            throw new Error("something went wrong while fetching")
        }
    }


    // Geters and seters
    get url() {
        return this._url
    }

    get response() {
        return this._response
    }
}

// This class helps to make requests for the coodrinates of city
const coordinates = class cityCoordinates extends request {
    _cityName = null
    _apiKey = null
    _lat = null
    _lon = null
    
    constructor(apiKey) {
        super()
        this._apiKey = apiKey
    }


    // Functions
    async getCityCoord() {
        if (this._cityName) {
            try {
                this._url = "http://api.openweathermap.org/geo/1.0/direct?q=" + this._cityName + "&limit=1&appid=" + this._apiKey

                // using getJson() from parrent class 'request'
                await this.getJson()

                const coordinates = this._response[0]
    
                this._lat = coordinates.lat
                this._lon = coordinates.lon

                const result = {
                    lon: this._lon, 
                    lat: this._lat     
                }

                return result
            }
            catch(err) {
                console.log(`cant get city coord by url: ${this._url}`)
                throw new Error(err)
            }
        }
        else {
            console.log("trying to get coordinates without city name")
        }
    }


    // Geters and seters
    get lat() {
        return this._lat
    }
    
    get lon() {
        return this._lon
    }

    get cityName() {
        return this._cityName
    }
    set cityName(value) {
        this._cityName = value
    }

    get lat() {
        return this._lat
    }

    get lon() {
        return this._lon
    }
}