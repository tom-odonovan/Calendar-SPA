let today = new Date();

export function renderWeek() {
      console.log(`Today's date = ${today}`);
      // Clear the calendar container
      const calendarContainer = document.getElementById('calendar-container')
      calendarContainer.innerHTML = ''

      // Determine the first and last days of the week to display
      const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
      // const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

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

        // by adding a condition, check if current day is today adding highlight
        if (currentDay.toDateString() === new Date().toDateString()) {
          //add a class to the header cell called .today
          headerCell.classList.add('today');
        }

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

          let date = getFullDateByCell(today, day, hour);
          dayCell.setAttribute('data-date', date);


          dayCell.addEventListener('click', (event) => {
            showEventForm(event);
            populateForm(dayCell.getAttribute('data-date'), event);
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

      //RENDER EVENTS 
      renderEvents();  
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
          renderEvents();
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

//Create the event form
export function createEventForm() {

        let divForm = document.getElementById('event-form-id');
        //So that it doesn't repeat...
        if (divForm) {
          return divForm;
        }

        console.log('form does not exist... creating one.');

        divForm = document.createElement('div');
        divForm.classList.add('event-form');
        divForm.classList.add('event-form-hidden');
        divForm.setAttribute('id', "event-form-id");

        // Create X button
        const btnClose = document.createElement('button');
        btnClose.classList.add('btn-close');
        btnClose.innerText = 'X';
        btnClose.addEventListener('click', () => {
          hideEventForm()
        });

        divForm.appendChild(btnClose);

        // Create the New Event section
        const divNewEvent = document.createElement('div');
        divNewEvent.classList.add('event-form-section');
        const h4NewEvent = document.createElement('h4');
        h4NewEvent.className = 'h4-New-Event'
        h4NewEvent.innerText = 'New Event';
        divNewEvent.appendChild(h4NewEvent);
        divForm.appendChild(divNewEvent);

        // Create the Event Name section
        const divEventName = document.createElement('div');
        divEventName.classList.add('event-form-section');
        const h5EventName = document.createElement('h5');
        h5EventName.innerText = 'Event Name';
        const textareaEventName = document.createElement('textarea');
        textareaEventName.id = 'event-element';
        textareaEventName.name = 'event name';
        textareaEventName.placeholder = 'Enter name for the event';
        divEventName.appendChild(h5EventName);
        divEventName.appendChild(textareaEventName);
        divForm.appendChild(divEventName);

        // Create the Date section
        const divDate = document.createElement('div');
        divDate.classList.add('event-form-section');
        const h5Date = document.createElement('h5');
        h5Date.innerText = 'Date';
        const dateInput = document.createElement('input');
        dateInput.id = 'date-element'
        dateInput.type = 'date';
        dateInput.name = 'date';
        divDate.appendChild(h5Date);
        divDate.appendChild(dateInput);
        divForm.appendChild(divDate);

        // Create the Start Time section
        const divStartTime = document.createElement('div');
        divStartTime.classList.add('event-form-section');
        const h5StartTime = document.createElement('h5');
        h5StartTime.innerText = 'Start Time';
        const startTimeInput = document.createElement('input');
        startTimeInput.id = 'start-time-element'
        startTimeInput.type = 'time';
        startTimeInput.name = 'start_time';
        divStartTime.appendChild(h5StartTime);
        divStartTime.appendChild(startTimeInput);
        divForm.appendChild(divStartTime);

        // Create the Add Location section
        const divAddLocation = document.createElement('div');
        divAddLocation.classList.add('event-form-section');
        const h5AddLocation = document.createElement('h5');
        h5AddLocation.innerText = 'Location';
        const inputLocation = document.createElement('input');
        inputLocation.id = 'location-element'
        inputLocation.type = 'text';
        inputLocation.name = 'location';
        inputLocation.placeholder = 'Enter the location';
        divAddLocation.appendChild(h5AddLocation);
        divAddLocation.appendChild(inputLocation);
        divForm.appendChild(divAddLocation);

        // Create the Details section
        const divDetails = document.createElement('div');
        divDetails.classList.add('event-form-section');
        const h5Details = document.createElement('h5');
        h5Details.innerText = 'Details';
        const textareaDetails = document.createElement('textarea');
        textareaDetails.id = 'details-element'
        textareaDetails.name = 'details';
        textareaDetails.placeholder = 'Enter details of the event';
        divDetails.appendChild(h5Details);
        divDetails.appendChild(textareaDetails);
        divForm.appendChild(divDetails);

        // Create Submit button
        const divSubmit = document.createElement('div');
        divSubmit.classList.add('event-form-section');
        divSubmit.classList.add('event-form-submit');
        const buttonSubmit = document.createElement('button');
        buttonSubmit.id = 'submit-button-id'
        buttonSubmit.className = 'button-submit'
        buttonSubmit.type = 'submit';
        buttonSubmit.innerText = 'Submit';

        // Create Update button
        const divUpdate = document.createElement('div');
        divUpdate.classList.add('event-form-section');
        divUpdate.classList.add('event-form-update');
        const buttonUpdate = document.createElement('button');
        buttonUpdate.id = 'update-button-id'
        buttonUpdate.classList.add('button-update');
        buttonUpdate.classList.add('button-hidden');
        buttonUpdate.type = 'submit';
        buttonUpdate.innerText = 'Update';

        // Create Delete button
        const divDelete = document.createElement('div');
        divDelete.classList.add('event-form-section');
        divDelete.classList.add('event-form-delete');
        const buttonDelete = document.createElement('button');
        buttonDelete.id = 'delete-button-id'
        buttonDelete.classList.add('button-delete');
        buttonDelete.classList.add('button-hidden');
        buttonDelete.type = 'submit';
        buttonDelete.innerText = 'Delete';        


        divSubmit.appendChild(buttonSubmit);
        divUpdate.appendChild(buttonUpdate);
        divDelete.appendChild(buttonDelete);

        divForm.appendChild(divSubmit);
        divForm.appendChild(divUpdate);
        divForm.appendChild(divDelete);

        // Add the event listener to the submit button
        // const submitButton = document.getElementById("submit-button-id")
        buttonSubmit.addEventListener("click", (event) => {
          // prevent page refresh
          event.preventDefault();

          axios
            .get('/api/sessions')
            .then((response) => {
              let userId = response.data.user_id

              const eventData = {
                user_id: userId,
                calendar_id: 1,
                title: textareaEventName.value,
                date: dateInput.value,
                start_time: startTimeInput.value,
                location: inputLocation.value,
                description: textareaDetails.value
              };

              axios
                .post('/api/events', eventData)
                .then((response) => {
                  console.log('---- success ----')
                  console.log(response.data)
                  hideEventForm()
                  renderEvents()
                }).catch(error => {
                  console.log('---- error ----')
                  console.log(error.response.data)
                })
            });
        });

        buttonUpdate.addEventListener("click", (event) => {
          // prevent page refresh
          event.preventDefault();

          const eventId = event.target.getAttribute('data-event-id');

          axios
            .get('/api/sessions')
            .then((response) => {
              let userId = response.data.user_id

              const eventData = {
                user_id: userId,
                calendar_id: 1,
                title: textareaEventName.value,
                date: dateInput.value,
                start_time: startTimeInput.value,
                location: inputLocation.value,
                description: textareaDetails.value
              };

              axios
                .put('/api/events/' + eventId, eventData)
                .then((response) => {
                  console.log('---- success ----')
                  console.log(response.data)
                  hideEventForm()
                  renderWeek()
                  renderEvents()
                }).catch(error => {
                  console.log('---- error ----')
                  console.log(error.response.data)
                })
            });
        });

        buttonDelete.addEventListener("click", (event) => {
          // prevent page refresh
          event.preventDefault();

          const eventId = event.target.getAttribute('data-event-id');

          axios
            .get('/api/sessions')
            .then((response) => {

              axios
                .delete('/api/events/' + eventId)
                .then((response) => {
                  console.log('---- success ----')
                  console.log(response.data)
                  hideEventForm()
                  renderWeek()
                  renderEvents()
                }).catch(error => {
                  console.log('---- error ----')
                  console.log(error.response.data)
                })
            });
        });

        return divForm;
      }


    axios
        .get('/api/sessions')
        .then((response) => {
            let userId = response.data.user_id

            const eventData = {
              user_id: userId,
              calendar_id: 4,
              title: textareaEventName.value,
              date: dateInput.value,
              start_time: startTimeInput.value,
              location: inputLocation.value,
              description: textareaDetails.value
            };
        
            axios
              .post('/api/events', eventData)
              .then((response) => {
                console.log('---- success ----')
                console.log(response.data)
                hideEventForm()
              }).catch(error => {
                console.log('---- error ----')
                console.log(error.response.data)
              })
            // console.log('---');
            // console.log(eventData);
            // console.log('---');
        

function showEventForm(event) {


        const cellEvent = event.target.innerText
        const divForm = document.getElementById('event-form-id');
        divForm.classList.remove('event-form-hidden');

        let txtAreaField = document.getElementById('event-element');
        txtAreaField.value = "";


export function showEventForm() {
  const divForm = document.getElementById('event-form-id');
  divForm.classList.remove('event-form-hidden');

        let inputDateField = document.getElementById('date-element');
        inputDateField.value = "";


        let startTimeField = document.getElementById('start-time-element');
        startTimeField.value = "";

        let locationField = document.getElementById('location-element');
        locationField.value = "";

        let detailsField = document.getElementById('details-element');
        detailsField.value = "";

        if (cellEvent === "") {
          document.getElementById('submit-button-id').classList.remove('button-hidden');
          document.getElementById('update-button-id').classList.add('button-hidden');
          document.getElementById('delete-button-id').classList.add('button-hidden');
        } else {
          document.getElementById('submit-button-id').classList.add('button-hidden');
          
          const btnUpdate = document.getElementById('update-button-id');
          btnUpdate.classList.remove('button-hidden');
          btnUpdate.setAttribute('data-event-id', event.target.getAttribute('data-event-id'))

          const btnDelete = document.getElementById('delete-button-id');
          btnDelete.classList.remove('button-hidden');
          btnDelete.setAttribute('data-event-id', event.target.getAttribute('data-event-id'))
        }

      }

function hideEventForm() {
        const divForm = document.getElementById('event-form-id');
        divForm.classList.add('event-form-hidden');
      }

//populates the Add event form when clicked a specified cell with the clicked date and time
function populateForm(date, event) {
        
        // Populate Date
        const dateObj = new Date(date);
        //using toLocaleDateString method to get the date
        const dateString = dateObj.toLocaleDateString();

        let inputDateField = document.getElementById('date-element');
        //splits the dateString to an array gets the date and splits it to conform on the YYYY-MM-DD format
        inputDateField.value = dateString.split('/')[2] + "-" + dateString.split('/')[1] + "-" + dateString.split('/')[0];

        // Populate Time
        const newDateObj = new Date(date);
        const timeString = newDateObj.toLocaleString();
        let startTimeField = document.getElementById('start-time-element');
        startTimeField.value = timeString.split(', ')[1] + "";

        // Populate Description
        let descriptionField = document.getElementById('details-element');
        descriptionField.value = event.target.getAttribute('data-event-description')
        
        // Populate Title
        let titleField = document.getElementById('event-element');
        titleField.value= event.target.getAttribute('data-event-title')
        
        // Populate Location
        let localtionField = document.getElementById('location-element');
        localtionField.value = event.target.getAttribute('data-event-location');

      }

function getFullDateByCell(today, day, hour) {
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
        const currentDay = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + day);
        currentDay.setHours(hour);
        return currentDay;
      }

function getDayFromDateString(date) {
  
  const theDate = new Date(date);

  return theDate.getDay() - 1;
}

function getHourFromTimeString(time) {

  return parseInt(time.split(':')[0]);
  
}

function renderEvents() {
  axios
  .get("http://localhost:3000/api/sessions")
  .then((response) => {
    const session = response.data
    const user_id = session.user_id

    axios
      .get(`http://localhost:3000/api/events/${user_id}`) // <--- INSERT USER-ID FROM SESSION HERE
      .then((response) => {
        let events = response.data;
        events.forEach(function(event) {
            
          let date = event.date;
          let title = event.title;
          let time = event.start_time;

                    // Get the beginning of the week date
          // Get the end of the week date

          const firstDayOfTheWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
          const lastDayOfTheWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));

          if(new Date(date) >= firstDayOfTheWeek && new Date(date) <= lastDayOfTheWeek) {
            let day = getDayFromDateString(date);
            let hour = getHourFromTimeString(time);
            const cellId = 'event-' + day + '-' + hour;
            // const cellId = 'event-' + day + '-' + time;
            // get the element event-{day}-{time}
            
            const cell = document.getElementById(cellId);
            cell.setAttribute('data-event-id',event.id);
            cell.setAttribute('data-event-title',event.title);
            cell.setAttribute('data-event-location',event.location);
            cell.setAttribute('data-event-description',event.description);
            cell.innerText = title;
          }

        });
        
        
      });
  });  
}