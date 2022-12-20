
function renderDaily(day, month, year) {

    //Generating parent flex div
    const main = document.getElementById('content')
    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('id', 'dayContainer')
    main.append(dayContainer)

    //DAY CONTAINER CONTENTS
    const titleDiv = document.createElement('div')
    // titleDiv.innerText = `${month} ${year}`
    titleDiv.classList.add('monthTitle')
    titleDiv.innerHTML = '<h1 class="heading">January 2022</h1>'
    dayContainer.append(titleDiv)

    //DAY CONTAINER
    const daySection = document.createElement('div')
    daySection.setAttribute('id', 'daySection')
    dayContainer.append(daySection)

    const dayTitle = document.createElement('h3')
    dayTitle.innerText = 'Place Holder 1st'
    dayTitle.classList.add('dayTitle')
    daySection.append(dayTitle)

    //AM START
    const twelveAM = document.createElement('div')
    twelveAM.classList.add('hour', `12AM`)
    twelveAM.innerHTML = `<p>12AM</p>`
    daySection.append(twelveAM)
    renderHours('am')

    //PM START
    const midday = document.createElement('div')
    midday.classList.add('hour', `12PM`)
    midday.innerHTML = `<p>12PM</p>`
    daySection.append(midday)
    renderHours('pm')
}

function renderCurrentDay(){
    
}

function renderHours(prefix){
    let time = 1
    while (time < 12) {
        const hour = document.createElement('div')
        hour.classList.add('hour', `${time}${prefix}`)
        hour.innerHTML = `<p>${time}${prefix}</p>`
        daySection.appendChild(hour)
        time++
    }
}
renderDaily()