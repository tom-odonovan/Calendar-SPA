
import { createEventForm } from "./weekly.js"
import { showEventForm } from "./weekly.js"
import { hideEventForm } from "./weekly.js"


export function renderMonth(m) {

    const today = new Date()
    
    console.log(`Today's date = ${today}`)
    
    // Argument 'm' dicatates the reference to current month 
    today.setMonth(today.getMonth() + m, 1)
    
    // Reset the view
    const calendar = document.getElementById('calendar-container')
    calendar.innerHTML = ''

    // Display current month and year at top of calendar
    let monthHeading = document.createElement('h1')
    monthHeading.className = 'monthHeading'
    let month = today.toLocaleString('default', { month: 'long' });
    monthHeading.innerText = `${month} ${today.getFullYear()}`
    calendar.appendChild(monthHeading)

    // Render navigation arrows
    let navArrows = document.createElement('div')
    navArrows.className = 'nav-arrows'
    monthHeading.appendChild(navArrows)

        let prevMonthBtn = document.createElement('button')
        prevMonthBtn.id = 'prev-month'
        prevMonthBtn.innerText = '←'
        navArrows.appendChild(prevMonthBtn)

        let nextMonthBtn = document.createElement('button')
        nextMonthBtn.id = 'next-month'
        nextMonthBtn.innerText = '→'
        navArrows.appendChild(nextMonthBtn)

    // Allow user to toggle between months using nav arrows
    prevMonthBtn.addEventListener('click', () => {
        renderMonth(m - 1)
    })
    nextMonthBtn.addEventListener('click', () => {
        renderMonth(m + 1)
    })
                
    // Display weekday headings for each column
    const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    const row1 = document.createElement('div')
    row1.className = 'row-0'
    calendar.appendChild(row1)
    
    weekdays.forEach((day) => {
        let dayHeading = document.createElement('div')
        dayHeading.className = 'dayHeading'
        dayHeading.innerText = day
        row1.appendChild(dayHeading)
    })
    
    // Render square for each day in month
    let dayIndex = 1
    const monthObj = createDaysForMonth(today.getFullYear(), today.getMonth())
    console.log(`Current month = ${month}`)
    console.log(monthObj)
    
    for (let i = 1; i <= 6; i++) {
        let row = document.createElement('div')
        row.className = 'row'
        row.id = `row-${i}`
        calendar.appendChild(row)

        weekdays.forEach((day) => {
            let dayCont = document.createElement('div')
            dayCont.className = 'day-cont'
            dayCont.id = `${dayIndex}`
            row.appendChild(dayCont)
            dayIndex++
        })
    }

    // Display correct date in each square

        // Display dates in current month
            let firstDayOfMonth = monthObj[0].dayOfWeek
            if (firstDayOfMonth === 0){
                firstDayOfMonth = 7;
            }
        
            for (let i = 0; i < monthObj.length; i++) {
                const tile = document.getElementById(firstDayOfMonth + i)
                const date = document.createElement('div')
                date.className = 'date-marker'
                date.id = `date-marker-${monthObj[i].dayOfMonth}`
                date.innerText = monthObj[i].dayOfMonth

                // Highlight todays date in month
                today.setDate(new Date().getDate())
                if (today.getDate() === monthObj[i].dayOfMonth && m === 0) {
                    date.style.backgroundColor = '#FAA31B'
                    date.style.color = 'white'
                }
                tile.appendChild(date)
            }

        // Display dates from prev month
            const prevMonth = createDaysForMonth(today.getFullYear(), today.getMonth() - 1)
            const visibleDaysFromPrevMonth = firstDayOfMonth - 1
            const prevMonthDays = prevMonth.slice(-visibleDaysFromPrevMonth)

            if (visibleDaysFromPrevMonth !== 0) {
                for (let i = 0; i < prevMonthDays.length; i++) {
                    const tile = document.getElementById(i + 1)
                    const date = document.createElement('div')
                    date.className = 'date-marker'
                    tile.style.opacity = '0.4'
                    tile.style.zIndex = '0'
                    date.innerText = prevMonthDays[i].dayOfMonth
                    tile.appendChild(date)
                }
            }

        // Display dates from next month
            const nextMonth = createDaysForMonth(today.getFullYear(), today.getMonth() + 1)
            const visibleDaysFromNextMonth = 42 - (monthObj.length + visibleDaysFromPrevMonth)
            const nextMonthDays = nextMonth.slice(0, visibleDaysFromNextMonth)

            for (let i = 0; i < nextMonthDays.length; i++) {
                const tile = document.getElementById(monthObj.length + visibleDaysFromPrevMonth + 1 + i)
                const date = document.createElement('div')
                date.className = 'date-marker'
                tile.style.opacity = '0.4'
                date.innerText = nextMonthDays[i].dayOfMonth
                tile.appendChild(date)
            }

        // Render event form when a day is clicked
            
            const dayConts = document.querySelectorAll('.day-cont')
            dayConts.forEach((square) => {
                square.addEventListener('click', (event) => {
                    if (event.target.className === 'day-cont') {
                        
                        const dayClicked = square.firstChild.id.replace(/^\D+/g, "")

                        const eventCont = renderEventIcon(square.firstChild, '0', 'New Event')
                        eventCont.classList.add('event-focus')
                        const eventModal = renderEventModal(eventCont)
                        
                        
                        const formData = {
                            title: 'New Event',
                            date: `${today.getFullYear()}-${today.getMonth()+1}-${dayClicked}`,
                            start_time: '09:00',
                            end_time: '10:00'
                        }

                        console.log(formData)
                        eventModal.classList.add('month-event-form')
                        const newEventForm = renderEventForm(eventModal, 'New Event', formData)

                        // Handle form submission 
                        newEventForm.addEventListener('submit', (event) => {

                            event.preventDefault()
                            
                            axios
                                .get('/api/sessions')
                                .then((response) => {
                                    const userId = response.data.user_id

                                    // Collect all the data from the form element
                                    const formData = new FormData(newEventForm);
                                    const data = {
                                        user_id: userId,
                                        calendar_id: 1,
                                        title: formData.get("title"),
                                        date: formData.get("date"),
                                        start_time: formData.get("start_time"),
                                        end_time: formData.get("end_time"),
                                        location: formData.get("location"),
                                        description: formData.get("description")
                                    };
                                    console.log(data);

                                // Add new event via POST request
                                axios
                                    .post('/api/events', data)
                                    .then((response) => {
                                        console.log(response);
                                        // Reset the view to show changes
                                        renderMonth(0)
                                        // Alert user
                                        const alert = renderAlertModal(document.body, 'Success!', `Event: '${data.title}' has been added.`, true)
                                    })
                                })
                        })

                    }
                })
            })

        
        // Get user session data
        axios
            .get("http://localhost:3000/api/sessions")
            .then((response) => {
                const session = response.data
                const user_id = session.user_id
                
                // Get user event data from database
                axios
                    .get(`http://localhost:3000/api/events/${user_id}`) // <--- INSERT USER-ID FROM SESSION HERE
                    .then((response) => {
                        let events = response.data
                        console.log(events)

                        events.forEach((event) => {
                            // Get date for each event
                            const eventId = event.id
                            const eventDate = new Date(parseJson(event.date))
                            const day = eventDate.getDate()
                            const dayCont = document.getElementById(`date-marker-${day}`)

                            // Create event icon and append to correct day 
                            const eventCont = renderEventIcon(dayCont, eventId, event.title)
                            
                            // Render event modal when event is clicked
                            eventCont.addEventListener('click', () => {

                                eventCont.classList.add('event-focus')
                                const eventModal = renderEventModal(eventCont)
                                renderEventDetails(eventModal, event)

                            })

                        })
                    })
            })

            const dayCont = document.getElementById('')

        

       
}







// -------------------------  FUNCTIONS ----------------------------


// --------------- DATES ----------------


function getNumOfDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


// Return object containing days for a given month
    function createDaysForMonth(year, month) {
        return [...Array(getNumOfDaysInMonth(year, month))].map((day, index) => {
            return {
                date: new Date(year, month, index + 1),
                dayOfMonth: index + 1,
                dayOfWeek: new Date(year, month, index + 1).getDay()
            }
        })
    }
// From January = 0 to December = 11
// For example: Object for days in December 2022  --->  createDaysForMonth(2022, 11)
    

// Get weekday name from date
    function getWeekday(date) {
        return today.toLocaleDateString('default', { weekday: 'long' })
    }



// --------------- MISC ----------------


// Inserts new element after specified element (Not as a child node)
function insertAfter(existingNode, newNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}


// Parse Json into javascript 
function parseJson(jsonStr) {
    const json = JSON.stringify(jsonStr)
    return JSON.parse(json)
}


// Create close button for modal
function createCloseBtn(parentNode) {
    const closeBtn = document.createElement('div')
    closeBtn.className = 'closeBtn'
    closeBtn.innerHTML = '&times'
    parentNode.append(closeBtn)
    return closeBtn;
}



// ------------ EVENT ICON -------------


function renderEventIcon(parentNode, eventId, title) {
    const eventCont = document.createElement('button')
    eventCont.id = eventId
    eventCont.className = "eventCont"
    eventCont.innerText = title
    parentNode.append(eventCont)
    return eventCont;
}


// ------------ EVENT MODAL -------------


function renderEventModal(referenceElem) {
    const eventModal = document.createElement('button')
    eventModal.className = 'event-modal'
    eventModal.id = 'event-modal'

    const arrow = document.createElement('div')
    arrow.id = 'arrow'
    arrow.className = 'arrow-left'

    // Alter position of modal depending on event X offset
    const rect = referenceElem.getBoundingClientRect()
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
    const offsetX = rect.left + scrollLeft
    console.log(`offsetX: ${offsetX}`)
    console.log(`window.innerWidth: ${window.innerWidth}`)

    if (offsetX > window.innerWidth / 2) {
        eventModal.classList.add('left')
        arrow.classList.add('arrow-right')
        arrow.classList.remove('arrow-left')
    }
    insertAfter(referenceElem, eventModal)
    insertAfter(referenceElem, arrow)

    return eventModal;
}



// Render event modal data
function renderEventDetails(parentNode, data) {

    parentNode.innerHTML = ''
    const eventId = parentNode.parentNode.childNodes[1].id

    createCloseBtn(parentNode).addEventListener('click', () => {
        renderMonth(0)
    })

    const optionsBtn = document.createElement('div')
    optionsBtn.className = 'optionsBtn'
    parentNode.append(optionsBtn)

    const title = document.createElement('h2')
    title.className = 'title'
    title.innerText = data.title
    parentNode.append(title)

    // Append correct date and time
    const dateTime = document.createElement('div')
    dateTime.className = 'dateTime'
    const eventDate = new Date(parseJson(data.date))
    const date = eventDate.toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" })
    const start_time = parseJson(data.start_time)
    const end_time = parseJson(data.end_time)

    // Convert time to 12 hr (AM / PM) format
    function convertTo12hrTime(time) {
        return new Date('1970-01-01T' + time + 'Z')
            .toLocaleTimeString('en-US',
                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            )
    }

    dateTime.innerText = `${date} • ${convertTo12hrTime(start_time)} - ${convertTo12hrTime(end_time)}`
    parentNode.append(dateTime)

    const location = document.createElement('div')
    location.className = 'location'
    location.innerText = data.location
    parentNode.appendChild(location)

    const description = document.createElement('div')
    description.className = 'description'
    description.innerText = data.description
    parentNode.appendChild(description)

    // Render options menu
    optionsBtn.addEventListener('click', () => {
        const optionsMenu = document.createElement('div')
        optionsMenu.id = 'options-menu'
        optionsMenu.className = 'options-menu'
        const updateBtn = document.createElement('button')
        updateBtn.innerText = 'Update event'
        optionsMenu.appendChild(updateBtn)

        // Render Update Form
        updateBtn.addEventListener('click', () => {
            parentNode.innerText = ''
            parentNode.classList.add('month-event-form')

            const updateForm = renderEventForm(parentNode, 'Update Event', data)

            // Handle form submission
            updateForm.addEventListener('submit', (event) => {

                event.preventDefault()

                axios
                    .get('/api/sessions')
                    .then((response) => {
                        const userId = response.data.user_id

                        // Collect all the data from the form element
                        const formData = new FormData(updateForm);
                        const data = {
                            user_id: userId,
                            calendar_id: 1,
                            title: formData.get("title"),
                            date: formData.get("date"),
                            start_time: formData.get("start_time"),
                            end_time: formData.get("end_time"),
                            location: formData.get("location"),
                            description: formData.get("description")
                        };
                        console.log(data);
                        

                        // Update event using PUT request
                        axios
                            .put(`/api/events/${eventId}`, data)
                            .then((response) => {
                                console.log(response);
                                // Reset the view to show changes
                                renderMonth(0)
                                // Alert user
                                const alert = renderAlertModal(document.body, 'Success!', 'Event updated successfully.', true)
                                // Hide modal on click away
                                window.addEventListener('click', (event) => {
                                    alert.remove()
                                })
                            })

                            });

                
            })



        })

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete event'
        optionsMenu.appendChild(deleteBtn)
        insertAfter(optionsBtn, optionsMenu)

        deleteBtn.addEventListener('click', () => {
            const optionsMenu = document.getElementById('options-menu')
            optionsMenu.style.display = 'none'
            const calendar = document.getElementById('calendar-container')
            const alert = renderAlertModal(calendar, 'Alert', 'Are you sure you want to delete this event?', false)

            const yesBtn = document.createElement('button')
            yesBtn.innerText = 'Yes'
            alert.appendChild(yesBtn)

            // Delete event after confirmation from user
            yesBtn.addEventListener('click', () => {
                axios
                    .delete(`/api/events/${eventId}`)
                    .then((response) => {
                        console.log(response);
                        // Reset the view to show changes
                        renderMonth(0)
                        // Render alert modal
                        const alert = renderAlertModal(calendar, 'Event Deleted', '', true)
                        alert.style.lineHeight = '150px'
                        // Hide modal after 2s or on click
                        setTimeout(() => {
                            alert.style.opacity = '0'
                        }, 1000);
                        window.addEventListener('click', (event) => {
                            alert.remove()
                        })
                    })
            })

            const cancelBtn = document.createElement('button')
            cancelBtn.innerText = 'Cancel'
            alert.appendChild(cancelBtn)

            cancelBtn.addEventListener('click', () => {
                alert.remove()
            })
        })

    })
} 



// ------------ ALERT MODAL -------------

function renderAlertModal(parentNode, alert, message, autoTimeout) {
    const modal = document.createElement('div')
    modal.id = 'alert-modal'
    modal.className = 'alert-modal'
    parentNode.appendChild(modal)

    const heading = document.createElement('h4')
    heading.innerHTML = alert
    modal.appendChild(heading)

    const text = document.createElement('div')
    text.innerHTML = message
    modal.appendChild(text)

    if(autoTimeout === true) {
        // Hide modal after 2s
        setTimeout(() => {
            // Fade-out
            modal.style.opacity = '0'
        }, 1000);
        setTimeout(() => {
            // Remove
            modal.style.display = 'none'
        }, 1000);
    }

    return modal;
}




// ------------ UPDATE FORM -------------


function renderEventForm(parent, title, formData) {

    // const eventModal = document.getElementById('event-modal')
    createCloseBtn(parent).addEventListener('click', () => {
        renderMonth(0)
    })

    const heading = document.createElement('h2')
    heading.innerText = title
    parent.appendChild(heading)

    function addLabel(text, toElementId, parentNode) {
        const label = document.createElement('label')
        label.setAttribute('for', toElementId)
        label.innerHTML = text
        parentNode.appendChild(label)
        return label;
    }

    const eventForm = document.createElement('form')
    eventForm.setAttribute('method', 'POST')
    parent.appendChild(eventForm)


    const eventTitle = document.createElement('input')
    eventTitle.id = "eventTitle"
    eventTitle.name = 'title'
    const titleValue = parseJson(formData.title)
    eventTitle.value = titleValue
    addLabel('Title:', "eventTitle", eventForm)
    eventForm.appendChild(eventTitle)


    const dateTime = document.createElement('input')
    dateTime.id = 'dateTime'
    dateTime.name = 'date'
    const eventDate = new Date(parseJson(formData.date))
    const dateValue = eventDate.toLocaleDateString('en-CA')
    dateTime.type = 'date'
    dateTime.value = dateValue
    addLabel('Date:', "dateTime", eventForm)
    eventForm.appendChild(dateTime)

    const startTime = document.createElement('input')
    startTime.id = 'startTime'
    startTime.className = 'time-input'
    startTime.name = 'start_time'
    if(formData.start_time){
        startTime.value = parseJson(formData.start_time)
    } else {
        startTime.value = formData.start_time
    }
    startTime.type = 'time'
    addLabel('Starts:', "startTime", eventForm).className = 'time-label'
    eventForm.appendChild(startTime)

    const endTime = document.createElement('input')
    endTime.id = 'endTime'
    endTime.className = 'time-input'
    endTime.name = 'end_time'
    if (formData.end_time) {
        endTime.value = parseJson(formData.end_time)
    } else {
        endTime.value = formData.end_time
    }
    endTime.type = 'time'
    addLabel('Ends:', "endTime", eventForm).className = 'time-label'
    eventForm.appendChild(endTime)

    const location = document.createElement('input')
    location.id = 'location'
    location.name = 'location'
    location.value = formData.location || ''
    addLabel('Where:', 'location', eventForm)
    eventForm.appendChild(location)

    const description = document.createElement('textarea')
    description.id = 'desc'
    description.className = 'event-desc'
    description.name = 'description'
    description.setAttribute('contenteditable', 'true')
    description.value = formData.description || ''
    addLabel('Notes:', 'desc', eventForm)
    eventForm.appendChild(description)

    const submitBtn = document.createElement('button')
    submitBtn.innerText = 'Save'
    eventForm.appendChild(submitBtn)

    const cancelBtn = document.createElement('div')
    cancelBtn.className = 'cancel-btn'
    cancelBtn.innerText = 'Cancel'
    eventForm.appendChild(cancelBtn)

    cancelBtn.addEventListener('click', () => {
        parent.classList.remove('month-event-form')
        renderEventDetails(parent, formData)
    })
    return eventForm;
}

function getFormData(form) {

    // Collect all the data from the form element
    const formData = new FormData(form);
    const data = {
        title: formData.get("title"),
        date: formData.get("date"),
        start_time: formData.get("start_time"),
        end_time: formData.get("end_time"),
        location: formData.get("location"),
        description: formData.get("description")
    };
    return data;
}