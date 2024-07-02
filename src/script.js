// Dark - Light mode 

const rootEl = document.documentElement;
const modeSwitchEl = document.querySelector('.theme__switch');

modeSwitchEl.addEventListener('change', e => {
    let isChecked = e.target.checked;

    if(isChecked) {
        rootEl.classList.add('dark-theme');
    } else {
        rootEl.classList.remove('dark-theme');
    }
})