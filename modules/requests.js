const request = class requestClass {
    _url = null
    _status = null
    _responce

    constructor(url) {
        this._url = url
    }

    // Functions
    async getData() {
        const request = await fetch(this.url)

        if (request.status === 200) {
            this._status = "ok"
            this._responce = request.json
        } 
        else {
            this._status = "error"
            
            console.log(`request with url:${this._url} failed, status was not 200`)
            throw new Error("something went wrong while fetching")
        }

        return this
    }


    // Geters and seters
    get url() {
        return this._url
    }

    get status() {
        return this._status
    }
}

const coordinates = class cityCoordinates extends request {
    _apiKey = null
    _lat = null
    _lon = null

    constructor(url) {
        this._url = url
    }


    // Functions
    async getApiKey() {

    }

    async getCityCoord() {
        try {
            // using getData() from parrent class 'request'
            const request = await this.getData()
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
}