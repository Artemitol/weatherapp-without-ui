class modalFrame {
    _type = null
    _domLink = null
    _message = null
    _messageNode = null
    _isExisting = false
    
    constructor(type) {
        this._type = type
        this._message = type
        
        this.create()
    }
    
    
    // Geters and seters
    get domLink() {
        return this._domLink
    }

    get isExisting() {
        return this._isExisting
    }

    get type() {
        return this._type
    }

    get message() {
        return this._message
    }
    set message(value) {
        if (this._isExisting) {
            this._message = value

            this._messageNode.innerText = value
        } 
        else {
            throw new Error("cant edit message text, becase message card is not existing")
        }
    }


    // creating card, but not adding to the DOM
    create(messageText = this._type) {
        const element = document.createElement("div")
        const elementInner = document.createElement("div")
        const message = document.createElement("span")
        const icon = document.createElement("span")

        element.classList.add("modal-frame")
        elementInner.classList.add("modal-frame__inner")
        message.classList.add("modal-frame__text")
        icon.classList.add("modal-frame__icon")

        message.innerText = messageText
        icon.innerHTML = "<b>&times;</b>"

        elementInner.append(message, icon)
        element.append(elementInner)
        
        this._domLink = element 
        this._messageNode = message
        this._isExisting = true
        
        icon.onclick = this.delete.bind(this)

        return this
    }

    // shows card on user screen
    show() {
        // Geting alerts container, DOM element which created to store all alerts
        const modalFramesContainer = document.getElementById("alerts-container")

        modalFramesContainer.prepend(this._domLink)

        return this
    }

    // deleting card, timeout is allowed
    delete(delay = 0) {  
        // multiplicated by 1000 because setTimeout works with milisecconds
        setTimeout(() => { this._domLink.remove() }, delay * 1000)

        // Also turning flag in "false" state because card now is not existing
        this._isExisting = false

        return this
    }
}

export { modalFrame } 