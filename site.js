//Note: Universal Coordinated Time (UCT) = Greenwich Mean Time (GMT).

//Global variable.
let days;

//When the DOM Content is loaded, invoke the "get days" function.
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    days.getDays();
});

days = {
    getDays: function () {
        "use strict";

        //Create the date objects
        const election = new Date("November 3, 2020 00:00:00 GMT+00:00");
        const today = new Date();

        //Return ms between objects' dates and 1/1/1970 at midnight. All UCT.
        const electionMs = election.getTime();
        const todayMs = today.getTime();

        //Return time zone offset (difference btw UCT & local time) in minutes.
        //Easy to get confused here -
        //If your local time is behind UCT, method returns a positive number.
        //If your local time is ahead of UCT, method returns a negative number.
        const electionOffset = election.getTimezoneOffset();
        const todayOffset = today.getTimezoneOffset();

        //Convert minutes to seconds, then milliseconds
        const electionOffsetMs = (electionOffset * 60) * 1000;
        const todayOffsetMs = (todayOffset * 60) * 1000;

        //Ternary statements - careful here, remember the note above about
        //Time zone difference and negative/positive numbers.
        const electionLocal = (
            electionOffsetMs > 0
            ? (electionMs - electionOffsetMs)
            : (electionMs + electionOffsetMs)
        );

        const todayLocal = (
            electionOffsetMs > 0
            ? (todayMs - todayOffsetMs)
            : (todayMs + todayOffsetMs)
        );

        const daysInMs = electionLocal - todayLocal;

        //The number of milliseconds in a day: 86400000
        const totalDays = (daysInMs / 86400000);

        //Math.floor rounds result down
        const totalDaysMf = Math.floor(totalDays);

        //Change integer to "local" string
        const totalDaysMfSt = totalDaysMf.toLocaleString();

        //Get element, create text node for it, append.
        const daysToVoting = document.getElementById("days-to-voting");
        const daysToVotingText = document.createTextNode(totalDaysMfSt);
        daysToVoting.appendChild(daysToVotingText);

        //Position the needle on the gauge
        //There are four years or 1460 days between election days.
        //That's 14.6 days per percentage point.
        const needlePosition = (1460 - totalDaysMf) / 14.6;
        document.getElementById("needle").style.left = needlePosition + "%";

    } //close function

}; //close variable