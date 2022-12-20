let today = new Date

function renderMonth() {
    console.log(`Today's date = ${today}`)

    const calendar = document.getElementById('calendar-container')

        let monthHeading = document.createElement('h1')
        monthHeading.className = 'monthHeading'
        let month = today.toLocaleString('default', { month: 'long' });
        monthHeading.innerText = `${month} ${today.getFullYear()}`
        calendar.appendChild(monthHeading)

            let navArrows = document.createElement('div')
            navArrows.className = 'nav-arrows'
            monthHeading.appendChild(navArrows)

                let prevMonthBtn = document.createElement('button')
                prevMonthBtn.id = 'prev-month'
                prevMonthBtn.innerText = '<'
                navArrows.appendChild(prevMonthBtn)

                let nextMonthBtn = document.createElement('button')
                nextMonthBtn.id = 'next-month'
                nextMonthBtn.innerText = '>'
                navArrows.appendChild(nextMonthBtn)
                

        const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        const row1 = document.createElement('div')
        row1.className = 'row1'
        calendar.appendChild(row1)
        
            weekdays.forEach((day) => {
                let dayHeading = document.createElement('div')
                dayHeading.className = 'dayHeading'
                dayHeading.innerText = day
                row1.appendChild(dayHeading)
            })

        for (let i = 1; i <= 6; i++) {
            let row = document.createElement('div')
            row.className = 'row'
            row.id = `row-${i}`
            calendar.appendChild(row)

                weekdays.forEach((day) => {
                    let dayCont = document.createElement('div')
                    dayCont.className = 'day-cont'
                    row.appendChild(dayCont)

                    // const monthObj = createDaysForMonth(today.getFullYear(), month)
                })
        }

    // let thisWeek = []

    // for (let i = 1; i <= 7; i++) {
    //     let first = curr.getDate() - curr.getDay() + i
    //     let date = new Date(curr.setDate(first)).toISOString().slice(0, 10)
    //     let dayDate = parseInt(date.slice(-2))
    //     thisWeek.push(dayDate)
    // }
    // console.log(`This week days = ${thisWeek}`)

    // for (day in thisWeek) {
    //     let date = document.getElementsByClassName('day')[day]
    //     date.innerHTML = date.innerHTML + ' ' + thisWeek[day]
    // }

}
renderMonth();


// ------------ DATE FUNCTIONS -------------

function getNumOfDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
console.log(getNumOfDaysInMonth(2022, 12));

function createDaysForMonth(year, month) {
    return [...Array(getNumOfDaysInMonth(2022, 12))].map((day, index) => {
        return {
            date: new Date(year, month - 1, index + 1),
            dayOfMonth: index + 1,
            dayOfWeek: new Date(year, month - 1, index + 1).getDay()
        }
    })
}
// return Object for days in December 2022
console.log(createDaysForMonth(2022, 9))

// Get weekday name from date
function getWeekday(date) {
    return today.toLocaleDateString('default', { weekday: 'long' })
}
console.log(getWeekday(today))

console.log(today.getMonth())