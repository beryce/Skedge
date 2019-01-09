/* loginjs.js
by Beryce Garcia
for CS220 "Skedge" assignment
*/

// Function that makes sure email and password are valid

// Function that checks to see if the email address typed into the email input box is valid
function validate() {
    var email = validateEmail();
    console.log(email);
    var pass = validatePassword();
    var msg = document.getElementById("message");
    if (!email || !pass) {
        msg.style.display = "block";
        return false;
    } else {
        // msg.style.display = "none";
        window.location = "mainpage.html";
        return true;
    }
}


function validateEmail() {
    var email = document.getElementById("exampleInputEmail1");
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!(reg.test(email.value)) || email.value == "") {
        // email.style.border = "solid #c00001";
        // return false;
        $("#exampleInputEmail1").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        // email.style.border.color = "silver";
        // return true;
        $("#exampleInputEmail1").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}

function validatePassword() {
    var password = document.getElementById("exampleInputPassword1");
    if (password.value == "") {
        $("#exampleInputPassword1").css({
            "border-color": "#c00001",
            "visibility": "visible"
        });
        return false;
    } else {
        $("#exampleInputPassword1").css({
            "border-color": "silver",
            "visibility": "visible"
        });
        return true;
    }
}