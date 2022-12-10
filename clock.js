function updateAllTimes() {
    const dateTime = new Date();

    updateClock(dateTime);
    updateText(dateTime);
}

function getDateText(dateTime) {
    var text = "";

    text += dateTime.toLocaleString('en-GB', { weekday: "long" }) + ", ";
    text += getDayOrdinal(dateTime) + " ";
    text += dateTime.toLocaleString('en-GB', { month: "long", year: "numeric" });

    return text;
}

function getDayOrdinal(dateTime) {
    day = dateTime.getDate();

    if (day > 3 && day < 21) {
        return day + "th";
    }

    switch (day % 10) {
        case 1: return day + "st";
        case 2: return day + "nd";
        case 3: return day + "rd";
        default: return day + "th";
    }
}

function updateText(dateTime) {
    const digiClock = document.getElementById("digiClock");
    const wordTime = document.getElementById("wordTime");
    const wordDate = document.getElementById("wordDate");

    digiClock.innerText = dateTime.toLocaleString('en-GB', { hour: "numeric", minute: "numeric", second: "numeric" })

    const minutes = dateTime.getMinutes();
    const minuteTexts = ["one minute", "two minutes", "three minutes", "four minutes", "five minutes", "six minutes", "seven minutes", "eight minutes", "nine minutes", "ten minutes", "eleven minutes", "twelve minutes", "thirteen minutes", "fourteen minutes", "quarter", "sixteen minutes", "seventeen minutes", "eighteen minutes", "nineteen minutes", "twenty minutes", "twenty one minutes", "twenty two minutes", "twenty three minutes", "twenty four minutes", "twenty five minutes", "twenty six minutes", "twenty seven minutes", "twenty eight minutes", "twenty nine minutes", "half"];
    var currMinText = (minutes < 31) ? minuteTexts[minutes - 1] : minuteTexts[59 - minutes];
    currMinText += (minutes < 31) ? " past " : " to ";

    const hours = (minutes < 31) ? dateTime.getHours() : (dateTime.getHours() + 1) % 24;
    const hourTexts = ["twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];    
    var currHourText = (hours === 0) ? "midnight" : hourTexts[hours % 12];

    if (minutes === 0) {
        currHourText += " o'clock"
        currMinText = ""
    }

    wordTime.innerText = currMinText + currHourText;

    wordDate.innerText = getDateText(dateTime);
}

function updateClock(dateTime) {
    const hourHand = document.getElementById("hourHand");
    const minuteHand = document.getElementById("minuteHand");
    const secondHand = document.getElementById("secondHand");

    const hoursAngle = dateTime.getHours() * 30 + dateTime.getMinutes() * 0.5;
    hourHand.style.transform = `rotate(${hoursAngle}deg)`;

    const minutesAngle = dateTime.getMinutes() * 6 + dateTime.getSeconds() * 0.1;
    minuteHand.style.transform = `rotate(${minutesAngle}deg)`;

    const secondsAngle = dateTime.getSeconds() * 6;
    secondHand.style.transform = `rotate(${secondsAngle}deg)`;
}

setInterval(updateAllTimes, 500);
updateAllTimes();