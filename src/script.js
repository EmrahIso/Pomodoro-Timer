// Dark - Light mode 

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

modeSwitchEl.addEventListener('change', switchModes);

// Lightbox Mode


function disableScroll() {
    window.scrollTo(0, 0);
    //rootEl.style.overflowY = "hidden";
}

function enableScroll() {
    window.scrollTo(0, 0);
    //rootEl.style.overflowY = "visible";
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
const lightboxCloseBtnEl = document.querySelector('.button--close');

lightboxOpenBtnEl.addEventListener('click', e => { 
    openLightbox(disableScroll) 
});
lightboxCloseBtnEl.addEventListener('click', e => { 
    closeLightbox(enableScroll) 
});

// Btn Play/Pause

const btnPlayEl = document.querySelector('.button--switch');

btnPlayEl.addEventListener('click', e => {
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
})
