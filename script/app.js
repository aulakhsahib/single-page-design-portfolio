const slider = document.querySelector('.ic__slider');
const sliderNavBar = document.querySelector('.ic__nav-buttons');

const onClickHandler = (button) => {
    const slider = button.closest('.image-carousel').querySelector('.ic__slider');
    const sliderStyles = getComputedStyle(slider);
    const sliderIndex = parseInt(sliderStyles.getPropertyValue('--slider-index'));
    let newSliderIndex;
    if (button.classList.contains('ic__nb--left')) {
        newSliderIndex = sliderIndex - 1;
        if (newSliderIndex < 0) newSliderIndex = 0;
    }
    else {
        newSliderIndex = sliderIndex + 1;
        if(newSliderIndex > slider.children.length - 1) newSliderIndex = slider.children.length - 1;
    }
    slider.style.setProperty('--slider-index', newSliderIndex);
}

const throttle = (fn, delay) => {
    let canRun = true;
    return (...args) => {
        if (!canRun) return;

        fn(...args);
        canRun = false;
        setTimeout(() => {
            canRun = true;
        }, delay);
    }
}

const throttledClickHandler = throttle(onClickHandler, 300);


sliderNavBar.addEventListener('click', e => {
    let button;
    if (e.target.matches('.ic__nb')) button = e.target;
    else {
        button = e.target.closest('.ic__nb');
    }
    if(button !== null) throttledClickHandler(button);
});
