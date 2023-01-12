

//WHEN CURRENT DAY IS SELECTED
export function renderCurrentDay(d) {
    //RESET THE VIEW
    const calendar = document.getElementById('calendar-container')
    calendar.innerHTML = ''

    let today = new Date

    // Argument 'd' dicatates the reference to current day 
    today.setDate(today.getDate() + d, 1)

    // Get day name from date
    let todayName = today.toLocaleDateString('default', { weekday: 'long' })
    let todayDate = today.getDate()
    let todayMonth = today.toLocaleDateString('default', { month: 'long' })
    let todayYear = today.getFullYear()
    

    //Generating parent flex div
    
    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('id', 'dayContainer')
    calendar.append(dayContainer)

    //DAY CONTAINER CONTENTS
    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `<h1 class"heading">${todayMonth} ${todayYear}</h1>`
    titleDiv.classList.add('monthTitle')
    dayContainer.append(titleDiv)

    //NAV ARROWS
    let navArrows = document.createElement('div')
            navArrows.className = 'nav-arrows'
            titleDiv.appendChild(navArrows)

                let prevMonthBtn = document.createElement('button')
                prevMonthBtn.id = 'prev-Month'
                prevMonthBtn.innerText = '←'
                navArrows.appendChild(prevMonthBtn)

                let nextMonthBtn = document.createElement('button')
                nextMonthBtn.id = 'next-Month'
                nextMonthBtn.innerText = '→'
                navArrows.appendChild(nextMonthBtn)

    // Allow user to toggle between months using nav arrows
    prevMonthBtn.addEventListener('click', () => {
        renderCurrentDay(d - 1)
    })
    nextMonthBtn.addEventListener('click', () => {
        renderCurrentDay(d + 1)
    })

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
    twelveAM.setAttribute('id', `00`)
    twelveAM.innerHTML = `<p>12am</p>`
    daySection.append(twelveAM)
    renderHours('am')

    //PM START
    const midday = document.createElement('div')
    midday.classList.add('hours', `12PM`)
    midday.setAttribute('id', `12`)
    midday.innerHTML = `<p>12pm</p>`
    daySection.append(midday)
    renderHours('pm')

    //PM END
    const midnight = document.createElement('div')
    midnight.classList.add('hours', `12`)
    midnight.setAttribute('id', `24`)
    midnight.innerHTML = `<p>12</p>`
    daySection.append(midnight)

    //RENDER EVENTS 
    axios
        .get("http://localhost:3000/api/sessions")
        .then((response) => {
            const session = response.data
            const user_id = session.user_id

            axios
                    .get(`http://localhost:3000/api/events/${user_id}`) // <--- INSERT USER-ID FROM SESSION HERE
                    .then((response) => {
                        let events = response.data
                        console.log(events)

                        // const todaysEvents = events.filter(events => events['date'][] === )
                        events.forEach((event) => {
                            // Get date for each event
                            const json = JSON.stringify(event.date)
                            const dateStr = JSON.parse(json)
                            const date = new Date(dateStr)
                            const day = date.getDate()
                            const eventTime = event['start_time']
                            const eventHour = eventTime.slice(0,2)
                            console.log(todayDate, day)

                            if(day === todayDate){
                                const hourElement = document.getElementById(`${eventHour}`)
                                const eventCont = document.createElement('button')
                                eventCont.id = event.id
                                eventCont.className = "eventDay"
                                eventCont.innerText = event.title
                                hourElement.append(eventCont)
                                

                            }

                            

                            
                        })
                    })
            })

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
    midday.setAttribute('id', `12PM`)
    midday.innerHTML = `<p>12PM</p>`
    daySection.append(midday)
    renderHours('pm')
}





function renderHours(prefix){
    let time = 1
    let hours = 12
    while (time < 12) {
        const hour = document.createElement('div')
        hour.classList.add('hours', `${time}${prefix}`)
        
        if(prefix === 'am'){
            hour.setAttribute('id', `${time}`)
        }
        if(prefix === 'pm'){
            hour.setAttribute('id', `${hours}`)
            hours++
        
        }
        hour.innerHTML = `<p>${time}${prefix}</p>`
            daySection.appendChild(hour)
            time++
        
    }
}
