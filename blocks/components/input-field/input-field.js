const input = class inputField {
    _value = null
    _domLink = null
    
    constructor() {
        this._domLink = document.getElementById("weather-textfield")
    }

    get value() {
        return this._value
    }

    get domLink() {
        return this._domLink
    }


    // Functions
    getCityName() {
        this._value = this.domLink.textContent

        return this.value
    }
}