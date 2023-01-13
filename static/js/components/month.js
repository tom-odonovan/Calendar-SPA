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
                            const json = JSON.stringify(event.date)
                            const dateStr = JSON.parse(json)
                            const date = new Date(dateStr)
                            const day = date.getDate()
                            

                            // Create event icon and append to correct day 
                            const dayCont = document.getElementById(`date-marker-${day}`)
                            const eventCont = document.createElement('button')
                            eventCont.id = event.id
                            eventCont.className = "eventCont"
                            eventCont.innerText = event.title
                            dayCont.append(eventCont)
                        })
                    })
            })

        

       
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
