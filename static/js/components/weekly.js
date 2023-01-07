let today = new Date();

function renderWeek() {
  console.log(`Today's date = ${today}`);
    // Clear the calendar container
    const calendarContainer = document.getElementById('calendar-container')
    calendarContainer.innerHTML = ''
  

  // Determine the first and last days of the week to display
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
  const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

  // Create the week heading
  const weekHeading = createWeekHeading();

  // Create Navigation Buttons
  const prevWeekBtn = createWeekBtn('prev-week', '←', today.getDate() - 7);
  const nextWeekBtn = createWeekBtn('next-week', '→', today.getDate() + 7);

  // Create Navigation Button Container
  const divNavArrows = createNavigationButtons();
  divNavArrows.appendChild(prevWeekBtn);
  divNavArrows.appendChild(nextWeekBtn);

  // Create Header Container Div
  const divHeaderContainer = document.createElement('div');
  divHeaderContainer.className = 'div-header';
  divHeaderContainer.appendChild(weekHeading);
  divHeaderContainer.appendChild(divNavArrows);

  calendarContainer.appendChild(divHeaderContainer);

  const divHeaderRow = document.createElement('div');
  divHeaderRow.className = 'div-header-row';

  // Create the header row for the days of the week
  const weekHeaderRow = document.createElement('div');
  weekHeaderRow.classList.add('week-header-row');

  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Prepend a blank headerCell to match the number of cells in the hourRow
  const blankCell = document.createElement('div');
  blankCell.classList.add('header-cell-first');
  blankCell.innerHTML = "&nbsp;" // adding a blank space in html encoding
  weekHeaderRow.appendChild(blankCell);

  // Append the rest of headerCells
  for (let day = 0; day < 7; day++) {
    const currentDay = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + day);
    const headerCell = document.createElement('div');
    headerCell.classList.add('header-cell');
    headerCell.textContent = weekdays[day];
    const dayNumber = document.createElement('div');
    dayNumber.classList.add('day-number');
    dayNumber.textContent = currentDay.getDate();
    headerCell.appendChild(dayNumber);
    divHeaderRow.appendChild(headerCell);
  }

  weekHeaderRow.appendChild(divHeaderRow);
  calendarContainer.appendChild(weekHeaderRow);

  // Create row hours container
  const hourRowContainer = document.createElement('div');
  hourRowContainer.classList.add("div-weekly-scrollable");

  // Create a row for each hour of the day
  for (let hour = 0; hour < 24; hour++) {
    const hourRow = document.createElement('div');
    if (hour === 0) {
      hourRow.classList.add('hour-row-first');
    } else if (hour === 23) {
      hourRow.classList.add('hour-row-last');
    } else {
      hourRow.classList.add('hour-row');
    }

    // Create a cell for the hour
    const hourCell = document.createElement('div');
    hourCell.classList.add('hour-cell');
    hourCell.textContent = `${hour}:00`;
    hourRow.appendChild(hourCell);

    // Create a cell for each day of the week
    for (let day = 0; day < 7; day++) {
      const dayCell = document.createElement('div');
      if (day === 6) {
        dayCell.classList.add('day-cell-last');
      } else {
        dayCell.classList.add('day-cell');
      }

      let dayId = 'event-' + day + '-' + hour;
      dayCell.setAttribute('id', dayId);
      dayCell.addEventListener('click', () => {
        showEventForm();
      });
      dayCell.addEventListener('mouseenter', () => {
        dayCell.classList.add('day-cell-mouse-hover');
      });
      dayCell.addEventListener('mouseleave', () => {
        dayCell.classList.remove('day-cell-mouse-hover');
      });



      hourRow.appendChild(dayCell);

    }

    hourRowContainer.appendChild(hourRow);
  }
  calendarContainer.appendChild(hourRowContainer);

  const main = document.getElementById('content')

  main.appendChild(calendarContainer);

  const eventForm = createEventForm();
  main.appendChild(eventForm);
}



function createNavigationButtons() {
  const divNavArrows = document.createElement('div');
  divNavArrows.className = 'nav-arrows';

  return divNavArrows;
}

function createWeekBtn(btnId, btnText, targetDate) {
  const btnWeek = document.createElement('button');
  btnWeek.id = btnId;
  btnWeek.innerText = btnText;

  btnWeek.addEventListener('click', () => {
    //Get the previous week by 1
    today.setDate(targetDate);
    //Render the calendar for the updated week
    renderWeek();
  });


  return btnWeek;
}

function createWeekHeading() {
  const weekHeading = document.createElement('h1');
  weekHeading.className = 'weekHeading';
  const month = today.toLocaleString('default', { month: 'long' });
  weekHeading.innerText = `${month} ${today.getFullYear()}`;

  return weekHeading;
}

function createEventForm() {

  let divForm = document.getElementById('event-form-id');

  if(divForm) {
    return divForm;
  }

  console.log('form does not exist... creating one.');

  divForm = document.createElement('div');
  divForm.classList.add('event-form');
  divForm.classList.add('event-form-hidden');
  divForm.setAttribute('id', "event-form-id");

  // Create Submit button

  // Create X button
  const btnClose = document.createElement('button');
  btnClose.classList.add('btn-close');
  btnClose.innerText = 'X';
  btnClose.addEventListener('click', () => {
    hideEventForm()
  });

  divForm.appendChild(btnClose);

  return divForm;
}

function showEventForm() {
  const divForm = document.getElementById('event-form-id'); 
  divForm.classList.remove('event-form-hidden');
}

function hideEventForm() {
  const divForm = document.getElementById('event-form-id'); 
  divForm.classList.add('event-form-hidden');
}

