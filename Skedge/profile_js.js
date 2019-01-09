/*global $*/
/*global load*/

/*specifies code for the date and time pickers*/
$(function () {
    $("#datepicker_start").datepicker();
    $("#datepicker_end").datepicker();

    $("#timepicker_start").timepicker();
    $("#timepicker_end").timepicker();
});

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Checks to make sure that the inputs for setup, takedown, and number of attendees is valid
/*will refuse to redirect to confirmation page till correct inputs are entered*/
function validate() {
    var setup = validateSetup();
    var event_name = validateEventName();
    var takedown = validateTakedown();
    var attendees = validateAttendees();
    var start = validateStartDate();
    var end = validateEndDate();
    var timestart = validateTimeStart();
    var timeend = validateTimeEnd();
    var location = validateLocation();
    var type = validateEventType();
    var room = validateRoom();
    var org = validateOrganizationName();
    // var book = document.getElementById("book_button");
    var msg = document.getElementById("error_msg")
    if (!setup || !takedown || !event_name || !room || !attendees || !start || !end || !timestart || !timeend || !location || !type || !org) {
        msg.style.display = "block";
        return false;
    } else {
        window.location = "pre-confirmation.html";
        return true;
    }
}

function validateEventName() {
    var eventname = document.getElementById("eventname");
    if (eventname.value == "") {
        $("#eventname").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#eventname").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

function validateOrganizationName() {
    var org = document.getElementById("organization_name");
    if (org.value == "") {
        $("#organization_name").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#organization_name").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }

}
/*makes sure a start time is specified or else
returns false and highlights the input field in red*/
function validateTimeStart() {
    var timestart = document.getElementById("timepicker_start");
    if (timestart.value == "") {
        $("#timepicker_start").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#timepicker_start").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

/*makes sure an end time is specified or else
returns false and highlights the input field in red*/
function validateTimeEnd() {
    var timeend = document.getElementById("timepicker_end");
    if (timeend.value == "") {
        $("#timepicker_end").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#timepicker_end").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

/*makes sure a start date is specified or else
returns false and highlights the input field in red*/
function validateStartDate() {
    var start = document.getElementById("datepicker_start");
    if (start.value == "") {
        $("#datepicker_start").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#datepicker_start").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

/*makes sure an end date is specified or else
returns false and highlights the input field in red*/
function validateEndDate() {
    var end = document.getElementById("datepicker_end");
    if (end.value == "") {
        $("#datepicker_end").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#datepicker_end").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

/*makes sure a location is specified or else
returns false and highlights the input field in red*/
function validateLocation() {
    var loc = document.getElementById("location");
    if (loc.value == "" || loc.value == "Select Location") {
        $("#location").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#location").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

/*makes sure an event type is specified or else
returns false and highlights the input field in red*/
function validateEventType() {
    var type = document.getElementById("type");
    if (type.value == "Select Type") {
        $("#type").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#type").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}
// Ensures that there is a valid number entered into set up time
function validateSetup() {
    var setup = document.getElementById("setuphours");
    var reg = /^\d+$/;
    if (!(reg.test(setup.value)) || setup.value == "") {
        $("#setuphours").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#setuphours").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}


// Ensures that there is a valid number entered into take down time
function validateTakedown() {
    var takedown = document.getElementById("takedownhours");
    var reg = /^\d+$/;
    if (!(reg.test(takedown.value)) || takedown.value == "") {
        $("#takedownhours").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#takedown").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

// Ensures that there is a valid number entered into number of attendees
function validateAttendees() {
    var attendees = document.getElementById("numattendees");
    var reg = /^\d+$/;
    if (!(reg.test(attendees.value)) || attendees.value == "") {
        $("#numattendees").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#numattendees").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

function validateRoom() {
    var location = document.getElementById("the_room_location");
    if (location.value == "Select Location") {
        $("#the_room_location").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#the_room_location").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }

}

/*checks if a certain date is available
for now the dates are hard coded but ideally
would update according to real data*/

function checkAvailability() {
    console.log("clicked");
    var dates = ["12/11/2018", "12/12/2018", "12/15/2018", "12/14/2018", "12/16/2018", "12/17/2018"]
    var avail = document.getElementById("datepicker_start")
    var msg = document.getElementById("not_avail");
    var timestart = validateTimeStart();
    var timeend = validateTimeEnd();
    var location = validateLocation();
    var start = validateStartDate();
    var end = validateEndDate();
    var room = validateRoom();
    var isValid = false;
    for (i = 0; i < dates.length; i++) {
        if (!timestart || !timeend || !location || !start || !end || !room ) {
            $("#not_avail").text("Please select a date and location above.")
            $("#not_avail").css({
                "color": "#c00001",
                "visibility": "visible"
            });
            isValid = false;
            return isValid;
        }
        if (avail.value == dates[i]) {
            $("#not_avail").text("Location is not available at this time");
            $("#not_avail").css({
                "color": "#c00001",
                "visibility": "visible"
            });
            isValid = false;
            return isValid;
        }
        if (avail.value !== dates[i]) {
            $("#not_avail").text("Location is available");
            $("#not_avail").css({
                "color": "green",
                "visibility": "visible"
            });
            msg.style.display = "block";
            isValid = false;
            return isValid;
        }
    }
}


function roomsShown(loc) {
    if (loc == "Lulu Chow Wang Campus Center") {
        // adds second drop down menu with rooms in luli
        var roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>Tishman Commons</option><option value='2'>Punch's Alley</option>";
        roomInput += "<option value='3'>Bae Pao Lu Chow Dining Room</option> <option value='4'>Room 305</option>";
        roomInput += "<option value='5'>Cow Chair Room</option> <option value='6'>Room 415</option></select> </div>";

        $("#the_room_location").replaceWith(roomInput);
    } else if (loc == "Jewett") {
        // adds second drop down menu with rooms in jewett
        var roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>Jewett Auditorium</option><option value='2'>JAC 209</option>";
        roomInput += "<option value='3'>JAC 218</option> <option value='4'>JAC 372</option>";
        roomInput += "<option value='5'>JAC 452</option> <option value='6'>Sculpture Court</option></select> </div>";

        $("#the_room_location").replaceWith(roomInput);
    } else if (loc == "Clapp Library") {
        // adds second drop down menu with rooms in clapp
        var roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>Lecture Room</option><option value='2'>Margaret Sanger Room</option>";
        roomInput += "<option value='3'>PLTC</option> <option value='4'>Knapp Center</option>";
        roomInput += "<option value='5'>Room 258</option> <option value='6'>Room 318</option></select> </div>";

        $("#the_room_location").replaceWith(roomInput);

    } else if (loc == "Pendleton") {
        // adds second drop down menu with rooms in PNE
        roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>PNE 127</option><option value='2'>Atrium</option>";
        roomInput += "<option value='3'>PNE 251</option> <option value='4'>PNE 327</option>";
        roomInput += "<option value='5'>PNE 339</option> <option value='6'>PNE 351</option>";
        roomInput += "<option value='7'>PNW 001</option><option value='8'>PNW 101</option>";
        roomInput += "<option value='9'>PNW 106</option> <option value='10'>PNW 202</option>";
        roomInput += "<option value='11'>PNW 203</option> <option value='12'>PNW 208</option></select> </div>";

        $("#the_room_location").replaceWith(roomInput);
    } else if (loc == "Science Center") {
        // adds second drop down menu with rooms in science center
        var roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>Greenhouse Visitor's Center</option><option value='2'>Penthouse Foyer</option>";
        roomInput += "<option value='3'>Observatory</option> <option value='4'>SCI 274</option>";
        roomInput += "<option value='5'>SCI 261</option> <option value='6'>E101</option></select> </div>";

        $("#the_room_location").replaceWith(roomInput);

    } else if (loc == "Alumnae Hall") {
        // adds second drop down menu with rooms in alumnae
        var roomInput = "<select class='custom-select' id='the_room_location'> <option selected>Choose...</option>";
        roomInput += "<option value='1'>Auditorium</option><option value='2'>Ballroom</option>";
        roomInput += "<option value='3'>Jones Theater</option> <option value='4'>ALH 102</option>";
        roomInput += "<option value='5'>ALH 303</option> </select> </div>";

        $("#the_room_location").replaceWith(roomInput);
    }

    $("#the_room_location").css({
        "display": "block"
    });

}

$(document).ready(function (event) {
    $("#the_room_location").css({
        "display": "none"
    });

    $('#location').change(function (e) {
        var loc = $("#location option:selected").text();
        roomsShown(loc);
    });
});