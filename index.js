let display = document.querySelector('.inputDisplay')
let buttons = document.querySelectorAll('.key')
let clearButton = document.getElementById('backspace')
let capsLockButton = document.getElementById('caps')
let languageSwitchButton = document.getElementById('languageSwitch')
let capsLockEnabled = false
let isEnglishLayout = false

// печать обычных символов начало
for (let button of buttons) {
    button.onclick = function () {
        let char = button.textContent
        let displayText = display.textContent
        displayText = displayText + char

        if (display.scrollWidth > display.clientWidth) {
            displayText = displayText.slice(0, -1)
        }

        display.textContent = displayText
    }
}
// печать обычных символов конец

// бэкспэйс начало
clearButton.onclick = function () {
    let displayText = display.textContent
    displayText = displayText.slice(0, -1)
    display.textContent = displayText
}
// бэкспэйс конец

// пробел начало
let spaceButton = document.getElementById('space')
spaceButton.onclick = function () {
    let displayText = display.textContent
    displayText = displayText + ' '
    display.textContent = displayText
}
// пробел конец

// капс начало
capsLockButton.onclick = function () {
    capsLockEnabled = !capsLockEnabled
    let capsLockImage = document.getElementById('capsLockImage')

    if (capsLockEnabled) {
        for (let button of buttons) {
            if (!button.querySelector('img')) {
                button.textContent = button.textContent.toUpperCase()
            }
        }
        capsLockImage.src = "./img/capslockActive.svg"
    } else {
        for (let button of buttons) {
            if (!button.querySelector('img')) {
                button.textContent = button.textContent.toLowerCase()
            }
        }
        capsLockImage.src = "./img/capslock.svg"
    }
}
// капс конец

// изменения языков начало
languageSwitchButton.onclick = function () {
    for (let button of buttons) {
        let currentText = button.textContent
        let russianText = getRussianEquivalent(currentText)
        let englishText = getEnglishEquivalent(currentText)

        let icon = button.querySelector('img')
        let currentHTML = button.innerHTML

        if (isEnglishLayout) {
            button.textContent = russianText
            if (icon) {
                button.innerHTML = russianText
                button.appendChild(icon)
            } else {
                button.innerHTML = russianText
            }
        } else {
            button.textContent = englishText
            if (icon) {
                button.innerHTML = englishText
                button.appendChild(icon)
            } else {
                button.innerHTML = englishText
            }
        }
    }

    isEnglishLayout = !isEnglishLayout
}

function getEnglishEquivalent(text) {
    let russianLayout = "йцукенгшщзхъфывапролджэячсмитьбюё"
    let englishLayout = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`"

    let englishText = ""
    for (let i = 0; i < text.length; i++) {
        let currentChar = text[i]
        let index = russianLayout.indexOf(currentChar)
        if (index !== -1) {
            let englishChar = englishLayout[index]
            englishText += englishChar
        } else {
            englishText += currentChar
        }
    }

    return englishText
}

function getRussianEquivalent(text) {
    let russianLayout = "йцукенгшщзхъфывапролджэячсмитьбюё"
    let englishLayout = "qwertyuiop[]asdfghjkl;'zxcvbnm,.`"

    let russianText = ""
    for (let i = 0; i < text.length; i++) {
        let currentChar = text[i]
        let index = englishLayout.indexOf(currentChar)
        if (index !== -1) {
            let russianChar = russianLayout[index]
            russianText += russianChar
        } else {
            russianText += currentChar
        }
    }

    return russianText
}
// изменения языков конец