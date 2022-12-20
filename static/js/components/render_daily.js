
//WHEN CURRENT DAY IS SELECTED
function renderCurrentDay() {
    
    // Get day name from date
    let today = new Date
    let todayName = today.toLocaleDateString('default', { weekday: 'long' })
    let todayDate = today.getDate()
    let todayMonth = today.toLocaleDateString('default', { month: 'long' })
    let todayYear = today.getFullYear()

    //Generating parent flex div
    const main = document.getElementById('content')
    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('id', 'dayContainer')
    main.append(dayContainer)

    //DAY CONTAINER CONTENTS
    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `<h1 class"heading">${todayMonth} ${todayYear}</h1>`
    titleDiv.classList.add('monthTitle')
    dayContainer.append(titleDiv)

    //DAY CONTAINER
    const daySection = document.createElement('div')
    daySection.setAttribute('id', 'daySection')
    dayContainer.append(daySection)

    const dayTitle = document.createElement('h3')
    dayTitle.innerText = `${todayName} ${todayDate}`
    dayTitle.classList.add('dayTitle')
    daySection.append(dayTitle)

    //AM START
    const twelveAM = document.createElement('div')
    twelveAM.classList.add('hours', `12AM`)
    twelveAM.innerHTML = `<p>12AM</p>`
    daySection.append(twelveAM)
    renderHours('am')

    //PM START
    const midday = document.createElement('div')
    midday.classList.add('hours', `12PM`)
    midday.innerHTML = `<p>12PM</p>`
    daySection.append(midday)
    renderHours('pm')
}


//WHEN SPECIFIC DAY IS SELECTED
function renderDay(day, date, month, year){

    //Generating parent flex div
    const main = document.getElementById('content')
    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('id', 'dayContainer')
    main.append(dayContainer)

    //DAY CONTAINER CONTENTS
    const titleDiv = document.createElement('div')
    // titleDiv.innerText = `${month} ${year}`
    titleDiv.classList.add('monthTitle')
    titleDiv.innerHTML = `<h1 class="heading">${month} ${year}</h1>`
    dayContainer.append(titleDiv)

    //DAY CONTAINER
    const daySection = document.createElement('div')
    daySection.setAttribute('id', 'daySection')
    dayContainer.append(daySection)

    const dayTitle = document.createElement('h3')
    dayTitle.innerText = `${day} ${date}`
    dayTitle.classList.add('dayTitle')
    daySection.append(dayTitle)

    //AM START
    const twelveAM = document.createElement('div')
    twelveAM.classList.add('hours', `12AM`)
    twelveAM.innerHTML = `<p>12AM</p>`
    daySection.append(twelveAM)
    renderHours('am')

    //PM START
    const midday = document.createElement('div')
    midday.classList.add('hours', `12PM`)
    midday.innerHTML = `<p>12PM</p>`
    daySection.append(midday)
    renderHours('pm')
}

renderCurrentDay()



function renderHours(prefix){
    let time = 1
    while (time < 12) {
        const hour = document.createElement('div')
        hour.classList.add('hours', `${time}${prefix}`)
        hour.innerHTML = `<p>${time}${prefix}</p>`
        daySection.appendChild(hour)
        time++
    }
}
