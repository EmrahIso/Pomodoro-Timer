////////////////////////////////////////////////////////
// Dark - Light mode 
////////////////////////////////////////////////////////

const rootEl = document.documentElement;
const modeSwitchEl = document.querySelector('.checkbox--theme');

function switchModes(e) {
    let isChecked = e.target.checked;

    if(isChecked) {
        rootEl.classList.add('dark-theme');
    } else {
        rootEl.classList.remove('dark-theme');
    }
}

////////////////////////////////////////////////////////
// Lightbox Mode
////////////////////////////////////////////////////////

function disableScroll() {
    window.scrollTo(0, 0);
}

function enableScroll() {
    window.scrollTo(0, 0);
}

function openLightbox(myCallback) {
    document.querySelector('.lightbox').classList.add('lightbox--visible');
    myCallback();
}

function closeLightbox(myCallback) {
    document.querySelector('.lightbox').classList.remove('lightbox--visible');
    myCallback();
}

const lightboxEl = document.querySelector('.lightbox');
const lightboxOpenBtnEl = document.querySelector('.button--settings');
const lightboxCloseBtnEl = document.querySelector('.lightbox .button--close');


////////////////////////////////////////////////////////
// Btn Play/Pause
////////////////////////////////////////////////////////

const btnPlayEl = document.querySelector('.button--switch');

function changeBtnPlayState(e) {
    if(e.target.getAttribute('data-pause') == '') {
        // Remove/Add classes
        e.target.classList.remove('button--switch-pause');
        e.target.classList.add('button--switch-play');

        // Remove/Add data attribute 
        e.target.removeAttribute('data-pause');
        e.target.setAttribute('data-play', '');
    } else {
        // Remove/Add classes
        e.target.classList.add('button--switch-pause');
        e.target.classList.remove('button--switch-play');

        // Remove/Add data attribute 
        e.target.setAttribute('data-pause', '');
        e.target.removeAttribute('data-play');
    }
}

////////////////////////////////////////////////////////
// Notification
////////////////////////////////////////////////////////

const notificationEl = document.querySelector('.notification');
const notificationCloseBtnEl = document.querySelector('.notification .button--close');
const notificationOkayBtnEl = document.querySelector('.notification .button--notification');
const notificationTimelineEl = document.querySelector('.notification__timeline');

const notificationHeadingEl = document.querySelector('.notification__heading');
const notificationDescriptionMessageEl = document.querySelector('.notification__description');

let notificationHeadingMessages = {
    // break 
    break: "It's Time to rest",

    // break_end 
    break_end: "The Break is over"
};

let notificationDescriptionMessages = {
    // break
    break: "Take rest; a field that has rested gives a bountiful crop.",

    // break_end
    break_end: "Start a new working session when you're ready.",
};


const AUDIO_DURATION = 8000;
let notificationTimeLeft = 8000;

let fillTimelineInterval = null;
intervalObj["2"] = fillTimelineInterval;

function showNotification() {
    fillTimelineInterval = intervalManager(true, "2", fillTimelineIntervalFunction, 20);
}

function closeNotificationStopAlarm() {
    notificationEl.classList.remove('notification-active');
    notificationTimelineEl.style.width =  '0%';
    fillTimelineInterval = intervalManager(false, "2", fillTimelineIntervalFunction, 20);
    notificationTimeLeft = 8000;

    audioEl.pause();
    audioEl.currentTime = 0;
}

function fillTimelineIntervalFunction() {
    notificationTimeLeft -= 20;
    let widthOfElementPercentage = ((AUDIO_DURATION - notificationTimeLeft) / AUDIO_DURATION) * 100;
    notificationTimelineEl.style.width =  `${widthOfElementPercentage}%`;

    if(notificationTimeLeft == 0) {
        notificationEl.classList.remove('notification-active');
        notificationTimelineEl.style.width =  '0%';
        fillTimelineInterval = intervalManager(false, "2", fillTimelineIntervalFunction, 20);
        notificationTimeLeft = 8000;
    }
}

/////////////////////////////////////
// EVENT LISTENERS
/////////////////////////////////////

modeSwitchEl.addEventListener('change', switchModes);
lightboxOpenBtnEl.addEventListener('click', e =>  openLightbox(disableScroll));
lightboxCloseBtnEl.addEventListener('click', e => closeLightbox(enableScroll));
btnPlayEl.addEventListener('click', changeBtnPlayState);
notificationCloseBtnEl.addEventListener('click', e => closeNotificationStopAlarm());
notificationOkayBtnEl.addEventListener('click', e => closeNotificationStopAlarm());