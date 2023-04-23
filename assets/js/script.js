// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const timeDisplayEl = $('#currentDay');
var currentHour = dayjs().format('H');
if (currentHour < 9) {
  currentHour = 9;
} else if (currentHour > 18) {
  currentHour = 18;
}

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

function saveUserInput() {
  const key = $(this).parent().attr('id');
  const value = $(this).siblings('.description').val();
  localStorage.setItem(key, value);
}

$(function () {
  // Use a loop to generate the HTML code for each time block
  const currentHour = dayjs().hour();
  for (let hour = 9; hour <= 18; hour++) {
    // Create a new row element for the time block
    const rowEl = $('<div>').addClass('row time-block').attr('id', `hour-${hour}`);

    // Create a new hour element with the current hour
    const hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
    if (hour === 12) {
      hourEl.text(`${hour}PM`);
    } else if (hour > 12) {
      hourEl.text(`${hour - 12}PM`);
    } else {
      hourEl.text(`${hour}AM`);
    }

    // Create a new textarea element for the description
    const textareaEl = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);

    // Check if there is a saved value in local storage for this textarea element
    const savedValue = localStorage.getItem(`hour-${hour}`);
    if (savedValue !== null) {
      textareaEl.val(savedValue);
    }

    // Create a new button element for the save button
    const buttonEl = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    const iconEl = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
    buttonEl.append(iconEl);

    // Append the hour, textarea, and button elements to the row element
    rowEl.append(hourEl, textareaEl, buttonEl);

    // Add the appropriate class for past, present, or future time blocks
    if (hour < currentHour) {
      rowEl.addClass('past');
    } else if (hour === currentHour) {
      rowEl.addClass('present');
    } else {
      rowEl.addClass('future');
     
    }

    $('.container-lg').append(rowEl);

    // Add a listener for click events on the save button. This code saves the user
    // input in local storage using a unique key based on the id of the containing
    // time-block.
    buttonEl.on('click', saveUserInput);

    // Add the row element to the container element
    $('.container-lg').append(rowEl);
  }

  // Call the displayTime function to initially display the current time
  displayTime();

  // Call the displayTime function every second to update the current time
  setInterval(displayTime, 1000);
});
