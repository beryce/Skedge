/* Calendar.js
by Alyssa Woodruff
for CS220 "Skedge" assignment
*/

// get current date and time
var today = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
var monthsAbbrev = ["Jan", "Feb", "March", "April", "May", "June", "July",
                    "Aug", "Sept", "Oct", "Nov", "Dec"];
var thisMonth = months[today.getMonth()];
var thisMonthAbbrev = monthsAbbrev[today.getMonth()];
var dayOfMonth = today.getDate(); // num from 1-31
var hour = today.getHours(); // returns from 0-23
var min = today.getMinutes();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var daysAbbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
var dayOfWeek = daysAbbrev[today.getDay()];

console.log("Today is " + dayOfWeek + ", " + thisMonth + " " + dayOfMonth);


// checks number of days in given month
function daysPerMonth(month) {
  var monthName = monthsAbbrev[month];
  var days30 = ["Nov", "April", "June", "Sept"];
  var days;
  if (monthName === "Feb") {
    days = 28; // possibly 29 but id rather not deal with that case since its just a prototype
  }
  else if (days30.indexOf(monthName) > -1 ) {
    days = 30;
  }
  else {
    days = 31;
  }
  return days;
}

// returns index with correct weekday name (abbreviated),
// month name (abbreviated), and day of month
function assignDay(dayOfWeek, month, dayOfMonth, increment) {
  var dayOfWeek2;
  var month2;
  var dayOfMonth2;
  var daysPM = daysPerMonth(month);

  if (dayOfWeek + increment > 6) {
    var dayOfWeek2 = daysAbbrev[dayOfWeek + increment - 7];
  }
  else {
    var dayOfWeek2 = daysAbbrev[dayOfWeek + increment];
  }

  if (dayOfMonth + increment > daysPM) {
    var month2 = monthsAbbrev[month + 1];
  }
  else {
    var month2 = monthsAbbrev[month];
  }

  if (dayOfMonth + increment > daysPM) {
    var dayOfMonth2 = dayOfMonth + increment - daysPM;
  }
  else {
    var dayOfMonth2 = dayOfMonth += increment;
  }

  return [dayOfWeek2,month2,dayOfMonth2];
}

// converts time from 0-23 to 12 hrs
function convertHour(hr, increment) {
  var newHour;
  var timeStr;
  if (hr == 0 && increment == 0) {
    newHour = 12;
    timeStr = "AM";
  }
  else if (hr < 13 && increment == 0) {
    newHour = hr;
    if (hr == 12) {
      timeStr = "PM";
    }
    else {
      timeStr = "AM";
    }
  }
  else if (hr > 12 && increment == 0) {
    newHour = hr - 12;
    timeStr = "PM";
  }
  else if (hr + increment == 12 && increment > 0) {
    timeStr = "PM";
    newHour = hr + increment;
  }
  else if (hr + increment > 12 && increment > 0) {
    newHour = hr + increment - 12;
    timeStr = "PM";
    if (hr + increment - 12 > 12) {
      newHour = hr + increment - 24;
      if (newHour < 12) {
        timeStr = "AM";
        //newHour = hr + increment - 12;
      }
    }
    else if (hr + increment == 24) {
      timeStr = "AM";
    }
  }
  else if (increment > 0) {
    newHour = hr + increment;
    timeStr = "AM";
    console.log(hr + increment);
  }
  return [newHour, timeStr];
}


// increments time
// half num is for whether it should be hr:00 or hr:30
function convertTime(hr, min, increment, halfnum) {
  var newHour = convertHour(hr,increment);
  var newMin;

  if (increment == 0) {
    if (min < 30 && halfnum == 0) {
      newMin = "00";
    }
    else if (min < 30 && halfnum == 1) {
      newMin = "30";
    }
    else if (min > 29 && halfnum == 0) {
      newMin = "30";
    }
    else if (min > 29 && halfnum == 1) {
      newMin = "00";
      newHour = convertHour(hr + 1,increment);
    }
  }
  else {
    if (halfnum == 0) {
      if (min < 30) {
        newMin = "00";
      }
      else {
        newMin = "30";
      }
    }
    else {
      if (min < 30) {
        newMin = "30";
      }
      else {
        newMin = "00";
        newHour = convertHour(hr + 1,increment);
      }
    }
  }

  return newHour[0] + ":" + newMin + " " + newHour[1];
}

// update calendar to current date and time (weekly view)
function updateCalendar() {
  // change top row to correct dates, starting w/ today and going through next six days
  $("#first-day").text(dayOfWeek + " " + thisMonthAbbrev + " " + dayOfMonth);
  var dayOfWeek2 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 1); // returns array
  $("#second-day").text(dayOfWeek2[0] + " " + dayOfWeek2[1] + " " + dayOfWeek2[2]);
  var dayOfWeek3 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 2);
  $("#third-day").text(dayOfWeek3[0] + " " + dayOfWeek3[1] + " " + dayOfWeek3[2]);
  var dayOfWeek4 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 3);
  $("#fourth-day").text(dayOfWeek4[0] + " " + dayOfWeek4[1] + " " + dayOfWeek4[2]);
  var dayOfWeek5 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 4);
  $("#fifth-day").text(dayOfWeek5[0] + " " + dayOfWeek5[1] + " " + dayOfWeek5[2]);
  var dayOfWeek6 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 5);
  $("#sixth-day").text(dayOfWeek6[0] + " " + dayOfWeek6[1] + " " + dayOfWeek6[2]);
  var dayOfWeek7 = assignDay(today.getDay(),today.getMonth(),today.getDate(), 6);
  $("#seventh-day").text(dayOfWeek7[0] + " " + dayOfWeek7[1] + " " + dayOfWeek7[2]);

}

var loc = $("#inputGroupSelect01 option:selected").text();

// displays events for given space on given day in right column
// display in calendar
function displayEvents(location) {
  if (location == "Choose...") {
    $("#calendar td").click(function() {
      // error handling: tells user to select building from drop down menu
      // if they want to see events displayed
      var newEventDiv = "<div class='event-item_c' id='error_c'>" + "<p>Please select a location first</p>"  + "</div>";
      $("#error_c").replaceWith(newEventDiv);
    });
    $("#calendar-month td").click(function() {
      // error handling: tells user to select building from drop down menu
      // if they want to see events displayed
      var newEventDiv = "<div class='event-item_c' id='error_c'>" + "<p>Please select a location first</p>"  + "</div>";
      $("#error_c").replaceWith(newEventDiv);
    });
  }
  else if (location == "Lulu Chow Wang Campus Center") {
    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#calendar-month td").css({"background-image":"none", "color":"#C00001"});

    // displays current events for lulu on side bar
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'>" + "<p>Dance Recital</p> <div class='event-time_c'> <p>" + $("#first-day").text() + "<br> 1:00-2:00 PM</p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>Guest Speaker</p> <div class='event-time_c'> <p>" + $("#second-day").text() + "<br> 4:00-5:30 PM</p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>Cultural Show</p> <div class='event-time_c'> <p>" + $("#fifth-day").text() + "<br> 7:00-9:00 PM</p> </div>"  + "</div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // makes times that are occupied appear red in week view calendar
    $("#calendar td").css({"background-image":"none"});
    $("#day1-hr11").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr12").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr13").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day2-hr17").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day2-hr18").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day2-hr19").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day2-hr20").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day5-hr23").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day5-hr24").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day5-hr25").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day5-hr26").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day5-hr27").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    // adds second drop down menu with rooms in lulu
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>Tishman Commons</option><option value='2'>Punch's Alley</option>";
    roomInput += "<option value='3'>Bae Pao Lu Chow Dining Room</option> <option value='4'>Room 305</option>";
    roomInput += "<option value='5'>Cow Chair Room</option> <option value='6'>Room 415</option></select> </div>";

    $("#room-option").replaceWith(roomInput);

    // creates gradient for days with events in month view calendar
    var firstitem = $("#first-day").text().slice(-2);
    var seconditem = $("#second-day").text().slice(-2);
    var thirditem = $("#fifth-day").text().slice(-2);
    $('td:contains('+ firstitem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
    $('td:contains('+ seconditem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
    $('td:contains('+ thirditem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});


  }
  else if (location == "Jewett Arts Center") {
    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#calendar-month td").css({"background-image":"none", "color":"#C00001"});

    // displays current events for jewett on side bar
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'>" + "<p>MUS 100 Lecture</p> <div class='event-time_c'> <p>" + $("#first-day").text() +"<br> 9:50-11:00 AM </p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>Jazz Practice</p> <div class='event-time_c'> <p>" + $("#sixth-day").text() + "<br> 6:00-7:00 PM</p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>On Tap Rehearsal</p> <div class='event-time_c'> <p>" + $("#seventh-day").text() + "<br> 7:00-9:00 PM</p> </div>"  + "</div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // makes times that are occupied appear red in week view calendar
    $("#calendar td").css({"background-image":"none"});
    $("#day1-hr4").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr5").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr6").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr7").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day6-hr21").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day6-hr22").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day6-hr23").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day7-hr23").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day7-hr24").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day7-hr25").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day7-hr26").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day7-hr27").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    // adds second drop down menu with rooms in jewett
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>Jewett Auditorium</option><option value='2'>JAC 209</option>";
    roomInput += "<option value='3'>JAC 218</option> <option value='4'>JAC 372</option>";
    roomInput += "<option value='5'>JAC 452</option> <option value='6'>Sculpture Court</option></select> </div>";

    $("#room-option").replaceWith(roomInput);

    // creates gradient for days with events in month view calendar
    var firstitem = $("#first-day").text().slice(-2);
    var seconditem = $("#sixth-day").text().slice(-2);
    var thirditem = $("#seventh-day").text().slice(-2);
    $('td:contains('+ firstitem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
    $('td:contains('+ seconditem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
    $('td:contains('+ thirditem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});


  }
  else if (location == "Clapp Library") {
    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#calendar-month td").css({"background-image":"none", "color":"#C00001"});

    // displays current events for clapp on side bar
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'>" + "<p>Writing tutors</p> <div class='event-time_c'> <p>" + $("#first-day").text() + "<br> 12:00-2:00 PM</p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>Guest Speaker</p> <div class='event-time_c'> <p>" + $("#first-day").text() + "<br> 5:00-6:30 PM</p> </div>"  + "</div>";
    newEventDiv += "<div class='event-item_c'>" + "<p>Study Group</p> <div class='event-time_c'> <p>" + $("#fourth-day").text() + "<br>7:00-8:30 PM</p> </div>"  + "</div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // makes times that are occupied appear red in week view calendar
    $("#calendar td").css({"background-image":"none"});
    $("#day1-hr9").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr10").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr11").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr12").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr13").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day1-hr19").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr20").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr21").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day1-hr22").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    $("#day4-hr23").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day4-hr24").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day4-hr25").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});
    $("#day4-hr26").css({"background-image":"linear-gradient(-90deg,rgb(192, 0, 1),rgb(192, 0, 1))"});

    // adds second drop down menu with rooms in clapp
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>Lecture Room</option><option value='2'>Margaret Sanger Room</option>";
    roomInput += "<option value='3'>PLTC</option> <option value='4'>Knapp Center</option>";
    roomInput += "<option value='5'>Room 258</option> <option value='6'>Room 318</option></select> </div>";

    $("#room-option").replaceWith(roomInput);

    // creates gradient for days with events in month view calendar
    var firstitem = $("#first-day").text().slice(-2);
    var seconditem = $("#fourth-day").text().slice(-2);
    $('td:contains('+ firstitem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
    $('td:contains('+ seconditem + ')').css({'background-image':"linear-gradient(-90deg,rgba(192, 0, 1, .5),rgba(192, 0, 1, 1))", "color": "white"});
  }
  else if (location == "Pendleton East") {
    // displays in error handling div that there are no events currently available
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'><p> No events available </div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // adds second drop down menu with rooms in PNE
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>PNE 127</option><option value='2'>Atrium</option>";
    roomInput += "<option value='3'>PNE 251</option> <option value='4'>PNE 327</option>";
    roomInput += "<option value='5'>PNE 339</option> <option value='6'>PNE 351</option></select> </div>";

    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#room-option").replaceWith(roomInput);
    $("#calendar td").css({"background-image":"none"});
    $("#calendar-month td").css({"background-image":"none","color":"#C00001"});
  }
  else if (location == "Pendleton West") {
    // displays in error handling div that there are no events currently available
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'><p> No events available </div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // adds second drop down menu with rooms in PNW
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>PNW 001</option><option value='2'>PNW 101</option>";
    roomInput += "<option value='3'>PNW 106</option> <option value='4'>PNW 202</option>";
    roomInput += "<option value='5'>PNW 203</option> <option value='6'>PNW 208</option></select> </div>";

    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#room-option").replaceWith(roomInput);
    $("#calendar td").css({"background-image":"none"});
    $("#calendar-month td").css({"background-image":"none","color":"#C00001"});
  }
  else if (location == "Science Center") {
    // displays in error handling div that there are no events currently available
    var newEventDiv = "<div class='event-item_c' id='error_c'></div><div class='event-item_c'><p> No events available </div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // adds second drop down menu with rooms in science center
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>Greenhouse Visitor's Center</option><option value='2'>Penthouse Foyer</option>";
    roomInput += "<option value='3'>Observatory</option> <option value='4'>SCI 274</option>";
    roomInput += "<option value='5'>SCI 261</option> <option value='6'>E101</option></select> </div>";

    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#room-option").replaceWith(roomInput);
    $("#calendar td").css({"background-image":"none"});
    $("#calendar-month td").css({"background-image":"none","color":"#C00001"});
  }
  else if (location == "Alumnae Hall") {
    // displays in error handling div that there are no events currently available
    var newEventDiv = "<div class='event-item_c'> <p> No events available </div>";
    $("#events-available").replaceWith("<div id='events-available'>" + newEventDiv + "</div>");
    $("#book-item_c").replaceWith("<div id='book-item_c'></div>");

    // adds second drop down menu with rooms in alumnae
    var roomInput = "<div class='input-group mb-3' id='room-option'><div class='input-group-prepend'>";
    roomInput += "<label class='input-group-text' for='inputGroupSelect01'>Room</label></div>";
    roomInput += "<select class='custom-select' id='inputGroupSelect02'> <option selected>Choose...</option>";
    roomInput += "<option value='1'>Auditorium</option><option value='2'>Ballroom</option>";
    roomInput += "<option value='3'>Jones Theater</option> <option value='4'>ALH 102</option>";
    roomInput += "<option value='5'>ALH 303</option> </select> </div>";

    // makes all the days in the calendar default to normal css (white background and red font) in month view
    $("#room-option").replaceWith(roomInput);
    $("#calendar td").css({"background-image":"none"});
    $("#calendar-month td").css({"background-image":"none","color":"#C00001"});
  }
}

// when user clicks on time in calendar, it adds
// a box that has the given time and "book event" button
function chooseTime() {
  // week view calendar
  var dayAndTime = this.id; // id for item clicked
  console.log("#" + dayAndTime);
  var day = dayAndTime.substr(0,4);
  var time = dayAndTime.slice(7);
  var selectedTime;
  var selectedDate;

  // so that only one td is highlighted gold at a time
  $("#calendar td").css({"background-color":"white"});
  $("#" + dayAndTime).css({"background-color":"#F5A423"});
  selectedTime = $("#half-hour" + time).text();

  if (day == "day1") {
    console.log($("#first-day").text());
    selectedDate = $("#first-day").text();
  }
  else if (day == "day2") {
    console.log($("#second-day").text());
    selectedDate = $("#second-day").text();
  }
  else if (day == "day3") {
    console.log($("#third-day").text());
    selectedDate = $("#third-day").text();
  }
  else if (day == "day4") {
    console.log($("#fourth-day").text());
    selectedDate = $("#fourth-day").text();
  }
  else if (day == "day5") {
    console.log($("#fifth-day").text());
    selectedDate = $("#fifth-day").text();
  }
  else if (day == "day6") {
    console.log($("#sixth-day").text());
    selectedDate = $("#sixth-day").text();
  }
  else if (day == "day7") {
    console.log($("#seventh-day").text());
    selectedDate = $("#seventh-day").text();
  }

  var booked = $(this).css("background-image");

  // displays error message if time is already booked
  if (booked == "linear-gradient(-90deg, rgb(192, 0, 1), rgb(192, 0, 1))") {
    var newEventDiv = "<div class='event-item_c' id='error_c'>" + "<p>Location is already booked at that time</p>"  + "</div>";
    $("#error_c").replaceWith(newEventDiv);
    $("#error_c").css("display","block");
    $("#book-item_c").css({"display":"none"});
  }
  else {
    // displays book an event div with correct time and date of selected element
    var newEventDiv = "<div id='book-item_c'> <h3> Book an Event </h3> <p>" + selectedDate + "<br>" + selectedTime + "</p> <a href='book_an_event.html'><button type='button'> Book Now </button></a>" + "</div>";
    $("#error_c").css({"display":"none"});
    $("#book-item_c").replaceWith(newEventDiv);
    $("#book-item_c").css({"height": "225px","padding":"15px", "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 #f4f4f4"});
    $("#book-item_c h3").css({"width": "100%", "color":"#C00001", "text-align":"center"});
    $("#book-item_c p").css({"padding":"0px","margin":"20px","float":"none","text-align":"center","font-size":"25px"});
    $("#book-item_c button").css({"margin-left":"35%", "background-color":"#C00001","border-radius": "5px", "color":"white",
     "border":"none","font-size":"20px", "padding": "5px", "padding-right": "10px", "padding-left": "10px"});
  }

}

// chooseTime function but for month view
function chooseTimeMonth() {
  // week view calendar
  var dayAndTime = this.id; // id for item clicked
  var selectedDate;

  // code for month view Calendar
  var mvDay = $("#" + dayAndTime).text(); // day of month
  var mvDayOfWeek = dayAndTime.slice(6);  // day1, day2, etc...

  // so that only one td is highlighted gold at a time
  $("#calendar-month td").css({"background-color":"white"});

  $("#" + dayAndTime).css({"background-color":"#F5A423"});

  // gets day of week to display in book event div
  if (mvDayOfWeek == "day1") {
    selectedDate = "Sunday";
  }
  else if (mvDayOfWeek == "day2") {
    selectedDate = "Monday";
  }
  else if (mvDayOfWeek == "day3") {
    selectedDate = "Tuesday";
  }
  else if (mvDayOfWeek == "day4") {
    selectedDate = "Wednesday";
  }
  else if (mvDayOfWeek == "day5") {
    selectedDate = "Thursday";
  }
  else if (mvDayOfWeek == "day6") {
    selectedDate = "Friday";
  }
  else if (mvDayOfWeek == "day7") {
    selectedDate = "Saturday";
  }

  var booked = $(this).css("background-image");

  // displays error message if time is already booked
  // NOTE: doesn't apply to month view calendar b/c day may be partially booked
  // but probably has some times available
  // (should probably just delet this part)
  if (booked == "linear-gradient(-90deg, rgb(192, 0, 1), rgb(192, 0, 1))") {
    var newEventDiv = "<div class='event-item_c' id='error_c'>" + "<p>Location is already booked at that time</p>"  + "</div>";
    $("#error_c").replaceWith(newEventDiv);
    $("#error_c").css("display","block");
    $("#book-item_c").css({"display":"none"});
  }
  else {
    if (mvDay != "") {
      // displays book an event div with correct date of selected element
      var newEventDiv = "<div id='book-item_c'> <h3> Book an Event </h3> <p>" + selectedDate + ", <br>" + thisMonth + " " + mvDay + "<br>" + "</p> <a href='book_an_event.html'><button type='button'> Book Now </button></a>" + "</div>";
      $("#error_c").css({"display":"none"});
      $("#book-item_c").replaceWith(newEventDiv);
      $("#book-item_c").css({"height": "225px","padding":"15px", "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 #f4f4f4"});
      $("#book-item_c h3").css({"width": "100%", "color":"#C00001", "text-align":"center"});
      $("#book-item_c p").css({"padding":"0px","margin":"20px","float":"none","text-align":"center","font-size":"25px"});
      $("#book-item_c button").css({"margin-left":"35%", "background-color":"#C00001","border-radius": "5px", "color":"white",
        "border":"none","font-size":"20px", "padding": "5px", "padding-right": "10px", "padding-left": "10px"});
    }
    else {
      // error handling for cases where user clicks on date outside of current month
      // (blank spaces in month view of calendar)
      var newEventDiv = "<div class='event-item_c' id='error_c'>" + "<p>Please pick a date within the month</p>"  + "</div>";
      $("#error_c").replaceWith(newEventDiv);
      $("#error_c").css({"display":"block"});
      $("#calendar-month td").css({"background-color":"white"});
      $("#book-item_c").css({"display":"none"});
    }
  }

}

// toggles between month and week view for Calendar
function chooseCalendar() {
  $("#week-button").click(function() {
    $("#calendar-month").css("display","none");
    $("#calendar-month-name").html("Week of " + thisMonth + " " + dayOfMonth + ", " + today.getFullYear());
    $("#calendar-month-name").css({"margin-left":"25%"});
    $("#calendar").css("display","block");
    $("#week-button").css({"background-color": "#750a0b"});
    $("#month-button").css({"background-color": "#C00001"});
  });
  $("#month-button").click(function() {
    $("#calendar-month").css("display","inline-table");
    $("#calendar-month-name").html(thisMonth + " " + today.getFullYear());
    $("#calendar-month-name").css({"margin-left":"35%"});
    $("#calendar").css("display","none");
    //$("#error_c").css("display","none");
    $("#book-item_c").css("display","none");
    $("#calendar td").css({"background-color":"white"});
    $("#week-button").css({"background-color": "#C00001"});
    $("#month-button").css({"background-color": "#750a0b"});

  });
}

// displays the days of the month in the month view calendar
function displayMonthly() {
  var date;
  var daysPerM = daysPerMonth(thisMonth);
  var startDate = new Date(2018, today.getMonth(), 1);
  var firstDayOfWeek = "day" + (startDate.getDay() + 1);

  $("#calendar-month-name").html(thisMonth);

  for (var i=0; i < daysPerM; i++) {
    date = assignDay(startDate.getDay(),startDate.getMonth(),startDate.getDate(), i);
    var day = date[2];

    if (i == 0) {
      $("#week1-" + firstDayOfWeek).html(day);
    }
    else if (i > 0) {
      if (startDate.getDay() + 1 == 7) {
        if (i < 8) {
          $("#week" + 2 + "-day" + i).html(day);
        }
        else if (i < 15) {
          $("#week" + 3 + "-day" + (i-7)).html(day);
        }
        else if (i < 22) {
          $("#week" + 4 + "-day" + (i-14)).html(day);
        }
        else if (i < 29) {
          $("#week" + 5 + "-day" + (i-21)).html(day);
        }
        else {
          $("#week" + 6 + "-day" + (i-28)).html(day);
        }
      }
    }
  }
}

$(document).ready(function(event) {
  // event handler changes the text after "Event at:"
  // with whatever the user has chosen from the Event Space dropdown menu
  $('#inputGroupSelect01').change(function(e){
    var loc = $("#inputGroupSelect01 option:selected").text();
    $("#calendar td").css({"background-color":"white"});
    $("#calendar-month td").css({"background-color":"white"});
    console.log(loc);
    $("#space-input").html(loc);
    if (loc == "Choose...") {
      displayEvents(loc);
    }
    else {
      displayEvents(loc);
      $("#calendar td").click(chooseTime);
      $("#error_c").css({"display":"none"});
      $("#calendar-month td").click(chooseTimeMonth);
    }
   }).change();
  $("#calendar-month").css("display","none");
  $("#week-button").css({"background-color": "#750a0b"});
  $("#month-button").css({"background-color": "#C00001"});

  chooseCalendar();
  displayMonthly();
  updateCalendar();

  $("#calendar-month-name").html("Week of " + thisMonth + " " + dayOfMonth + ", " + today.getFullYear());
  $("#calendar-month-name").css({"margin-left":"25%"});

});
