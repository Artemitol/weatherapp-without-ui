const request = class requestClass {
    _url = null
    _status = null
    _responce = null

    constructor(url) {
        this._url = url
    }

    // Functions
    async getData() {
        const request = await fetch(this.url)

        if (request.status === 200) {
            this._status = "ok"
            this._responce = request.responce
        } 
        else {
            this._status = "error"
            
            console.log(`request with url:${this._url} failed, status was not 200`)
            throw new Error("something went wrong while fetching")
        }
    }


    // Geters and seters
    get url() {
        return this._url
    }

    get status() {
        return this._status
    }

    get responce() {
        return this._responce
    }
}

// This class helps to make requests for the coodrinates of city
const coordinates = class cityCoordinates extends request {
    _cityName = null
    _apiKey = null
    _lat = null
    _lon = null
    
    constructor(apiKey) {
        this._apiKey = apiKey
    }


    // Functions
    async getApiKey() {

    }

    async getCityCoord() {
        try {
            // using getData() from parrent class 'request'
            await this.getData()

            const coordinates = this._responce?.features[0].geometry.coordinates

            this._lon = coordinates[0]
            this._lat = coordinates[1]
        }
        catch(err) {
            console.log(`cant get city coord by url: ${this._url}`)
            throw new Error(err)
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

    get apiKey() {
        return this._apiKey
    }

    get lat() {
        return this._lat
    }

    get lon() {
        return this._lon
    }
}