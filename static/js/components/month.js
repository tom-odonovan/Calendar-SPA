
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
            // console.log(prevMonth)
            const visibleDaysFromPrevMonth = firstDayOfMonth - 1
            const prevMonthDays = prevMonth.slice(-visibleDaysFromPrevMonth)
            // console.log(prevMonthDays)

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
            // console.log(nextMonth)
            const visibleDaysFromNextMonth = 42 - (monthObj.length + visibleDaysFromPrevMonth)
            const nextMonthDays = nextMonth.slice(0, visibleDaysFromNextMonth)
            // console.log(nextMonthDays)

            for (let i = 0; i < nextMonthDays.length; i++) {
                const tile = document.getElementById(monthObj.length + visibleDaysFromPrevMonth + 1 + i)
                const date = document.createElement('div')
                date.className = 'date-marker'
                tile.style.opacity = '0.4'
                date.innerText = nextMonthDays[i].dayOfMonth
                tile.appendChild(date)
            }

        // Render event form when a day is clicked
            
            // createEventForm()

        
        // Render events in current month from database
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

                        events.forEach((event) => {
                            // Get date for each event


                            function parseJson(jsonStr) {
                                const json = JSON.stringify(jsonStr)
                                return JSON.parse(json)
                            }
                            const eventId = event.id
                            const eventDate = new Date(parseJson(event.date))
                            const day = eventDate.getDate()

                            // Create event icon and append to correct day 
                            const dayCont = document.getElementById(`date-marker-${day}`)
                            const eventCont = document.createElement('button')
                            eventCont.id = eventId
                            eventCont.className = "eventCont"
                            eventCont.innerText = event.title
                            dayCont.append(eventCont)

                            function insertAfter(existingNode, newNode) {
                                existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
                            }

                            // Render event modal when event is clicked
                            eventCont.addEventListener('click', () => {
                                
                                const rect = eventCont.getBoundingClientRect(),
                                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
                                const offsetX =  rect.left + scrollLeft 
                                console.log(window.innerWidth)

                                const eventModal = document.createElement('button')
                                eventModal.className = 'event-modal'
                                eventModal.id = 'event-modal'
                                insertAfter(eventCont, eventModal)

                                const arrow = document.createElement('div')
                                arrow.id = 'arrow'
                                arrow.className = 'arrow-left'
                                insertAfter(eventCont, arrow)

                                // Alter position of modal depending on event X offset
                                if (offsetX > window.innerWidth / 2) {
                                    eventModal.classList.add('left')
                                    arrow.classList.add('arrow-right')
                                    arrow.classList.remove('arrow-left')
                                }

                                function renderEventDetails(parentNode) {

                                    parentNode.innerHTML = ''

                                    const title = document.createElement('h2')
                                    title.className = 'title'
                                    title.innerText = event.title
                                    eventModal.append(title)

                                    const optionsBtn = document.createElement('div')
                                    optionsBtn.className = 'optionsBtn'
                                    title.append(optionsBtn)
                            
                                    // Hide modal when close button clicked
                                    function createCloseBtn(parentNode) {
                                        const closeBtn = document.createElement('div')
                                        closeBtn.className = 'closeBtn'
                                        closeBtn.innerHTML = '&times'
                                        title.append(closeBtn)
                                        return closeBtn;    
                                    }
                                    
                                    createCloseBtn(title).addEventListener('click', () => {
                                        eventModal.style.display = 'none'
                                        arrow.style.display = 'none'
                                    })

                                    // Append correct date and time
                                    const dateTime = document.createElement('div')
                                    dateTime.className = 'dateTime'
                                    const date = eventDate.toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" })
                                    const start_time = parseJson(event.start_time)
                                    const end_time = parseJson(event.end_time)

                                    // Convert time to 12 hr (AM / PM) format
                                    function convertTo12hrTime(time) {
                                        return new Date('1970-01-01T' + time + 'Z')
                                            .toLocaleTimeString('en-US',
                                                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                                            )
                                    }

                                    dateTime.innerText = `${date} • ${convertTo12hrTime(start_time)} - ${convertTo12hrTime(end_time)}`
                                    eventModal.append(dateTime)

                                    const location = document.createElement('div')
                                    location.className = 'location'
                                    location.innerText = event.location
                                    eventModal.appendChild(location)

                                    const description = document.createElement('div')
                                    description.className = 'description'
                                    description.innerText = event.description
                                    eventModal.appendChild(description)

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
                                            eventModal.innerText = ''
                                            eventModal.classList.add('update-form')

                                            createCloseBtn(eventModal).addEventListener('click', () => {
                                                eventModal.style.display = 'none'
                                                arrow.style.display = 'none'
                                            })

                                            const heading = document.createElement('h2')
                                            heading.innerText = 'Update Event'
                                            eventModal.appendChild(heading)

                                            function addLabel(text, toElementId, parentNode) {
                                                const label = document.createElement('label')
                                                label.setAttribute('for', toElementId)
                                                label.innerHTML = text
                                                parentNode.appendChild(label)
                                                return label;
                                            }

                                            const updateForm = document.createElement('form')
                                            updateForm.setAttribute('method', 'POST')
                                            eventModal.appendChild(updateForm)


                                            const eventTitle = document.createElement('input')
                                            eventTitle.id = "eventTitle"
                                            eventTitle.name = 'title'
                                            const titleValue = parseJson(event.title)
                                            eventTitle.value = titleValue
                                            addLabel('Title:', "eventTitle", updateForm)
                                            updateForm.appendChild(eventTitle)
                                            

                                            const dateTime = document.createElement('input')
                                            dateTime.id = 'dateTime'
                                            dateTime.name = 'date'
                                            const dateValue = eventDate.toLocaleDateString('en-CA')
                                            dateTime.type = 'date'
                                            dateTime.value = dateValue
                                            addLabel('Date:', "dateTime", updateForm)
                                            updateForm.appendChild(dateTime)

                                            const startTime = document.createElement('input')
                                            startTime.id = 'startTime'
                                            startTime.className = 'time-input'
                                            startTime.name = 'start_time'
                                            startTime.value = start_time
                                            startTime.type = 'time'
                                            addLabel('Starts:', "startTime", updateForm).className = 'time-label'
                                            updateForm.appendChild(startTime)

                                            const endTime = document.createElement('input')
                                            endTime.id = 'endTime'
                                            endTime.className = 'time-input'
                                            endTime.name = 'end_time'
                                            endTime.value = end_time
                                            endTime.type = 'time'
                                            addLabel('Ends:', "endTime", updateForm).className = 'time-label'
                                            updateForm.appendChild(endTime)

                                            const location = document.createElement('input')
                                            location.id = 'location'
                                            location.name = 'location'
                                            location.value = event.location
                                            addLabel('Where:', 'location', updateForm)
                                            updateForm.appendChild(location)

                                            const description = document.createElement('textarea')
                                            description.id = 'desc'
                                            description.className = 'event-desc'
                                            description.name = 'description'
                                            description.setAttribute('contenteditable', 'true')
                                            description.value = event.description
                                            addLabel('Notes:', 'desc', updateForm)
                                            updateForm.appendChild(description)

                                            const submitBtn = document.createElement('button')
                                            submitBtn.innerText = 'Save'
                                            updateForm.appendChild(submitBtn)

                                            const cancelBtn = document.createElement('div')
                                            cancelBtn.className = 'cancel-btn'
                                            cancelBtn.innerText = 'Cancel'
                                            updateForm.appendChild(cancelBtn)

                                            cancelBtn.addEventListener('click', () => {
                                                eventModal.classList.remove('update-form')
                                                renderEventDetails(eventModal)
                                            })

                                            // Handle form submission
                                            updateForm.addEventListener('submit', (event) => {

                                                event.preventDefault()

                                                // Collect all the data from the form element
                                                const formData = new FormData(updateForm);
                                                const data = {
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
                                                        const alert = renderModal(document.body, 'Success!', 'Event updated successfully.')
                                                        // Hide modal after 2s or on click
                                                        setTimeout(() => {
                                                            alert.style.opacity = '0'
                                                        }, 1000);
                                                        window.addEventListener('click', (event) => {
                                                            alert.remove()
                                                        })
                                                    })
                                            })

                                            

                                        })

                                        const deleteBtn = document.createElement('button')
                                        deleteBtn.innerText = 'Delete event'
                                        optionsMenu.appendChild(deleteBtn)
                                        insertAfter(optionsBtn, optionsMenu)

                                        deleteBtn.addEventListener('click', () => {
                                            const optionsMenu = document.getElementById('options-menu')
                                            optionsMenu.style.display = 'none'

                                            const alert = renderModal(calendar, 'Alert', 'Are you sure you want to delete this event?')

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
                                                        const alert = renderModal(calendar, 'Event Deleted', '')
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
                                } renderEventDetails(eventModal)

                                
                            })

                        })
                    })
            })

            const dayCont = document.getElementById('')

        

       
}







// ------------ DATE FUNCTIONS -------------

function getNumOfDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
// console.log(getNumOfDaysInMonth(2022, 12));

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
// Returns object for days in December 2022
    // console.log(createDaysForMonth(2022, 11))

// Get weekday name from date
    function getWeekday(date) {
        return today.toLocaleDateString('default', { weekday: 'long' })
    }



// ------------ ALERT MODAL -------------

function renderModal(parentNode, alert, message) {
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

    return modal;
}