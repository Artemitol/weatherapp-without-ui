class weatherCard {
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
        card.classList.toggle("hidden")

        this._isExisting = true
    }

    hide() {
        const card = document.getElementById("weather-card")
        card.classList.toggle("hidden")

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
