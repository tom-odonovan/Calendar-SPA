// Create a container for the calendar
const calendarContainer = document.createElement('div');
calendarContainer.classList.add('calendar-container');

// Create a table element for the calendar
const calendarTable = document.createElement('table');

// Create the header row for the days of the week
const weekHeaderRow = document.createElement('tr');
weekHeaderRow.classList.add('week-header-row');
const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
weekdays.forEach(weekday => {
  const headerCell = document.createElement('th');
  headerCell.textContent = weekday;
  weekHeaderRow.appendChild(headerCell);
});
calendarTable.appendChild(weekHeaderRow);

// Create a row for each hour of the day
for (let hour = 0; hour < 24; hour++) {
  const hourRow = document.createElement('tr');
  hourRow.classList.add('hour-row');

  // Create a cell for the hour
  const hourCell = document.createElement('td');
  hourCell.classList.add('hour-cell');
  hourCell.textContent = `${hour}:00`;
  hourRow.appendChild(hourCell);

  // Create a cell for each day of the week
  for (let day = 0; day < 7; day++) {
    const dayCell = document.createElement('td');
    dayCell.classList.add('day-cell');
    hourRow.appendChild(dayCell);
  }

  calendarTable.appendChild(hourRow);
}

calendarContainer.appendChild(calendarTable);

// Append the calendar to the page
const main = document.getElementById('content')
main.appendChild(calendarContainer);
