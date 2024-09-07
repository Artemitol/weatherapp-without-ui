document.addEventListener("click", (event) => {
    const target = event.target.closest("SPAN.modal-frame__icon")
    
    if (target && target.closest("DIV.modal-frame") && target.classList.contains("modal-frame__icon")) {
        closeButtonHandler(target)
    }
})

function closeButtonHandler(target) {
    const dialog = target.closest("DIV.modal-frame")
    
    dialog.remove()
}