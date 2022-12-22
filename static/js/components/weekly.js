let today = new Date();

function renderWeek() {
  console.log(`Today's date = ${today}`);

  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-container');

  const calendarTable = document.createElement('table');

  const weekHeaderRow = document.createElement('tr');
  weekHeaderRow.classList.add('week-header-row');
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  weekdays.forEach((weekday) => {
    const headerCell = document.createElement('th');
    headerCell.textContent = weekday;
    weekHeaderRow.appendChild(headerCell);
  });
  calendarTable.appendChild(weekHeaderRow);

  for (let hour = 0; hour < 24; hour++) {
    const hourRow = document.createElement('tr');
    hourRow.classList.add('hour-row');

    const hourCell = document.createElement('td');
    hourCell.classList.add('hour-cell');
    hourCell.textContent = `${hour}:00`;
    hourRow.appendChild(hourCell);

    for (let day = 0; day < 7; day++) {
      const dayCell = document.createElement('td');
      dayCell.classList.add('day-cell');
      hourRow.appendChild(dayCell);
    }

    calendarTable.appendChild(hourRow);
  }

  calendarContainer.appendChild(calendarTable);

  const main = document.getElementById('content');
  main.appendChild(calendarContainer);
}

renderWeek();

//------ Should get the day numbers as well -----//

// let today = new Date();

// function renderWeek() {
//   console.log(`Today's date = ${today}`);

//   // Determine the first and last days of the week to display
//   const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
//   const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

//   // Clear the calendar container
//   const calendarContainer = document.querySelector('.calendar-container');
//   if (calendarContainer) {
//     calendarContainer.innerHTML = '';
//   }

//   // Create a table element for the calendar
//   const calendarTable = document.createElement('table');

//   // Create the header row for the days of the week
//   const weekHeaderRow = document.createElement('tr');
//   weekHeaderRow.classList.add('week-header-row');
//   const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
//   for (let day = 0; day < 7; day++) {
//     const currentDay = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + day);
//     const headerCell = document.createElement('th');
//     headerCell.textContent = weekdays[day];
//     const dayNumber = document.createElement('div');
//     dayNumber.classList.add('day-number');
//     dayNumber.textContent = currentDay.getDate();
//     headerCell.appendChild(dayNumber);
//     weekHeaderRow.appendChild(headerCell);
//   }
//   calendarTable.appendChild(weekHeaderRow);

//   // Create a row for each hour of the day
//   for (let hour = 0; hour < 24; hour++) {
//     const hourRow = document.createElement('tr');
//     hourRow.classList.add('hour-row');

//     // Create a cell for the hour
//     const hourCell = document.createElement('td');
//     hourCell.classList.add('hour-cell');
//     hourCell.textContent = `${hour}:00`;
//     hourRow.appendChild(hourCell);

//     // Create a cell for each day of the week
//     for (let day = 0; day < 7; day++) {
//       const dayCell = document.createElement('td');
//       dayCell.classList.add('day-cell');

//       // Only display cells for the days in the week being rendered
//       const currentDay = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + day);
//       if (currentDay >= weekStart && currentDay <= weekEnd) {
//         // Add content to the cell for the current day
//         // ...
//       }

//       hourRow.appendChild(dayCell);
//     }

//     calendarTable.appendChild(hourRow);
//   }

//   calendarContainer.appendChild(calendarTable);

//   const main = document.getElementById('content');
//   main.appendChild(calendarContainer);
// }

// renderWeek();



