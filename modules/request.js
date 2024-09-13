class requests {
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

export { requests }