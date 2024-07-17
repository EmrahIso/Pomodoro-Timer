// This JS file is for solving the main problem of this project => Timer

////////////////////////////////////////////////////////
// SETTINGS VALIDATION
////////////////////////////////////////////////////////

const sessionMessageEl = document.querySelector('.session');

let currentSession = "work";
let sessionCount = 0;

const timerPlayEl = document.querySelector('.button--switch');

const workInputEl = document.querySelector('#work-time');
const shortBreakInputEl = document.querySelector('#short-break');
const longBreakInputEl = document.querySelector('#long-break');
const soundInputEl = document.querySelector('.checkbox--sound');


let workTimeValue = Number(workInputEl.value);
let shortBreakValue = Number(shortBreakInputEl.value);
let longBreakValue = Number(longBreakInputEl.value);
let soundInputValue = soundInputEl.checked;

const applySettingsBtnEl = document.querySelector('.button--apply-button');

const inputElsContEl = document.querySelector('.lightbox__inputs-cont');

// Function to validate user inputs.

function validationEvent(e) {
    const eventTargetId = e.target.id;
    if(eventTargetId == 'work-time' || eventTargetId == 'short-break' || eventTargetId == 'long-break') {
        if(!document.querySelector('#work-time').checkValidity() 
            || !document.querySelector('#short-break').checkValidity()
            || !document.querySelector('#long-break').checkValidity()) {
                applySettingsBtnEl.disabled = "true";
        } else {
            applySettingsBtnEl.disabled = "";
        }
    } 
}

// Function to apply user settings when user clicks on apply btn.

function  applySettingsEvent(e) {
    workTimeValue = Number(workInputEl.value);
    shortBreakValue = Number(shortBreakInputEl.value);
    longBreakValue = Number(longBreakInputEl.value);
    soundInputValue = soundInputEl.checked;

    // Clear Intervals
    checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);

    checkTimeInterval = null;

    // Reset timer

    minutesLeft = Number(workTimeValue);
    let minutesLeftArr = Array.from(minutesLeft.toString());
    
    if(minutesLeftArr.length < 2) {
        minutesLeftArr.push('0');
        minutesLeftArr.sort((itemA, itemB) => itemA - itemB);
        minutesLeft = minutesLeftArr.join('');
    }

    TIME_IN_MILLISECONDS = workTimeValue * 60 * 1000;
    dynamicSessionTime = TIME_IN_MILLISECONDS;
    timeLeft = dynamicSessionTime / 60 / 1000; 
    secondsLeft = null;

    timerMinutesEl.innerText = minutesLeft;
    timerSecondsEl.innerText = '00';

    // Change timerPlayBtn icon

    timerPlayEl.classList.add('button--switch-pause');
    timerPlayEl.classList.remove('button--switch-play');
    
    // Remove/Add timerPlayBtn data attribute 
    timerPlayEl.setAttribute('data-pause', '');
    timerPlayEl.removeAttribute('data-play');

    // Enable reset and start buttons 

    timerStartBtnEl.disabled = "";
    timerResetBtnEl.disabled = "";

    sessionMessageEl.classList.remove('break');
    rootEl.classList.remove('current-timer-mode-break');
    sessionCount = 0;

    currentSession = 'work';

    // Close notification and alarm

    closeNotificationStopAlarm()
}

////////////////////////////////////////////////////////
// TIMER
////////////////////////////////////////////////////////

const audioEl = new Audio("../assets/audio/timer-audio.wav");

const timerEl = document.querySelector('.timer');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

let TIME_IN_MILLISECONDS = workTimeValue * 60 * 1000;

let dynamicSessionTime = TIME_IN_MILLISECONDS;

let minutesLeft = dynamicSessionTime / 60 / 1000; // Till the end of the Session
let timeLeft = dynamicSessionTime / 60 / 1000; // Till the end of the Session
let secondsLeft = null; // Till the end of the minute

let checkTimeInterval = null;

let intervalObj = {};
intervalObj["1"] = checkTimeInterval;

function intervalManager(flag, identifier, fnc, time) { // This function is used to create intervals
    if(flag) {
        intervalObj[identifier] = setInterval(fnc, time);
    } else {
        clearInterval(intervalObj[identifier]);
    }
}

// This is a main function that runs a timer.

function timerIntervalFunction() {
    if(timeLeft % 1 !== 0) {
        let timeLeftArray = Array.from(timeLeft.toString());
        // For minutes
        let positionOfPoint = timeLeftArray.indexOf('.');
        minutesLeft = Number(timeLeftArray.slice(0, positionOfPoint).join(''));

        // For seconds
        if(Number(timeLeftArray.slice(positionOfPoint + 1, timeLeftArray.length).length) < 2) timeLeftArray.push('0');
        secondsLeft = Number(Number(Number(timeLeftArray.slice(positionOfPoint + 1, positionOfPoint + 3).join('')) / (100 / 60)).toFixed(0));
    } else {
        secondsLeft = 0;
    }
    dynamicSessionTime -= 1000;
    timeLeft = dynamicSessionTime / 60 / 1000;
    
    let minutesLeftArr = Array.from(minutesLeft.toString());
    let secondsLeftArr = Array.from(secondsLeft.toString());
    
    if(minutesLeftArr.length < 2) {
        minutesLeftArr.push('0');
        minutesLeftArr.sort((itemA, itemB) => itemA - itemB);
        minutesLeft = minutesLeftArr.join('');
    }
    
    if(secondsLeftArr.length < 2) {
        secondsLeftArr.push('0');
        secondsLeftArr.sort((itemA, itemB) => itemA - itemB);
        secondsLeft = secondsLeftArr.join("");
    }
    
    timerMinutesEl.innerText = minutesLeft;
    timerSecondsEl.innerText = secondsLeft;

    if(dynamicSessionTime == -1000) {
        if(currentSession == "short-break" || currentSession == "long-break") {
            currentSession = 'work';
            // Reset timers
            checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);
            
            // Remove/Add classes
            timerPlayEl.classList.add('button--switch-pause');
            timerPlayEl.classList.remove('button--switch-play');
            
            // Remove/Add data attribute 
            timerPlayEl.setAttribute('data-pause', '');
            timerPlayEl.removeAttribute('data-play');
            
            timerMinutesEl.innerText = workTimeValue;
            timerSecondsEl.innerText = '00';
            
            //Reset initialSettings
            minutesLeft = Number(workTimeValue);
            TIME_IN_MILLISECONDS = workTimeValue * 60 * 1000;
            dynamicSessionTime = TIME_IN_MILLISECONDS;
            timeLeft = dynamicSessionTime / 60 / 1000;
            secondsLeft = null;
            
            sessionMessageEl.classList.remove('break');
            rootEl.classList.remove('current-timer-mode-break');
            sessionCount++;
            notificationEl.classList.add('notification-active');
            notificationHeadingEl.textContent = notificationHeadingMessages.break_end;
            notificationDescriptionMessageEl.textContent = notificationDescriptionMessages.break_end;
            showNotification();
            if(soundInputValue) audioEl.play();
            timerStartBtnEl.disabled = "";
        } else if(currentSession == "work" && sessionCount == 3) {
            sessionCount = 0;
            
            checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);
            
            minutesLeft = Number(longBreakValue);
            TIME_IN_MILLISECONDS = longBreakValue * 60 * 1000;
            dynamicSessionTime = TIME_IN_MILLISECONDS;
            timeLeft = dynamicSessionTime / 60 / 1000; 
            
            checkTimeInterval = intervalManager(true, "1", timerIntervalFunction, 1000);
            
            currentSession = 'long-break';
            
            sessionMessageEl.classList.add('break');
            rootEl.classList.add('current-timer-mode-break');
            notificationEl.classList.add('notification-active');
            notificationHeadingEl.textContent = notificationHeadingMessages.break;
            notificationDescriptionMessageEl.textContent = notificationDescriptionMessages.break;
            showNotification();
            if(soundInputValue) audioEl.play();
        } else {
            checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);

            minutesLeft = Number(shortBreakValue);
            TIME_IN_MILLISECONDS = shortBreakValue * 60 * 1000;
            dynamicSessionTime = TIME_IN_MILLISECONDS;
            timeLeft = dynamicSessionTime / 60 / 1000; 
            
            checkTimeInterval = intervalManager(true, "1", timerIntervalFunction, 1000);
            
            currentSession = 'short-break';
            
            sessionMessageEl.classList.add('break');
            rootEl.classList.add('current-timer-mode-break');
            notificationEl.classList.add('notification-active');
            notificationHeadingEl.textContent = notificationHeadingMessages.break;
            notificationDescriptionMessageEl.textContent = notificationDescriptionMessages.break;
            showNotification();
            if(soundInputValue) audioEl.play();
        }
    }
}


// This function is invoked when user clicks on Play/Pause timer btn 

function timerControlClick(e) {
    if(e.target.getAttribute('data-play') == null) { 
        timerStartBtnEl.disabled = "true";
        timerResetBtnEl.disabled = "";
        checkTimeInterval = intervalManager(true, "1", timerIntervalFunction, 1000);
    } else { 
        timerStartBtnEl.disabled = "";
        timerResetBtnEl.disabled = "true";
        checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);
    }
}

const timerStartBtnEl = document.querySelector('.button--start');
const timerResetBtnEl = document.querySelector('.button--reset');


// We use this function as a reaction to the click on the start timer button el. 
function startTimer(e) {
    if(timerPlayEl.getAttribute('data-play') == null) {
        timerStartBtnEl.disabled = "true";
        timerResetBtnEl.disabled = "";
        checkTimeInterval = intervalManager(true, "1", timerIntervalFunction, 1000);
        // Remove/Add icon classes
        timerPlayEl.classList.remove('button--switch-pause');
        timerPlayEl.classList.add('button--switch-play');
                    
        // Remove/Add icon data attribute 
        timerPlayEl.setAttribute('data-play', '');
        timerPlayEl.removeAttribute('data-pause');

        closeNotificationStopAlarm()
    }
}

// We use this function as a reaction to the click on the reset timer button el. 
function resetTimer(e) {
    timerStartBtnEl.disabled = "";
    timerResetBtnEl.disabled = "true";
    checkTimeInterval = intervalManager(false, "1", timerIntervalFunction, 1000);

    sessionCount = 0;
    currentSession = "work";

    timerMinutesEl.innerText = workTimeValue;
    timerSecondsEl.innerText = '00';
    
    //Reset initialSettings
    minutesLeft = Number(workTimeValue);
    TIME_IN_MILLISECONDS = workTimeValue * 60 * 1000;
    dynamicSessionTime = TIME_IN_MILLISECONDS;
    timeLeft = dynamicSessionTime / 60 / 1000;
    secondsLeft = null;
    
    sessionMessageEl.classList.remove('break');
    rootEl.classList.remove('current-timer-mode-break');

    // Remove/Add icon classes
    timerPlayEl.classList.add('button--switch-pause');
    timerPlayEl.classList.remove('button--switch-play');
                
    // Remove/Add icon data attribute 
    timerPlayEl.setAttribute('data-pause', '');
    timerPlayEl.removeAttribute('data-play');

    closeNotificationStopAlarm()
}


////////////////////////////////////////////////////////
// EVENT LISTENERS
///////////////////////////////////////////////////////

inputElsContEl.addEventListener('input', validationEvent);
applySettingsBtnEl.addEventListener('click', applySettingsEvent);
timerStartBtnEl.addEventListener('click', startTimer);
timerResetBtnEl.addEventListener("click", resetTimer);
timerPlayEl.addEventListener('click', timerControlClick);