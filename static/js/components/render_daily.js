import { createEventForm } from "./weekly.js"
import { showEventForm } from "./weekly.js"



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

    let titleDiv = document.createElement('h1')
    titleDiv.className = 'monthHeading'
    let month = today.toLocaleString('default', { month: 'long' });
    titleDiv.innerText = `${month} ${today.getFullYear()}`
    calendar.appendChild(titleDiv)

    //Generating parent flex div

    const dayContainer = document.createElement('div')
    dayContainer.setAttribute('id', 'dayContainer')
    calendar.append(dayContainer)

    //DAY CONTAINER CONTENTS

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
    dayTitle.id = 'dayTitle'
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

    const eventForm = createEventForm();
    calendar.appendChild(eventForm);

    //EVENT ADD 
    const eventAdd = document.getElementById('dayContainer')
    eventAdd.addEventListener('click', e => {
        const clickedEle = e.target.id
        if (clickedEle !== '') {

            showEventForm(e.target.innerHTML)
            populateForm(today, parseInt(clickedEle))
        } else {
            // showEventForm()
            // populateForm(today, parseInt(clickedEle))
        }
    })
    function populateForm(date, time) {
        const dateObj = new Date(date);
        //using toLocaleDateString method to get the date
        const dateString = dateObj.toLocaleDateString();
        console.log(dateString)

        let inputDateField = document.getElementById('date-element');
        //splits the dateString to an array gets the date and splits it to conform on the YYYY-MM-DD format
        inputDateField.value = dateString.split('/')[2] + "-" + dateString.split('/')[1] + "-" + dateString.split('/')[0];

        let timeString = ``
        const newDateObj = new Date(date);
        if (time > 9) {
            timeString = `${time}`
        }
        if (time < 10) {
            timeString = `0${time}`
        }
        console.log(timeString)
        let startTimeField = document.getElementById('start-time-element');
        startTimeField.value = `${timeString}:00`

    }

    //RENDER EVENTS 
    axios
        .get("http://localhost:3000/api/sessions")
        .then((response) => {
            const session = response.data
            const user_id = session.user_id

            if (session) {
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
                            const eventId = event.id
                            const eventSTime = event['start_time']
                            const eventHour = eventSTime.slice(0, 2)
                            const eventDesc = event['description']
                            const eventETime = parseInt(event.end_time)
                            const startTime = parseInt(event.start_time)
                            const eventLoc = event.location

                            console.log(eventHour)






                            if (day === todayDate) {
                                //EVENT DIV 
                                const divSize = ((eventETime - startTime) * 50)
                                const timeDiff = ((event.end_time - event.start_time))
                                const hourElement = document.getElementById(eventHour.toString())
                                console.log(eventHour)
                                const eventCont = document.createElement('div')
                                eventCont.id = `event${event.id}`
                                eventCont.classList.add('eventDay', `${event.id}`)
                                hourElement.append(eventCont)



                                const specificEvent = document.getElementById(`event${event.id}`)
                                const eventTitle = document.createElement('div')
                                eventTitle.id = 'details'
                                eventTitle.innerHTML = `<h4> ${event.title}</h4>`
                                specificEvent.style.height = `50px`
                                specificEvent.append(eventTitle)

                                //EVENT DETAILS
                                const eventDetails = document.createElement('div')
                                eventDetails.id = 'details'
                                if (event.end_time) {
                                    eventDetails.innerHTML = `
                                <p>${(event.start_time).slice(0, 5)} - ${(event.end_time).slice(0, 5)}</p>
                                <p>${eventDesc}</p>
                                <p>${eventLoc}</p>
                                `
                                } else {
                                    eventDetails.innerHTML = `
                                <p>Start Time: ${(event.start_time).slice(0, 5)}</p>
                                <p>${eventDesc}</p>
                                <p>${eventLoc}</p>
                                `}


                                eventCont.append(eventDetails)




                                //EDIT-DELETE DIV
                                const deleteDiv = document.createElement('div')
                                deleteDiv.classList.add('deleteDiv')
                                specificEvent.append(deleteDiv)

                                const editButton = document.createElement('button')
                                editButton.innerHTML = 'EDIT'
                                editButton.id = `edit${event.id}`
                                editButton.classList.add('edit_btn')
                                deleteDiv.append(editButton)

                                const deleteButton = document.createElement('button')
                                deleteButton.innerHTML = 'DELETE'
                                deleteButton.id = `del${event.id}`
                                deleteButton.classList.add('del_btn')
                                deleteDiv.append(deleteButton)


                                //EVENT LISTENER TO SHOW EDIT DIV
                                specificEvent.addEventListener('click', e => {
                                    deleteDiv.style.display = 'flex'
                                })
                                specificEvent.addEventListener('mouseleave', e => {

                                    deleteDiv.style.display = 'none'
                                    specificEvent.style.height = `50px`
                                    specificEvent.style.minHeight = "50px"

                                })

                                specificEvent.addEventListener('mouseenter', e => {
                                    console.log(event.end_time)
                                    console.log(divSize)
                                    if (divSize > 0) {
                                        specificEvent.style.height = `${divSize}px`
                                        specificEvent.style.maxHeight = `${divSize}px`
                                    } else {
                                        specificEvent.style.minHeight = "100px"
                                        specificEvent.style.height = "fit-content"
                                    }



                                })


                                //DELETE FUNCTION
                                const delDay = new Date
                                const deleteDate = parseInt(day - delDay.getDate())
                                const deleteBtn = document.getElementById(`del${event.id}`)
                                deleteBtn.addEventListener('click', (e) => {

                                    axios
                                        .delete(`http://localhost:3000/api/events/${eventId}`)
                                        .then((response) => {
                                            renderCurrentDay(deleteDate)
                                        })
                                })

                            }




                        })
                    })
            }
        })

}


//WHEN SPECIFIC DAY IS SELECTED
function renderDay(day, date, month, year) {

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





function renderHours(prefix) {
    let time = 1
    let hours = 13
    while (time < 12) {
        const hour = document.createElement('div')
        hour.classList.add('hours', `${time}${prefix}`)

        if (prefix === 'am') {
            if(time >= 10) {
                hour.setAttribute('id', `${time}`)
            } else {
                hour.setAttribute('id', `0${time}`)
            }
            
        }
        if (prefix === 'pm') {
            hour.setAttribute('id', `${hours}`)
            hours++

        }
        hour.innerHTML = `<p>${time}${prefix}</p>`
        daySection.appendChild(hour)
        time++

    }
}
