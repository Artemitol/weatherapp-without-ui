const modalFrame = class alertWindow {
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


    // functions
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

    show() {
        const modalFramesContainer = document.getElementById("alerts-container")

        modalFramesContainer.prepend(this._domLink)

        return this
    }

    delete() {  
        this._domLink.remove()

        this._isExisting = false

        return this
    }

    // Getters and seters
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
    }

    get domLink() {
        return this._domLink
    }

    get isExisting() {
        return this._isExisting
    }
}

export { modalFrame } 