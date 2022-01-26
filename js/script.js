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
const li = document.querySelectorAll('#nav-id li');
const media700 = window.matchMedia('(max-width: 700px)');

// close menu when a section is clicked
const logoContainer = document.querySelector('.logo-container');

// check window dimmensions
const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
const windowWidth = window.innerWidth || document.documentElement.clientWidth;

// insert an animated logo in menu when activated
let animatedLogoDiv = document.createElement('div');
animatedLogoDiv.innerHTML = `<div class="box-common small top-left"></div>
                            <div class="box-common big top-right"></div>
                            <div class="box-common big bottom-left"></div>
                            <div class="box-common small bottom-right"></div>`;

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

        // insert animated logo
        // nav.append(animatedLogoDiv);
        // animatedLogoDiv.classList.add('flex', 'wrap', 'animated-logo-container', 'animated-logo-container-menu');

        /* close menu when a section is clicked */
        // when header logo is clicked
        logoContainer.addEventListener('click', (e) => {
            menuBtn.checked = false;
            document.querySelector('body').style.overflow = 'auto';
            nav.classList.remove('nav-checkbox-checked');

            // delete animated logo
            nav.removeChild(animatedLogoDiv);
        });

        // when a tag from nav panel is clicked
        li.forEach(item => {
            item.addEventListener('click', (e) => {
                menuBtn.checked = false;
                document.querySelector('body').style.overflow = 'auto';
                nav.classList.remove('nav-checkbox-checked');

                // delete animated logo
                nav.removeChild(animatedLogoDiv);
            });
        });
    } else {
        // hamburguer menu desactivated
        document.querySelector('body').style.overflowY = 'auto';
        nav.classList.remove('nav-checkbox-checked');

        // delete animated logo
        nav.removeChild(animatedLogoDiv);
    }
});

// when media query is up to 700 close everything inside menu
media700.onchange = (e) => {
    if (menuBtn.checked) {
        menuBtn.checked = false;
        document.querySelector('body').style.overflow = 'auto';
        nav.classList.remove('nav-checkbox-checked');
        nav.removeChild(animatedLogoDiv);
    }
}

/** COLORS THEMES */
// btns theme switcher
const themeSwitcherContainer = document.querySelector('#theme-switcher-container');
const paletteBuble = document.querySelector('#color-theme-switch');
const colorsBubblesContainer = document.querySelector('#bubbles-container');
const radioBtns = colorsBubblesContainer.querySelectorAll('input');
const blueBubble = document.querySelector('#blue-theme-label');
const purpleBubble = document.querySelector('#purple-theme-label');
const greenBubble = document.querySelector('#green-theme-label');
// imgs
const headerLogo = document.querySelector('#header-logo');
const projFirstItem = document.querySelector('#item1-img');
const projLasttItem = document.querySelector('#itemn-img');

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

// activate palette bubble to show colors bubbles
paletteBuble.addEventListener('click', (e) => {
    blueBubble.classList.toggle('blue-bubble-move');
    purpleBubble.classList.toggle('purple-bubble-move');
    greenBubble.classList.toggle('green-bubble-move');
    // check where clicked to close bubbles
    document.addEventListener('click', hideBubbles);
});

function separateRootClasses(classes) {
    classes.match(/([^\s]+)/g).forEach((themeClass) => {
    });
    // for (let i = 0; i < classes.length; i++) {
    //     if (classes[i] === ' ') {
    //         // check only the first white space and get the class name
    //         classes = classes.substring(0, i);
    //         return classes;
    //     }
    // }
    // return classes;
}

// switch cases to change color theme
radioBtns.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        if (toggleDarkTheme.checked) {
            root.classList.value.match(/([^\s]+)/g).forEach((themeClass) => {
                switch (themeClass) {
                    case 'dark-theme':
                        root.classList.replace(themeClass, elem.value + '-theme');
                        root.classList.add(themeClass, elem.value + '-dark-theme');
                        break;
                    default:
                        root.classList.replace(themeClass, elem.value + '-theme');
                        root.classList.add('dark-theme', elem.value + '-dark-theme');
                        break;
                }
            });
        } else {
            switch (root.classList.value) {
                case '':
                    switch (elem.value) {
                        case 'purple':
                            root.classList.add('purple-theme');
                            break;
                        case 'green':
                            root.classList.add('green-theme');
                            break;
                    }
                    break;
                default:
                    switch (elem.value) {
                        case 'blue':
                            root.classList.remove(root.classList.value);
                            break;
                        case 'purple':
                            root.classList.replace(root.classList.value, 'purple-theme');
                            break;
                        case 'green':
                            root.classList.replace(root.classList.value, 'green-theme');
                            break;
                    }
                    break;
            }
        }
        // change img src
        if (elem.value === 'blue') {
            headerLogo.setAttribute('src', 'assets/logo/logo.svg');
            projFirstItem.setAttribute('src', 'assets/icons/pc.svg');
            projLasttItem.setAttribute('src', 'assets/icons/phone.svg');
        } else {
            headerLogo.setAttribute('src', 'assets/logo/logo_' + elem.value + '.svg');
            projFirstItem.setAttribute('src', 'assets/icons/pc_' + elem.value + '.svg');
            projLasttItem.setAttribute('src', 'assets/icons/phone_' + elem.value + '.svg');
        }
    });
});

// change color for dark theme
toggleDarkTheme.addEventListener('click', (e) => {
    // always toggle dark theme
    root.classList.toggle('dark-theme');
    // check for others colors themes
    if (root.classList.value !== 'dark-theme' && root.classList.value !== '') {
        root.classList.value.match(/([^\s]+)/g).forEach((themeClass) => {
            switch (themeClass) {
                case 'purple-theme':
                    root.classList.toggle('purple-dark-theme');
                    break;
                case 'green-theme':
                    root.classList.toggle('green-dark-theme');
                    break;
            }
        });
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