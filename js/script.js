// change color for dark theme
const toggleDarkTheme = document.querySelector('#dark-theme-switch');
const root = document.documentElement;

// check a specific media query to insert a break in a line
const media450 = window.matchMedia('(max-width: 450px)');
const media300 = window.matchMedia('(min-width: 300px)');
const span = document.querySelector('#span-br');
const br = document.createElement('br');

// menu btn
const menuBtn = document.querySelector('#navi-toggle');
const nav = document.querySelector('#nav-id');
const ul = document.querySelector('#ul');
const a = document.querySelectorAll('#nav-id li a');
const media700 = window.matchMedia('(max-width: 700px)');

// close menu when a section is clicked
const logoContainer = document.querySelector('.logo-container');

// check window dimmensions
const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
const windowWidth = window.innerWidth || document.documentElement.clientWidth;

/** COLOR THEME SWITCHER */
// btns theme switcher
const themeSwitcherContainer = document.querySelector('#theme-switcher-container');
const paletteBuble = document.querySelector('#color-theme-switch');
const colorsBubblesContainer = document.querySelector('#bubbles-container');
const radioBtns = colorsBubblesContainer.querySelectorAll('input');
const blueBubble = document.querySelector('#blue-theme-label');
const purpleBubble = document.querySelector('#purple-theme-label');
const greenBubble = document.querySelector('#green-theme-label');
const html = document.querySelector('html');
let primaryColorValue;
let darkPrimaryColorValue;
let classesArr = root.classList;
// imgs
const headerLogo = document.querySelector('#header-logo');
const projFirstItem = document.querySelector('#item1-img');
const projLasttItem = document.querySelector('#itemn-img');

// check a specific media query to insert a break after Rubén in intro-section
function addDeleteBr(e) {
    e.matches ? span.prepend(br) : br.remove();;
}
// when media matches
addDeleteBr(media450);
// when media change
media450.addEventListener('change', addDeleteBr);

// menu btn
menuBtn.addEventListener('change', (e) => {
    // hamburguer menu activated
    if (menuBtn.checked) {
        document.querySelector('body').style.overflowY = 'hidden';
        nav.classList.add('nav-checkbox-checked');

        /* close menu when a section is clicked */
        // when header logo is clicked
        logoContainer.addEventListener('click', (e) => {
            menuBtn.checked = false;
            document.querySelector('body').style.overflow = 'auto';
            nav.classList.remove('nav-checkbox-checked');
        });

        // when a tag from nav panel is clicked
        a.forEach(item => {
            item.addEventListener('click', (e) => {
                menuBtn.checked = false;
                document.querySelector('body').style.overflow = 'auto';
                nav.classList.remove('nav-checkbox-checked');
            });
        });
    } else {
        // hamburguer menu desactivated
        document.querySelector('body').style.overflowY = 'auto';
        nav.classList.remove('nav-checkbox-checked');
    }
});

// when media query is up to 700 close everything inside menu
media700.onchange = (e) => {
    if (menuBtn.checked) {
        menuBtn.checked = false;
        document.querySelector('body').style.overflow = 'auto';
        nav.classList.remove('nav-checkbox-checked');
    }
}

/** COLOR THEME SWITCHER */
// hide bubbles when clicked outside
function hideBubbles(e) {
    let divContainer = e.target;
    // loop until parent div container reached
    do {
        if (divContainer == themeSwitcherContainer) {
            return;
        }
        // go up the DOM until parent div container
        divContainer = divContainer.parentNode;
    } while (divContainer);
    // uncheck palette bubble
    paletteBuble.checked = false;
    // hide color bubbles when clicked outside parent div container
    blueBubble.classList.remove('blue-bubble-move');
    purpleBubble.classList.remove('purple-bubble-move');
    greenBubble.classList.remove('green-bubble-move');
    // remove event listener when bubbles are hide
    document.removeEventListener('click', hideBubbles);
}

// change meta tag theme color
function changeThemeColorMetaTag(color) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const metaThemeColorSafari = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

    metaThemeColor.setAttribute('content', color.substring(1));
    metaThemeColorSafari.setAttribute('content', color.substring(1));
}

// activate palette bubble to show colors bubbles
paletteBuble.addEventListener('click', (e) => {
    blueBubble.classList.toggle('blue-bubble-move');
    purpleBubble.classList.toggle('purple-bubble-move');
    greenBubble.classList.toggle('green-bubble-move');
    // check where clicked to hide bubbles
    document.addEventListener('click', hideBubbles);
});

// switch cases to change color theme
radioBtns.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (toggleDarkTheme.checked) {
            // create an array only with theme classes names
            let classesNamesArr = classesArr.value.match(/[^\s]+/g);

            // check if we click more than one time the same color to do nothing
            if (!classesNamesArr.includes(`${elem.value}-theme`) && (classesNamesArr.length > 1 || elem.value !== 'blue')) {
                if (classesNamesArr[0] === 'dark-theme') {
                    if (classesNamesArr[1] === 'green-theme' || classesNamesArr[1] === 'purple-theme') {
                        if (elem.value !== 'blue') {
                            // only takes from array color themes to replace for
                            // current bubble (radio-button) color
                            classesArr.replace(classesNamesArr[1], `${elem.value}-theme`);
                            classesArr.replace(classesNamesArr[2], `${elem.value}-dark-theme`);
                            // change meta tag theme color
                            darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
                            changeThemeColorMetaTag(darkPrimaryColorValue);
                            // call change img src function
                            changeImg(elem.value, true);
                        } else {
                            classesArr.remove(classesNamesArr[1]);
                            classesArr.remove(classesNamesArr[2]);
                            // change meta tag theme color
                            darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
                            changeThemeColorMetaTag(darkPrimaryColorValue);
                            // call change img src function
                            changeImg('', false);
                        }
                    } else if (elem.value !== 'blue') {
                        classesArr.add(`${elem.value}-theme`);
                        classesArr.add(`${elem.value}-dark-theme`);
                        // change meta tag theme color
                        darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
                        changeThemeColorMetaTag(darkPrimaryColorValue);
                        // call change img src function
                        changeImg(elem.value, true);
                    }
                } else {
                    if (elem.value !== 'blue') {
                        // only takes from array color themes to replace for
                        // current bubble (radio-button) color
                        classesArr.replace(classesNamesArr[0], `${elem.value}-theme`);
                        classesArr.replace(classesNamesArr[2], `${elem.value}-dark-theme`);
                        // change meta tag theme color
                        darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
                        changeThemeColorMetaTag(darkPrimaryColorValue);
                        // call change img src function
                        changeImg(elem.value, true);
                    } else {
                        classesArr.remove(classesNamesArr[0]);
                        classesArr.remove(classesNamesArr[2]);
                        // change meta tag theme color
                        darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
                        changeThemeColorMetaTag(darkPrimaryColorValue);
                        // call change img src function
                        changeImg('', false);
                    }
                }
            }
        } else {
            if (classesArr.value === '' && elem.value !== 'blue') {
                classesArr.add(`${elem.value}-theme`);
                // change meta tag theme color
                primaryColorValue = getComputedStyle(html).getPropertyValue('--primary-color-blue');
                changeThemeColorMetaTag(primaryColorValue);
                // call change img src function
                changeImg(elem.value, true);
            } else {
                let colorThemeName = classesArr.value.substring(0, classesArr.value.indexOf('-'));
                // check if we click more than one time the same color to do nothing
                if (elem.value != colorThemeName && colorThemeName != '') {
                    if (elem.value === 'blue') {
                        classesArr.remove(classesArr.value);
                        // change meta tag theme color
                        primaryColorValue = getComputedStyle(html).getPropertyValue('--primary-color-blue');
                        changeThemeColorMetaTag(primaryColorValue);
                        // call change img src function
                        changeImg('', false);
                    } else {
                        classesArr.replace(classesArr.value, `${elem.value}-theme`);
                        // change meta tag theme color
                        primaryColorValue = getComputedStyle(html).getPropertyValue('--primary-color-blue');
                        changeThemeColorMetaTag(primaryColorValue);
                        // call change img src function
                        changeImg(elem.value, true);
                    }
                }
            }
        }
    });
});

// change img src
function changeImg(radioBtnValue, underscoreYes) {
    let underscore;
    underscoreYes ? underscore = '_' : underscore = '';

    headerLogo.setAttribute('src', `assets/logo/logo${underscore}${radioBtnValue}.svg`);
    projFirstItem.setAttribute('src', `assets/icons/pc${underscore}${radioBtnValue}.svg`);
    projLasttItem.setAttribute('src', `assets/icons/phone${underscore}${radioBtnValue}.svg`);
}

// change color for dark theme
toggleDarkTheme.addEventListener('click', (e) => {
    // always toggle dark theme
    classesArr.toggle('dark-theme');
    // change meta tag theme color
    darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
    changeThemeColorMetaTag(darkPrimaryColorValue);
    // check for others colors themes
    if (classesArr.value !== 'dark-theme' && classesArr.value !== '') {
        //extract the color theme name from the root classes
        let colorThemeName = classesArr.value.substring(0, classesArr.value.indexOf('-'));
        classesArr.toggle(`${colorThemeName}-dark-theme`);
        // change meta tag theme color
        darkPrimaryColorValue = getComputedStyle(html).getPropertyValue('--blue-container');
        changeThemeColorMetaTag(darkPrimaryColorValue);
    }
});

// check if any element is in the viewport
function isAnyPartOfElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
}

let delay = 0;
// making them visible while scrolling
function scrollHandler() {
    document
        .querySelectorAll('.show-on-scroll:not(.is-visible)')
        .forEach((element) => {
            setTimeout(function () {
                if (
                    isAnyPartOfElementInViewport(element) &&
                    !element.classList.contains('is-visible')
                ) {
                    element.classList.add('is-visible');
                }
            }, delay);

            delay === 2000 ? delay = 0 : delay += 500;
        });
}

window.addEventListener('scroll', scrollHandler);

// call the scroll handler function at first load to show elements that
// is already in the viewport
scrollHandler();