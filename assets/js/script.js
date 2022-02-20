// declare a very simple variable which just returns the current time
var now = moment();

// declare another simple variable which returns the current hour on a 24-hour clock.
// will be used for later conditional formatting
var currentHour24 = moment().format("H");

// Another variable, this time for a 12-hour clock. Will be used to fill in some text values
var currentHour12 = moment().format("ha");


// ============================
// Set the current date in the corresponding page element
$("#currentDay").text("Today is " + now.format("dddd, MMMM Do, YYYY"));


// ============================

function createTimeBlocks(){
// Create the timeblocks. My day planner will track 10 hours, from 10am to 7pm

for (let i = 0; i < 10; i++) {

    $(".container").append(
        "<div class='time-block row'>"
    )
}

// Add divs with classes into the time-blocks, then apply width-styling to those divs

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

// End of createTimeBlocks function
}


// =============================

function formatTimeBlocks() {
    // This is where I dynamically add the hours this calendar tracks

var hourDivEls = $(".time-block").children(".hour");
var textAreaEls = $(".time-block").children("textarea");

for (let i = 0; i < hourDivEls.length; i++) {
    
    var hourInterate = moment().set('hour', (i+10)).format("ha");

    hourDivEls[i].append(
        hourInterate
    )

    // Check if a given timeblock is in the past, present, or future, and apply a class to the textarea appropriately

    if (hourInterate < currentHour12){
        $(textAreaEls[i]).addClass("past");
    } else if (hourInterate > currentHour12){
        $(textAreaEls[i]).addClass("future");
    } else {
        $(textAreaEls[i]).addClass("present");
    }
  }
}


// ==============================

function formatSaveButtons(){
    
    // Set up Save buttons & Local Storage
    // Uses event elegation and jQuery's take on event.target for DOM traversing

    var timeBlockEls = $(".time-block")

    timeBlockEls.on('click', '.saveBtn', function(event){

        event.preventDefault();

        let myTarget = $(event.target);
        let myText = myTarget.parent().children("textarea").val();
        let thisHour = myTarget.parent().children(".hour").text();

        localStorage.setItem(thisHour, JSON.stringify(myText));

    })

}

// ===============================
// Final function checks local storage for any values. 
// Fills out the text areas with any values which are not 'null'

function recoverLocalStorage(){

    let storageArray = [       
         JSON.parse(localStorage.getItem('10am')),
         JSON.parse(localStorage.getItem('11am')),
         JSON.parse(localStorage.getItem('12pm')),
         JSON.parse(localStorage.getItem('1pm')),
         JSON.parse(localStorage.getItem('2pm')),
         JSON.parse(localStorage.getItem('3pm')),
         JSON.parse(localStorage.getItem('4pm')),
         JSON.parse(localStorage.getItem('5pm')),
         JSON.parse(localStorage.getItem('6pm')),
         JSON.parse(localStorage.getItem('7pm'))
    ]

    let textAreaEls = $("textarea");
    console.log (textAreaEls);

    for (let i = 0; i < 10; i++) {
        if (storageArray[i] != null){
        textAreaEls[i].append(storageArray[i])
        } 
    }
}

// ==============================
// With all my necessary functions created, now we just fire them off, one after another, on pageload.

createTimeBlocks();
formatTimeBlocks();
formatSaveButtons();
recoverLocalStorage();