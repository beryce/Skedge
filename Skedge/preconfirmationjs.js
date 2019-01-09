function nextPage() {
    window.location = "confirmation.html";
}

function cancel() {
    if (confirm("Are you sure you want to exit this page? Your changes will not be saved and you will not be able to submit your event for review.")) {
        window.location = "homepage.html";
    }

}