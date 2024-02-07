// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?


  // Create variable to access save buttons
  var saveBtnEl = $('.saveBtn');

  // Add event listener for click events on save buttons
  saveBtnEl.on('click', function() {
    // Get user input for each time block using description class
    var taskEl = $(this).siblings('.description').val();
    // Get id from the time block to use as a key for local storage
    var idKey = $(this).parent().attr('id');
    // Saves user input (description) in local storage using corresponding time block key
    localStorage.setItem(idKey, taskEl);
  });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  // Create variable to access time-block elements
  var timeBlockEl = $('.time-block');
  // Applies past, present, and future classes to each time block based on current time (dayjs)
  function updateHourClasses() {
    // Creates variable to hold current hour using dayjs
    var currentHour = dayjs().hour();
    // for each time block grab the associated hour value
    timeBlockEl.each(function() {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);
      // Compare current hour to each time block hour value to determine corresponding class
      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?


  // Get any user input saved in local storage and display it in corresponding time blocks
  function loadSavedTasks() {
    // For each time block grab the id key and then pull saved user data from each time block
    timeBlockEl.each(function() {
      // Grab id key
      var idKey = $(this).attr('id');
      // Grab saved tasks using id key
      var savedTask = localStorage.getItem(idKey);
      // Checks to see if there is saved data and displays undefined if not found
      if (savedTask !== null) {
        $(this).children('.description').val(savedTask);
      }
    });
  }


  // TODO: Add code to display the current date in the header of the page.


  // Function to display date/time to top of page
  function displayDateTime() {
    // Save variable to hold current time/date (dayjs)
    var today = dayjs();
    // Grab current day html element and display variable in correct format
    $("#currentDay").text(today.format("dddd MMM D, YYYY, h:mm:ss a"));
  }


  // Call functions to load page
  displayDateTime();
  updateHourClasses();
  loadSavedTasks();
});
