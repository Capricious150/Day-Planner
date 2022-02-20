// declare a very simple variable which just returns the current time
var now = moment();

// declare another simple variable which returns the current hour on a 24-hour clock.
// will be used for later conditional formatting
var currentHour24 = moment().format("H");

// Another variable, this time for a 12-hour clock. Will be used to fill in some text values
var currentHour12 = moment().format("ha");

// One last quick moment variable to determine if it's morning or afternoon
var amOrPm = moment().format("a");


// ============================
// Set the current date in the corresponding page element
$("#currentDay").text("Today is " + now.format("dddd, MMMM Do, YYYY"));


// ============================
// Create the timeblocks
for (let i = 0; i < 10; i++) {

    $(".container").append(
        "<div class='time-block row'>"
    )
}


// ============================
// Add divs into the time-blocks, then apply styling to those divs


$(".time-block").append(
    "<div class = 'hour'>"
).append(
    "<textarea>"
).append(
    "<button class = 'saveBtn'> Save </button>"
)

$(".hour").css("width", "9%");

$("textarea").css("width", "82%");

$(".saveBtn").css("width", "9%");


// =============================
// This will be where I dynamically add the hours this calendar tracks, and determine whether they're past,
// present, or future.

var hourDivEls = $(".time-block").children(".hour");
var textAreaEls = $(".time-block").children("textarea");

for (let i = 0; i < hourDivEls.length; i++) {
    
    var hourInterate = moment().set('hour', (i+9)).format("ha");
 
    console.log("index is " + hourInterate + " and current time is " + currentHour12);

    hourDivEls[i].append(
        hourInterate
    )

    $("<p>").text(
        hourInterate
    )
    
   
    if (hourInterate > currentHour12){
        $(textAreaEls[i]).addClass("future");
    } else if (hourInterate < currentHour12){
        $(textAreaEls[i]).addClass("past");
    } else {
        $(textAreaEls[i]).addClass("present");
    }

    }


    // ==============================
    // Set up Save buttons & Local Storage

